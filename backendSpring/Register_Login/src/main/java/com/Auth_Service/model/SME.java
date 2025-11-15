package com.Auth_Service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sme")
public class SME {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String smeId;

    @Column(nullable = false)
    private String fullName; // <-- FIELD

    @Column(nullable = false, unique = true)
    private String email; // <-- FIELD

    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String department; // <-- FIELD
    
    // --- Constructors ---
    public SME() {}
    
    public SME(String smeId, String fullName, String email, String password, String department) {
        this.smeId = smeId;
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.department = department;
    }

    // --- Getters and Setters ---
    
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }

    // --- THESE 3 GETTERS MUST MATCH THE DTO ---
    public String getFullName() { return fullName; }
    public String getEmail() { return email; }
    public String getDepartment() { return department; }
    // ---
    
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public void setEmail(String email) { this.email = email; }
    public void setDepartment(String department) { this.department = department; }
}