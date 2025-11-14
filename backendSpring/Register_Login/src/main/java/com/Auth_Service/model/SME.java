package com.Auth_Service.model;

import jakarta.persistence.*;

@Entity
@Table(name = "sme")
public class SME {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String smeId; // e.g., "SME_METER_01"

    @Column(nullable = false)
    private String fullName;

    @Column(nullable = false)
    private String email;

    @Column(nullable = false)
    private String password; // Hashed password

    @Column(nullable = false)
    private String department; // e.g., "Meter", "Billing", "Voltage"

    // --- Constructors, Getters, Setters ---
    public SME() {}

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
    public String getDepartment() { return department; }
    public void setDepartment(String department) { this.department = department; }
}