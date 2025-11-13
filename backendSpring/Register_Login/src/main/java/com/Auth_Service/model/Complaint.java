package com.Auth_Service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.Auth_Service.model.User; // ✅ Import your existing User entity

@Data
@Entity
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    // ✅ Connect complaint to your existing User entity via consumerNumber
    @ManyToOne
    @JoinColumn(name = "consumer_number", referencedColumnName = "consumerNumber", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String complaintType;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false, length = 20)
    private String preferredContact; // "Email" or "Phone"

    @Column(nullable = false)
    private String status = "PENDING";

    private LocalDateTime dateSubmitted = LocalDateTime.now();
    private LocalDateTime lastUpdated = LocalDateTime.now();

    private String notes; // Admin/SME notes
    
    

	public Complaint(Long complaintId, User user, String complaintType, String category, String description,
			String preferredContact, String status, LocalDateTime dateSubmitted, LocalDateTime lastUpdated,
			String notes) {
		super();
		this.complaintId = complaintId;
		this.user = user;
		this.complaintType = complaintType;
		this.category = category;
		this.description = description;
		this.preferredContact = preferredContact;
		this.status = status;
		this.dateSubmitted = dateSubmitted;
		this.lastUpdated = lastUpdated;
		this.notes = notes;
	}

	public Complaint() {
		// TODO Auto-generated constructor stub
	}

	public Long getComplaintId() {
		return complaintId;
	}

	public void setComplaintId(Long complaintId) {
		this.complaintId = complaintId;
	}

	public User getUser() {
		return user;
	}

	public void setUser(User user) {
		this.user = user;
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

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public LocalDateTime getDateSubmitted() {
		return dateSubmitted;
	}

	public void setDateSubmitted(LocalDateTime dateSubmitted) {
		this.dateSubmitted = dateSubmitted;
	}

	public LocalDateTime getLastUpdated() {
		return lastUpdated;
	}

	public void setLastUpdated(LocalDateTime lastUpdated) {
		this.lastUpdated = lastUpdated;
	}

	public String getNotes() {
		return notes;
	}

	public void setNotes(String notes) {
		this.notes = notes;
	}
    
    
}
