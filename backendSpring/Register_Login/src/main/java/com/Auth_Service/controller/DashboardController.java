package com.Auth_Service.controller;

import com.Auth_Service.dto.BillListItemDTO;
import com.Auth_Service.dto.DashboardResponseDTO;
import com.Auth_Service.dto.PaymentRequestDTO; // <-- ADD IMPORT
import com.Auth_Service.model.Bill; 
import com.Auth_Service.model.Payment; // <-- ADD IMPORT
import com.Auth_Service.service.DashboardService;
import jakarta.validation.Valid; // <-- ADD IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.Auth_Service.dto.PaymentBatchRequestDTO;

import java.util.List; 

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


    /**
     * Gets a list of all bills for a specific consumer.
     * API URL: GET /api/dashboard/1234567890124/bills
     */
    @GetMapping("/{consumerNumber}/bills")
    public ResponseEntity<List<BillListItemDTO>> getAllBills(@PathVariable String consumerNumber) {
        List<BillListItemDTO> bills = dashboardService.getAllBills(consumerNumber);
        return ResponseEntity.ok(bills);
    }


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
    
    /**
     * Gets the "Bill History" (all "Paid" bills) for a consumer.
     * API URL: GET /api/dashboard/1234567890124/viewbills
     */
    @GetMapping("/{consumerNumber}/billhistory")
    public ResponseEntity<List<BillListItemDTO>> getBillHistory(@PathVariable String consumerNumber)
    {
    	List<BillListItemDTO> billhistory = dashboardService.getBillHistory(consumerNumber);
    	return ResponseEntity.ok(billhistory);
    }
    

    // --- THIS IS THE UPDATED ENDPOINT ---
    /**
     * Marks a specific bill as "Paid" and generates a payment record.
     * This is called after a payment is successfully processed.
     * API URL: PATCH /api/dashboard/1234567890124/bills/1/pay
     *
     * This endpoint now requires a RequestBody.
     */
    @PatchMapping("/{consumerNumber}/bills/{billId}/pay")
    public ResponseEntity<Payment> updateBillStatus(
            @PathVariable String consumerNumber, 
            @PathVariable Long billId,
            @Valid @RequestBody PaymentRequestDTO request) { // <-- NOW ACCEPTS A BODY
        
    	Payment paymentRecord = dashboardService.markBillAsPaid(consumerNumber, billId, request);
    	return ResponseEntity.ok(paymentRecord);
    }
    @GetMapping("/{consumerNumber}/bilkls/{billid}/invoice")
    public ResponseEntity<Payment> getInvoiceDetails(@PathVariable String consumerNumber, @PathVariable Long billid)
    {
    	Payment paymentInvoice = dashboardService.getPaymentInvoice(consumerNumber, billid);
    	return ResponseEntity.ok(paymentInvoice);
    }

    // --- ADD THIS NEW ENDPOINT FOR BATCH PAYMENTS ---
    /**
     * Marks multiple bills as "Paid" at the same time.
     * API URL: POST /api/dashboard/1234567890124/bills/pay-batch
     */
    @PostMapping("/{consumerNumber}/bills/pay-batch")
    public ResponseEntity<List<Payment>> updateMultipleBillStatus(
            @PathVariable String consumerNumber,
            @Valid @RequestBody PaymentBatchRequestDTO request) {

        List<Payment> paymentRecords = dashboardService.markMultipleBillsAsPaid(consumerNumber, request);
        return ResponseEntity.ok(paymentRecords);
    }
}