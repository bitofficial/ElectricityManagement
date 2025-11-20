package com.Auth_Service.dto;

import com.Auth_Service.model.Bill;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class BillResponseDTO {

    private Long billId;
    private String billingMonth;
    private BigDecimal unitsConsumed;
    private BigDecimal pricePerUnit;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String consumerNumber;
    private String status;
    private LocalDateTime generatedAt;
    private String meterId;
    private LocalDateTime paymentDate;

    // Default Constructor
    public BillResponseDTO() {}

    // Constructor that accepts Bill Entity
    public BillResponseDTO(Bill bill) {
        this.billId = bill.getBillId();
        this.billingMonth = bill.getBillingMonth();
        this.unitsConsumed = bill.getUnitsConsumed();
        this.pricePerUnit = bill.getPricePerUnit();
        this.amount = bill.getAmount();
        this.dueDate = bill.getDueDate();
        this.consumerNumber = bill.getConsumerNumber();
        this.status = bill.getStatus();
        this.generatedAt = bill.getGeneratedAt();
        this.meterId = bill.getMeterId();
        this.paymentDate = bill.getPaymentDate();
    }

    // Getters & Setters

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
    }

    public String getBillingMonth() {
        return billingMonth;
    }

    public void setBillingMonth(String billingMonth) {
        this.billingMonth = billingMonth;
    }

    public BigDecimal getUnitsConsumed() {
        return unitsConsumed;
    }

    public void setUnitsConsumed(BigDecimal unitsConsumed) {
        this.unitsConsumed = unitsConsumed;
    }

    public BigDecimal getPricePerUnit() {
        return pricePerUnit;
    }

    public void setPricePerUnit(BigDecimal pricePerUnit) {
        this.pricePerUnit = pricePerUnit;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getConsumerNumber() {
        return consumerNumber;
    }

    public void setConsumerNumber(String consumerNumber) {
        this.consumerNumber = consumerNumber;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public String getMeterId() {
        return meterId;
    }

    public void setMeterId(String meterId) {
        this.meterId = meterId;
    }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }
}