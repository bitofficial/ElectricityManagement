package com.Auth_Service.dto;

import jakarta.validation.constraints.*;

/**
 * DTO used by Admin to manually add a new customer.
 */
public class AdminAddUserDTO {

    @Pattern(regexp = "^[0-9]{13}$", message = "Consumer number must be 13 digits.")
    @NotBlank(message = "Consumer number is required.")
    private String consumerNumber;

    @NotBlank(message = "Full name is required.")
    @Size(max = 50)
    private String fullName;

    @NotBlank(message = "Address is required.")
    @Size(min = 10)
    private String address;

    @NotBlank(message = "City is required.")
    private String city;

    @NotBlank(message = "State is required.")
    private String state;

    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits.")
    @NotBlank
    private String pincode;

    @Email(message = "Invalid email format.")
    @NotBlank
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number must be 10 digits.")
    @NotBlank
    private String mobile;

    @NotBlank(message = "Customer type is required (Residential/Commercial).")
    private String customerType;

    @NotBlank(message = "Electrical section is required.")
    private String electricalSection;

    @NotBlank(message = "User ID is required.")
    private String userId;


    @Size(min = 6, message = "Password must be at least 6 characters long.")
    private String password;

    // --- Getters and Setters ---

    public String getConsumerNumber() { return consumerNumber; }
    public void setConsumerNumber(String consumerNumber) { this.consumerNumber = consumerNumber; }

    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getCity() { return city; }
    public void setCity(String city) { this.city = city; }

    public String getState() { return state; }
    public void setState(String state) { this.state = state; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getCustomerType() { return customerType; }
    public void setCustomerType(String customerType) { this.customerType = customerType; }

    public String getElectricalSection() { return electricalSection; }
    public void setElectricalSection(String electricalSection) { this.electricalSection = electricalSection; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }
}
