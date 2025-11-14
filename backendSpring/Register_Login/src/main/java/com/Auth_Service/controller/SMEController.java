package com.Auth_Service.controller;

import com.Auth_Service.dto.*;
import com.Auth_Service.model.Complaint;
import com.Auth_Service.service.SMEService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "*")
public class SMEController {

    @Autowired
    private SMEService smeService;

    // --- 1. SME Login ---
    @PostMapping("/sme/login")
    public ResponseEntity<?> loginSme(@RequestBody SMELoginRequestDTO request) {
        try {
            Map<String, Object> response = smeService.loginSME(request);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("error", e.getMessage()));
        }
    }

    // --- 2. ADMIN: Assign Complaint to SME ---
    // URL: /api/admin/complaints/{id}/assign
    @PatchMapping("/admin/complaints/{complaintId}/assign")
    public ResponseEntity<Complaint> assignComplaint(
            @PathVariable Long complaintId,
            @RequestBody AssignComplaintDTO dto) {
        return ResponseEntity.ok(smeService.assignComplaint(complaintId, dto));
    }

    // --- 3. SME: View My Assigned Complaints ---
    // URL: /api/sme/{smeId}/dashboard
    @GetMapping("/sme/{smeId}/dashboard")
    public ResponseEntity<List<Complaint>> getSmeComplaints(@PathVariable String smeId) {
        return ResponseEntity.ok(smeService.getComplaintsForSME(smeId));
    }

    // --- 4. SME: Resolve/Update Complaint ---
    // URL: /api/sme/complaints/{id}/status
    @PatchMapping("/sme/complaints/{complaintId}/status")
    public ResponseEntity<Complaint> updateStatus(
            @PathVariable Long complaintId,
            @RequestBody SMEUpdateComplaintDTO dto) {
        return ResponseEntity.ok(smeService.updateComplaintStatus(complaintId, dto));
    }
}