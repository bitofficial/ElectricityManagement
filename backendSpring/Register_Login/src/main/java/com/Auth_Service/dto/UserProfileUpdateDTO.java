package com.Auth_Service.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

/**
 * DTO for a User to update their own profile.
 * This one includes password fields.
 */
public class UserProfileUpdateDTO {

    @NotBlank(message = "Full Name is required.")
    @Size(max = 50)
    @Pattern(regexp = "^[A-Za-z ]+$", message = "Full Name must contain only alphabets.")
    private String fullName;

    @NotBlank(message = "Address is required.")
    @Size(min = 10, message = "Address must have at least 10 characters.")
    private String address;

    @NotBlank(message = "City is required.")
    private String city;

    @NotBlank(message = "State is required.")
    private String state;

    @NotBlank(message = "Pincode is required.")
    @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits.")
    private String pincode;

    @Email(message = "Incorrect email format.")
    @NotBlank
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number is invalid.")
    @NotBlank
    private String mobile;

    @NotBlank
    private String customerType;

    @NotBlank
    private String electricalSection;

    public String getElectricalSection() {
        return electricalSection;
    }

    public void setElectricalSection(String electricalSection) {
        this.electricalSection = electricalSection;
    }

    @NotBlank
    @Size(min = 5, max = 20)
    private String userId;

    // --- New Password Fields ---
    // These can be blank if the user doesn't want to change their password

    private String newPassword;

    private String confirmPassword;


    // --- Getters and Setters ---

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
    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getNewPassword() { return newPassword; }
    public void setNewPassword(String newPassword) { this.newPassword = newPassword; }
    public String getConfirmPassword() { return confirmPassword; }
    public void setConfirmPassword(String confirmPassword) { this.confirmPassword = confirmPassword; }
}