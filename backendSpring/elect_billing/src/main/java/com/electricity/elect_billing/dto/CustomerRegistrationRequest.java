package com.electricity.elect_billing.dto;

import lombok.Data;

@Data
public class CustomerRegistrationRequest {
    private String username;
    private String password;
    private String fullName;
    private String address;
    private String email;
    private String mobile;
    private String customerType;
    private String electricalSection;
}
