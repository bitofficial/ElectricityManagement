package com.Auth_Service.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

/**
 * DTO for a batch payment request.
 * It contains a list of bill IDs and a single payment method.
 */
public class PaymentBatchRequestDTO {

    @NotEmpty(message = "billIds list cannot be empty")
    private List<Long> billIds;

    @NotBlank(message = "Payment method is required")
    private String paymentMethod;

    // --- Getters and Setters ---

    public List<Long> getBillIds() {
        return billIds;
    }

    public void setBillIds(List<Long> billIds) {
        this.billIds = billIds;
    }

    public String getPaymentMethod() {
        return paymentMethod;
    }

    public void setPaymentMethod(String paymentMethod) {
        this.paymentMethod = paymentMethod;
    }
}