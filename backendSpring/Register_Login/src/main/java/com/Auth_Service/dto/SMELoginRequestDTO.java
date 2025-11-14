package com.Auth_Service.dto;
public class SMELoginRequestDTO {
    private String smeId;
    private String password;
    // getters & setters
    public String getSmeId() { return smeId; }
    public void setSmeId(String smeId) { this.smeId = smeId; }
    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}