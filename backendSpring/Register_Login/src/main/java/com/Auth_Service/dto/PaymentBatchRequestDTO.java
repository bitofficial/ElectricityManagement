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

    @NotBlank(message = "Transaction ID is required")
    private String transactionId;

    @NotBlank(message = "Payment ID is required")
    private String paymentId;

    @NotBlank(message = "Invoice number is required")
    private String invoiceNumber;

    @NotBlank(message = "Receipt number is required")
    private String receiptNumber;





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

    public String getTransactionId() {
        return transactionId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public String getPaymentId() {
        return paymentId;
    }

    public void setPaymentId(String paymentId) {
        this.paymentId = paymentId;
    }

    public String getInvoiceNumber() {
        return invoiceNumber;
    }

    public void setInvoiceNumber(String invoiceNumber) {
        this.invoiceNumber = invoiceNumber;
    }

    public String getReceiptNumber() {
        return receiptNumber;
    }

    public void setReceiptNumber(String receiptNumber) {
        this.receiptNumber = receiptNumber;
    }
}