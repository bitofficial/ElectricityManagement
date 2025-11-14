package com.Auth_Service.service;

import com.Auth_Service.dto.*;
import com.Auth_Service.model.Complaint;
import com.Auth_Service.model.SME;
import com.Auth_Service.repository.ComplaintRepository;
import com.Auth_Service.repository.SMERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class SMEService {

    @Autowired private SMERepository smeRepository;
    @Autowired private ComplaintRepository complaintRepository;
    // 1. SME Login
    public Map<String, Object> loginSME(SMELoginRequestDTO request) {
        Map<String, Object> response = new HashMap<>();
        SME sme = smeRepository.findBySmeId(request.getSmeId())
                .orElseThrow(() -> new RuntimeException("SME not found"));

        if (!request.getPassword().equals(sme.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        response.put("message", "Login Successful");
        response.put("smeId", sme.getSmeId());
        response.put("department", sme.getDepartment());
        return response;
    }

    // 2. ADMIN TASK: Assign Complaint to SME
    public Complaint assignComplaint(Long complaintId, AssignComplaintDTO dto) {
        // Validate SME exists
        if (smeRepository.findBySmeId(dto.getSmeId()).isEmpty()) {
            throw new RuntimeException("SME ID does not exist");
        }

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setAssignedSmeId(dto.getSmeId());
        complaint.setStatus("Assigned"); // Update status automatically
        
        return complaintRepository.save(complaint);
    }

    // 3. SME TASK: View Assigned Complaints
    public List<Complaint> getComplaintsForSME(String smeId) {
        return complaintRepository.findByAssignedSmeId(smeId);
    }
    

    // 4. SME TASK: Update/Resolve Complaint
    public Complaint updateComplaintStatus(Long complaintId, SMEUpdateComplaintDTO dto) {
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(dto.getStatus());
        complaint.setNotes(dto.getComments());
        
        return complaintRepository.save(complaint);
    }
}