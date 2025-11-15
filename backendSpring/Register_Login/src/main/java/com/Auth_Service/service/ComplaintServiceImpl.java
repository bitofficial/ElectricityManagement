package com.Auth_Service.service;

import com.Auth_Service.dto.ComplaintRequestDTO;
import com.Auth_Service.dto.ComplaintResponseDTO;
import com.Auth_Service.model.Complaint;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.ComplaintRepository;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintServiceImpl implements ComplaintService {

    @Autowired
    private ComplaintRepository complaintRepo;

    @Autowired
    private UserRepository userRepo;

    @Override
    public ComplaintResponseDTO raiseComplaint(ComplaintRequestDTO dto) {
        User user = userRepo.findByConsumerNumber(dto.getConsumerNumber())
                .orElseThrow(() -> new RuntimeException("Invalid consumer number"));

        Complaint complaint = new Complaint();
        complaint.setUser(user);
        complaint.setComplaintType(dto.getComplaintType());
        complaint.setCategory(dto.getCategory());
        complaint.setDescription(dto.getDescription());
        complaint.setPreferredContact(dto.getPreferredContact());

        Complaint saved = complaintRepo.save(complaint);
        return mapToResponse(saved);
    }

    @Override
    public List<ComplaintResponseDTO> getComplaintsByConsumer(String consumerNumber) {
        return complaintRepo.findByUserConsumerNumber(consumerNumber)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }
    @Override
    public ComplaintResponseDTO getComplaintById(String consumerNumber, Long complaintId) {
        Complaint complaint = complaintRepo.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        // Security check — ensure this complaint belongs to the same consumer
        if (!complaint.getUser().getConsumerNumber().equals(consumerNumber)) {
            throw new RuntimeException("Unauthorized access: Complaint does not belong to this consumer.");
        }

        return mapToResponse(complaint);
    }


    @Override
    public ComplaintResponseDTO updateComplaintStatus(Long complaintId, String status, String notes) {
        Complaint complaint = complaintRepo.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        complaint.setStatus(status);
        complaint.setNotes(notes);
        complaint.setLastUpdated(LocalDateTime.now());
        return mapToResponse(complaintRepo.save(complaint));
    }

    @Override
    public List<ComplaintResponseDTO> getComplaintHistory(String consumerNumber, String status, String type,
                                                          LocalDate startDate, LocalDate endDate) {
        List<Complaint> complaints = complaintRepo.findByUserConsumerNumber(consumerNumber);

        // Apply optional filters (using Stream)
        return complaints.stream()
                .filter(c -> (status == null || c.getStatus().equalsIgnoreCase(status)))
                .filter(c -> (type == null || c.getComplaintType().equalsIgnoreCase(type)))
                .filter(c -> (startDate == null || !c.getDateSubmitted().toLocalDate().isBefore(startDate)))
                .filter(c -> (endDate == null || !c.getDateSubmitted().toLocalDate().isAfter(endDate)))
                .map(this::mapToResponse)
                .toList();
    }
    @Override
    public List<ComplaintResponseDTO> getAllComplaints() {
        return complaintRepo.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }


    private ComplaintResponseDTO mapToResponse(Complaint c) {
        ComplaintResponseDTO dto = new ComplaintResponseDTO();
        dto.setComplaintId(c.getComplaintId());
        dto.setComplaintType(c.getComplaintType());
        dto.setCategory(c.getCategory());
        dto.setDescription(c.getDescription());
        dto.setStatus(c.getStatus());
        dto.setNotes(c.getNotes());
        dto.setDateSubmitted(c.getDateSubmitted());
        dto.setConsumerNumber(c.getUser().getConsumerNumber());
        dto.setFullName(c.getUser().getFullName());
        dto.setEmail(c.getUser().getEmail());
        dto.setMobile(c.getUser().getMobile());
        return dto;
    }


}
