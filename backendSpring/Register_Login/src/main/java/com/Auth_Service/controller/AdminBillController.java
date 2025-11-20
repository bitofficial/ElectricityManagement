package com.Auth_Service.controller;

import com.Auth_Service.dto.BillRequestDTO;
import com.Auth_Service.model.Bill;
import com.Auth_Service.service.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/bills")
@CrossOrigin(origins = "*")
public class AdminBillController {

    @Autowired
    private DashboardService dashboardService;

    // ✔ ADMIN — CREATE NEW BILL
    @PostMapping("/add")
    public ResponseEntity<Bill> addBill(@RequestBody BillRequestDTO dto) {
        Bill createdBill = dashboardService.addBill(dto);
        return ResponseEntity.ok(createdBill);
    }
}