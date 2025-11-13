package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;

public class PaymentRequestDTO {
    
    @NotBlank(message = "Payment method is required")
    private String paymentMethod; // "UPI", "Credit Card", etc.

    // Getters and Setters
    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}