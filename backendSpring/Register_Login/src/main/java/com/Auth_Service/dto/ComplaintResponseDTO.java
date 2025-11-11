package com.Auth_Service.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class ComplaintResponseDTO{
    private Long complaintId;
    private String complaintType;
    private String category;
    private String description;
    private String status;
    private String notes;
    private LocalDateTime dateSubmitted;
    private String consumerNumber;
    private String fullName;
    private String email;
    private String mobile;
}
