package com.Auth_Service.dto;

/**
 * This is the main DTO for the entire dashboard.
 * It combines User info and Bill info.
 */
public class DashboardResponseDTO {

    // For "Welcome, Rajesh"
    private String fullName;

    // For "Account No: AC-12345678"
    private String consumerNumber;

    // For "Billing Address: ..."
    private String billingAddress;

    // For the "Current Bill" box
    private BillSummaryDTO currentBill;

    // Constructors
    public DashboardResponseDTO() {
    }

    // Getters and Setters
    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getBillingAddress() {
        return billingAddress;
    }

    public void setBillingAddress(String billingAddress) {
        this.billingAddress = billingAddress;
    }

    public BillSummaryDTO getCurrentBill() {
        return currentBill;
    }

    public void setCurrentBill(BillSummaryDTO currentBill) {
        this.currentBill = currentBill;
    }
}