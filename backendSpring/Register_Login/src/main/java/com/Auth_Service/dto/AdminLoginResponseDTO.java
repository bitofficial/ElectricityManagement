package com.Auth_Service.dto;

public class AdminLoginResponseDTO {

    private String message;
    private String adminId;

    public AdminLoginResponseDTO(String message, String adminId) {
        this.message = message;
        this.adminId = adminId;
    }

    // --- Getters and Setters ---

    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public String getAdminId() {
        return adminId;
    }
    public void setAdminId(String adminId) {
        this.adminId = adminId;
    }
}