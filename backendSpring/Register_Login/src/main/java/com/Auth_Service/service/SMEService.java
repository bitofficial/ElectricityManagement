package com.Auth_Service.service;

import com.Auth_Service.dto.*;
import com.Auth_Service.model.Complaint;
import com.Auth_Service.model.SME;
import com.Auth_Service.repository.ComplaintRepository;
import com.Auth_Service.repository.SMERepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors; // <-- ADD THIS IMPORT

@Service
public class SMEService {

    @Autowired private SMERepository smeRepository;
    @Autowired private ComplaintRepository complaintRepository;

    // 1. SME Login
    public Map<String, Object> loginSME(SMELoginRequestDTO request) {
        Map<String, Object> response = new HashMap<>();
        SME sme = smeRepository.findBySmeId(request.getSmeId())
                .orElseThrow(() -> new RuntimeException("SME not found"));

        // Check password (plain text, as you requested earlier)
        if (!request.getPassword().equals(sme.getPassword())) {
            throw new RuntimeException("Invalid password");
        }
        
        // (If you decide to encrypt SME passwords, use this instead)
        // if (!passwordEncoder.matches(request.getPassword(), sme.getPassword())) {
        //     throw new RuntimeException("Invalid password");
        // }

        response.put("message", "Login Successful");
        response.put("smeId", sme.getSmeId());
        response.put("department", sme.getDepartment());
        return response;
    }

    // 2. ADMIN TASK: Assign Complaint to SME
    public Complaint assignComplaint(Long complaintId, AssignComplaintDTO dto) {
        if (smeRepository.findBySmeId(dto.getSmeId()).isEmpty()) {
            throw new RuntimeException("SME ID does not exist");
        }
        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));
        complaint.setAssignedSmeId(dto.getSmeId());
        complaint.setStatus("Assigned");
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

 public List<SMEDetailsDTO> getAllSMEs() {
        
        // 1. Create an empty list for the "safe" DTOs
        List<SMEDetailsDTO> safeSmeList = new ArrayList<>();

        // 2. Fetch all SME entities from the database
        List<SME> allSMEs = smeRepository.findAll();

        // 3. Manually loop through the list (this is safer)
        if (allSMEs != null) { // Check if the list itself is null (it shouldn't be, but we check)
            for (SME sme : allSMEs) {
                
                // 4. Check if the SME object in the list is null
                if (sme != null) {
                    
                    // 5. Manually create and set the DTO
                    SMEDetailsDTO dto = new SMEDetailsDTO();
                    
                    // These should never be null, but we check anyway
                    if (sme.getId() != null) {
                        dto.setId(sme.getId());
                    }
                    if (sme.getSmeId() != null) {
                        dto.setSmeId(sme.getSmeId());
                    }

                    // 6. Only set fields if they are not null
                    if (sme.getFullName() != null) {
                        dto.setFullName(sme.getFullName());
                    }
                    if (sme.getEmail() != null) {
                        dto.setEmail(sme.getEmail());
                    }
                    if (sme.getDepartment() != null) {
                        dto.setDepartment(sme.getDepartment());
                    }
                    
                    // 7. Add the safe DTO to the list
                    safeSmeList.add(dto);
                }
            }
        }
        
        // 8. Return the new safe list
        return safeSmeList;
 }
}