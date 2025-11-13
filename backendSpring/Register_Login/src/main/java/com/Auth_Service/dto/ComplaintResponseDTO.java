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
	public ComplaintResponseDTO(Long complaintId, String complaintType, String category, String description,
			String status, String notes, LocalDateTime dateSubmitted, String consumerNumber, String fullName,
			String email, String mobile) {
		super();
		this.complaintId = complaintId;
		this.complaintType = complaintType;
		this.category = category;
		this.description = description;
		this.status = status;
		this.notes = notes;
		this.dateSubmitted = dateSubmitted;
		this.consumerNumber = consumerNumber;
		this.fullName = fullName;
		this.email = email;
		this.mobile = mobile;
	}
	public ComplaintResponseDTO() {
		// TODO Auto-generated constructor stub
	}
	public Long getComplaintId() {
		return complaintId;
	}
	public void setComplaintId(Long complaintId) {
		this.complaintId = complaintId;
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
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getNotes() {
		return notes;
	}
	public void setNotes(String notes) {
		this.notes = notes;
	}
	public LocalDateTime getDateSubmitted() {
		return dateSubmitted;
	}
	public void setDateSubmitted(LocalDateTime dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}
	public String getConsumerNumber() {
		return consumerNumber;
	}
	public void setConsumerNumber(String consumerNumber) {
		this.consumerNumber = consumerNumber;
	}
	public String getFullName() {
		return fullName;
	}
	public void setFullName(String fullName) {
		this.fullName = fullName;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
    
    
}
