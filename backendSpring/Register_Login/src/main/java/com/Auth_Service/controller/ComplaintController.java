package com.Auth_Service.controller;

import com.Auth_Service.dto.ComplaintRequestDTO;
import com.Auth_Service.dto.ComplaintResponseDTO;
import com.Auth_Service.service.ComplaintService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/complaints")
public class ComplaintController {

    @Autowired
    private ComplaintService complaintService;

    // Customer: Raise complaint
    @PostMapping("/raise")
    public ResponseEntity<ComplaintResponseDTO> raiseComplaint(@Valid @RequestBody ComplaintRequestDTO dto) {
        return ResponseEntity.ok(complaintService.raiseComplaint(dto));
    }

    // Customer: View all their complaints
    @GetMapping("/consumer/{consumerNumber}")
//    public ResponseEntity<List<ComplaintResponseDTO>> getComplaints(@PathVariable String consumerNumber) {
    public ResponseEntity<List<ComplaintResponseDTO>> getComplaints(@PathVariable String consumerNumber) {
        return ResponseEntity.ok(complaintService.getComplaintsByConsumer(consumerNumber));
    }

    // Admin/SME: Update complaint status
    @PutMapping("/{complaintId}/status")
    public ResponseEntity<ComplaintResponseDTO> updateStatus(
            @PathVariable Long complaintId,
            @RequestParam String status,
            @RequestParam(required = false) String notes) {
        return ResponseEntity.ok(complaintService.updateComplaintStatus(complaintId, status, notes));

//    will take input complaintId and status
    }

    // Customer: View complaint history with optional filters
    @GetMapping("/history/{consumerNumber}")
    public ResponseEntity<List<ComplaintResponseDTO>> getComplaintHistory(
            @PathVariable String consumerNumber,
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String type,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {

        return ResponseEntity.ok(
                complaintService.getComplaintHistory(consumerNumber, status, type, startDate, endDate)
        );
    }


}
