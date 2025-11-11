
package com.Auth_Service.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * This DTO holds the data for the "Current Bill" box.
 * UPDATED to match the new Bill.java fields.
 */
public class BillSummaryDTO {

    // --- Updated Fields ---
    private String billingMonth; // Was: billingPeriod
    private LocalDate dueDate;
    private BigDecimal amount; // Was: amountDue
    private String status; // Was: isPaid (boolean)

    // --- Constructors ---
    public BillSummaryDTO() {
    }

    /**
     * THIS IS THE NEW CONSTRUCTOR
     * It matches the fields: (String, LocalDate, BigDecimal, String)
     */
    public BillSummaryDTO(String billingMonth, LocalDate dueDate, BigDecimal amount, String status) {
        this.billingMonth = billingMonth;
        this.dueDate = dueDate;
        this.amount = amount;
        this.status = status;
    }

    // --- Updated Getters and Setters ---
    public String getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(String billingMonth) {
        this.billingMonth = billingMonth;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}