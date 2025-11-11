package com.Auth_Service.controller;

import com.Auth_Service.dto.BillListItemDTO;
import com.Auth_Service.dto.DashboardResponseDTO;
import com.Auth_Service.model.Bill; // <-- Import Bill
import com.Auth_Service.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List; // <-- Import List

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    /**
     * This is your existing endpoint for the main dashboard page.
     */
    @GetMapping("/{consumerNumber}")
    public ResponseEntity<DashboardResponseDTO> getDashboardData(@PathVariable String consumerNumber) {
        DashboardResponseDTO data = dashboardService.getDashboardInfo(consumerNumber);
        return ResponseEntity.ok(data);
    }


    // --- (NEW ENDPOINT 1) ---
    /**
     * Gets a list of all bills for a specific consumer.
     * API URL: GET /api/dashboard/1234567890124/bills
     */
    @GetMapping("/{consumerNumber}/bills")
    public ResponseEntity<List<BillListItemDTO>> getAllBills(@PathVariable String consumerNumber) {
        List<BillListItemDTO> bills = dashboardService.getAllBills(consumerNumber);
        return ResponseEntity.ok(bills);
    }


    // --- (NEW ENDPOINT 2) ---
    /**
     * Gets the full details of a single bill.
     * API URL: GET /api/dashboard/1234567890124/bills/1
     */
    @GetMapping("/{consumerNumber}/bills/{billId}")
    public ResponseEntity<Bill> getBillDetails(
            @PathVariable String consumerNumber,
            @PathVariable Long billId) {
        
        Bill bill = dashboardService.getBillDetails(consumerNumber, billId);
        return ResponseEntity.ok(bill);
    }
}
