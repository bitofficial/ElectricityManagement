package com.Auth_Service.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "payments")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String invoiceNumber; // e.g., "INV-a1b2c3d4"

    @Column(nullable = false, unique = true)
    private String transactionId; // e.g., "TXN-..."

    @Column(nullable = false, unique = true)
    private String paymentId; // e.g., "PAY-..."

    @Column(nullable = false, unique = true)
    private String receiptNumber; // e.g., "RCT-..."

    @Column(nullable = false)
    private String paymentMethod; // e.g., "UPI", "Credit Card"

    @Column(nullable = false)
    private LocalDateTime transactionDate;

    // --- Foreign Keys ---
    
    @Column(nullable = false)
    private Long billId; // Foreign key to bills table

    @Column(nullable = false)
    private String consumerNumber; // Foreign key to user table

    // --- Bill Details (copied for the invoice) ---
    
    @Column(nullable = false)
    private String billingMonth;

    @Column(nullable = false)
    private BigDecimal amount;

    @Column(nullable = false)
    private BigDecimal unitsConsumed;

    @Column(nullable = false)
    private String status = "Paid"; // Status will always be "Paid"

    @Column(nullable = false, updatable = false)
    private LocalDateTime generatedAt;

    
    // --- Constructors ---
    public Payment() {
    }
    public Payment(Long id, String invoiceNumber, String transactionId, String paymentId, String receiptNumber,
			String paymentMethod, LocalDateTime transactionDate, Long billId, String consumerNumber,
			String billingMonth, BigDecimal amount, BigDecimal unitsConsumed, String status,
			LocalDateTime generatedAt) {
		super();
		this.id = id;
		this.invoiceNumber = invoiceNumber;
		this.transactionId = transactionId;
		this.paymentId = paymentId;
		this.receiptNumber = receiptNumber;
		this.paymentMethod = paymentMethod;
		this.transactionDate = transactionDate;
		this.billId = billId;
		this.consumerNumber = consumerNumber;
		this.billingMonth = billingMonth;
		this.amount = amount;
		this.unitsConsumed = unitsConsumed;
		this.status = status;
		this.generatedAt = generatedAt;
	}
    

    // --- Getters and Setters ---
    // (Your IDE can generate these, or I can provide them)
    // ...
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getInvoiceNumber() { return invoiceNumber; }
    public void setInvoiceNumber(String invoiceNumber) { this.invoiceNumber = invoiceNumber; }
    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }
    public String getPaymentId() { return paymentId; }
    public void setPaymentId(String paymentId) { this.paymentId = paymentId; }
    public String getReceiptNumber() { return receiptNumber; }
    public void setReceiptNumber(String receiptNumber) { this.receiptNumber = receiptNumber; }
    public String getPaymentMethod() { return paymentMethod; }
    public void setPaymentMethod(String paymentMethod) { this.paymentMethod = paymentMethod; }
    public LocalDateTime getTransactionDate() { return transactionDate; }
    public void setTransactionDate(LocalDateTime transactionDate) { this.transactionDate = transactionDate; }
    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }
    public String getConsumerNumber() { return consumerNumber; }
    public void setConsumerNumber(String consumerNumber) { this.consumerNumber = consumerNumber; }
    public String getBillingMonth() { return billingMonth; }
    public void setBillingMonth(String billingMonth) { this.billingMonth = billingMonth; }
    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }
    public BigDecimal getUnitsConsumed() { return unitsConsumed; }
    public void setUnitsConsumed(BigDecimal unitsConsumed) { this.unitsConsumed = unitsConsumed; }
    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }
    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

	
    
}