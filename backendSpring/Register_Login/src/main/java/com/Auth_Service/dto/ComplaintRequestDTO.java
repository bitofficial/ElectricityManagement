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

	public ComplaintRequestDTO(@NotBlank String consumerNumber, @NotBlank String complaintType,
			@NotBlank String category, @NotBlank String description, @NotBlank String preferredContact) {
		super();
		this.consumerNumber = consumerNumber;
		this.complaintType = complaintType;
		this.category = category;
		this.description = description;
		this.preferredContact = preferredContact;
	}

	public String getConsumerNumber() {
		return consumerNumber;
	}

	public void setConsumerNumber(String consumerNumber) {
		this.consumerNumber = consumerNumber;
	}

	public String getComplaintType() {
		return complaintType;
	}

	public void setComplaintType(String complaintType) {
		this.complaintType = complaintType;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPreferredContact() {
		return preferredContact;
	}

	public void setPreferredContact(String preferredContact) {
		this.preferredContact = preferredContact;
	}
    
    
}
