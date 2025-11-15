package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;

public class VerificationRequestDTO {
	
	@NotBlank(message = "Consumer number is required")
	private String consumerNumber;
	
	@NotBlank(message = "Password is required")
	private String password;

	public String getConsumerNumber() {
		return consumerNumber;
	}

	public void setConsumerNumber(String consumerNumber) {
		this.consumerNumber = consumerNumber;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}
	
	
	

}
