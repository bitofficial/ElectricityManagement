package com.Auth_Service.repository;

import com.Auth_Service.dto.ComplaintRequestDTO;
import com.Auth_Service.dto.ComplaintResponseDTO;
import java.util.List;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface ComplaintService {
    ComplaintResponseDTO raiseComplaint(ComplaintRequestDTO dto);
    List<ComplaintResponseDTO> getComplaintsByConsumer(String consumerNumber,LocalDateTime lastUpdated);
    ComplaintResponseDTO updateComplaintStatus(Long complaintId, String status, String notes);
    List<ComplaintResponseDTO> getComplaintHistory(String consumerNumber, String status, String type, LocalDate startDate, LocalDate endDate);
    ComplaintResponseDTO getComplaintById(String consumerNumber, Long complaintId);

}

