package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

/**
 * DTO for an Admin to update a User's connection status.
 */
public class UserStatusUpdateDTO {

    @NotBlank(message = "New status is required")
    @Pattern(regexp = "^(Active|Inactive)$", message = "Status must be 'Active' or 'Inactive'")
    private String newStatus;

    // --- Getter and Setter ---

    public String getNewStatus() {
        return newStatus;
    }

    public void setNewStatus(String newStatus) {
        this.newStatus = newStatus;
    }
}