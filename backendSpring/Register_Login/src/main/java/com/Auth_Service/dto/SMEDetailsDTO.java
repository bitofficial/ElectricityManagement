package com.Auth_Service.dto;

import com.Auth_Service.model.SME;

/**
 * A DTO to safely represent an SME for an admin list.
 * It specifically excludes the password.
 */
public class SMEDetailsDTO {

    private Long id;
    private String smeId;
    private String fullName;
    private String email;
    private String department;

    /**
     * This constructor is now "null-safe".
     * It will work even if some database fields are empty.
     */
    

    // --- (Getters and Setters) ---
    public Long getId() { return id; }
    
    public SMEDetailsDTO() {
		
	}

	public SMEDetailsDTO(Long id, String smeId, String fullName, String email, String department) {
		super();
		this.id = id;
		this.smeId = smeId;
		this.fullName = fullName;
		this.email = email;
		this.department = department;
	}
	public void setId(Long id) { this.id = id; }
    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}