package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// This is a Data Transfer Object (DTO).
// It's a clean way to model the incoming JSON request for login.
@Data
public class LoginRequest {

    @NotBlank(message = "User ID is required")
    private String userId;

    @NotBlank(message = "Password is required")
    private String password;

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
    
    
}