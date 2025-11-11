package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ComplaintRequestDTO {
    @NotBlank
    private String consumerNumber;

    @NotBlank
    private String complaintType;

    @NotBlank
    private String category;

    @NotBlank
    private String description;

    @NotBlank
    private String preferredContact;
}
