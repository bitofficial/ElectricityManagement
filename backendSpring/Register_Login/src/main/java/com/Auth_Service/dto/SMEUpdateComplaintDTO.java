package com.Auth_Service.dto;

/**
 * DTO for an SME to update a complaint's status.
 */
public class SMEUpdateComplaintDTO {
    
    private String status; // e.g., "Resolved"
    
    // The field must be "comments" to match the service
    private String comments; // e.g., "Meter replaced successfully"
    
    // Getters & setters
    public String getStatus() { 
        return status; 
    }
    public void setStatus(String status) { 
        this.status = status; 
    }
    
    // The method must be "getComments"
    public String getComments() { 
        return comments; 
    }
    public void setComments(String comments) { 
        this.comments = comments; 
    }
}