package com.Auth_Service.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = {"userId", "email", "consumerNumber"})
})
public class User {

    // --- Fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Pattern(regexp = "^[0-9]{13}$", message = "Please enter a valid Consumer Number.")
    @Column(nullable = false, unique = true)
    private String consumerNumber;

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
    @Column(unique = true)
    private String email;

    @Pattern(regexp = "^[0-9]{10}$", message = "Mobile number is invalid.")
    @NotBlank
    private String mobile;

    @NotBlank
    private String customerType; // Residential / Commercial

    @NotBlank
    private String electricalSection;

    @NotBlank
    @Size(min = 5, max = 20)
    @Column(unique = true)
    private String userId;

    @NotBlank
    private String password;

    @Transient
    private String confirmPassword;


    // --- Constructors ---

    /**
     * Default no-argument constructor (required by JPA)
     */
    public User() {
    }

    /**
     * All-argument constructor
     */
    public User(Long id,
			@Pattern(regexp = "^[0-9]{13}$", message = "Please enter a valid Consumer Number.") String consumerNumber,
			@NotBlank(message = "Full Name is required.") @Size(max = 50) @Pattern(regexp = "^[A-Za-z ]+$", message = "Full Name must contain only alphabets.") String fullName,
			@NotBlank(message = "Address is required.") @Size(min = 10, message = "Address must have at least 10 characters.") String address,
            @NotBlank(message = "City is required.") String city,
            @NotBlank(message = "State is required.") String state,
            @NotBlank(message = "Pincode is required.") @Pattern(regexp = "^[0-9]{6}$", message = "Pincode must be 6 digits.") String pincode,
			@Email(message = "Incorrect email format.") @NotBlank String email,
			@Pattern(regexp = "^[0-9]{10}$", message = "Mobile number is invalid.") @NotBlank String mobile,
			@NotBlank String customerType, @NotBlank String electricalSection,
			@NotBlank @Size(min = 5, max = 20) String userId, @NotBlank String password, String confirmPassword) {
		super();
		this.id = id;
		this.consumerNumber = consumerNumber;
		this.fullName = fullName;
		this.address = address;
        this.city = city;
        this.state = state;
        this.pincode = pincode;
		this.email = email;
		this.mobile = mobile;
		this.customerType = customerType;
		this.electricalSection = electricalSection;
		this.userId = userId;
		this.password = password;
		this.confirmPassword = confirmPassword;
	}


    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state;
    }

    public String getPincode() {
        return pincode;
    }

    public void setPincode(String pincode) {
        this.pincode = pincode;
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

    public String getCustomerType() {
        return customerType;
    }

    public void setCustomerType(String customerType) {
        this.customerType = customerType;
    }

    public String getElectricalSection() {
        return electricalSection;
    }

    public void setElectricalSection(String electricalSection) {
        this.electricalSection = electricalSection;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }
}


