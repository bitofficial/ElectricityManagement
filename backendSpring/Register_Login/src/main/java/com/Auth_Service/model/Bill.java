//package com.Auth_Service.model;
//
//import jakarta.persistence.*;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import org.hibernate.annotations.CreationTimestamp;
//
//@Entity
//@Table(name = "bills") // The table name is "bill" in your SQL, but "bills" is conventional
//public class Bill {
//
//    // --- Fields ---
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "bill_id")
//    private Long billId;
//
//    @Column(nullable = false)
//    private String meterId;
//
//    @Column(name = "billing_month", length = 20)
//    private String billingMonth;
//
//    @Column(name = "units_consumed", nullable = false, precision = 10, scale = 2)
//    private BigDecimal unitsConsumed;
//
//    @Column(nullable = false, precision = 10, scale = 2)
//    private BigDecimal amount;
//
//    @Column(name = "due_date")
//    private LocalDate dueDate;
//
//    /**
//     * Stores the status as a String, e.g., "Unpaid" or "Paid".
//     * Defaults to "Unpaid"
//     */
//    @Column(length = 10)
//    private String status = "Unpaid";
//
//    /**
//     * Automatically sets the timestamp when the bill is first created.
//     */
//    @CreationTimestamp
//    @Column(name = "generated_at", updatable = false)
//    private LocalDateTime generatedAt;
//
//    /**
//     * This is the foreign key, as you requested.
//     * It links this bill to a user via their consumer number.
//     */
//    @Column(name = "consumer_number", nullable = false)
//    private String consumerNumber;
//
//
//    // --- Constructors ---
//
//    public Bill() {
//        // Default constructor
//    }
//
//    public Bill(String meterId, String billingMonth, BigDecimal unitsConsumed,
//                BigDecimal amount, LocalDate dueDate, String consumerNumber) {
//        this.meterId = meterId;
//        this.billingMonth = billingMonth;
//        this.unitsConsumed = unitsConsumed;
//        this.amount = amount;
//        this.dueDate = dueDate;
//        this.consumerNumber = consumerNumber;
//        this.status = "Unpaid"; // Default status
//    }
//
//
//    // --- Getters and Setters ---
//
//    public Long getBillId() {
//        return billId;
//    }
//
//    public void setBillId(Long billId) {
//        this.billId = billId;
//    }
//
//    public String getMeterId() {
//        return meterId;
//    }
//
//    public void setMeterId(String meterId) {
//        this.meterId = meterId;
//    }
//
//    public String getBillingMonth() {
//        return billingMonth;
//    }
//
//    public void setBillingMonth(String billingMonth) {
//        this.billingMonth = billingMonth;
//    }
//
//    public BigDecimal getUnitsConsumed() {
//        return unitsConsumed;
//    }
//
//    public void setUnitsConsumed(BigDecimal unitsConsumed) {
//        this.unitsConsumed = unitsConsumed;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public LocalDate getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(LocalDate dueDate) {
//        this.dueDate = dueDate;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//
//    public LocalDateTime getGeneratedAt() {
//        return generatedAt;
//    }
//
//    public void setGeneratedAt(LocalDateTime generatedAt) {
//        this.generatedAt = generatedAt;
//    }
//
//    public String getConsumerNumber() {
//        return consumerNumber;
//    }
//
//    public void setConsumerNumber(String consumerNumber) {
//        this.consumerNumber = consumerNumber;
//    }
//
//	public boolean isPaid() {
//		return false;
//	}
//}

//package com.Auth_Service.model;
//
//import jakarta.persistence.*;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//import java.time.LocalDateTime;
//import org.hibernate.annotations.CreationTimestamp;
//
//@Entity
//@Table(name = "bills")
//public class Bill {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "bill_id")
//    private Long billId;
//
//    @Column(name = "billing_month", length = 20, nullable = false)
//    private String billingMonth;
//
//    @Column(name = "units_consumed", nullable = false, precision = 10, scale = 2)
//    private BigDecimal unitsConsumed;
//
//    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
//    private BigDecimal pricePerUnit;
//
//    @Column(nullable = false, precision = 10, scale = 2)
//    private BigDecimal amount;
//
//    @Column(name = "due_date", nullable = false)
//    private LocalDate dueDate;
//
//    @Column(name = "consumer_number", nullable = false, length = 13)
//    private String consumerNumber;
//
//    @Column(name = "status", length = 10)
//    private String status = "Unpaid";
//
////    @CreationTimestamp
////    @Column(name = "generated_at", updatable = false)
////    private String generatedAt;
//
//    @Column(name = "meter_id", length = 50)
//    private String meterId; // optional, may remain null
//    @Column(name= "payment_date", nullable=true)
//    private LocalDateTime paymentDate;
//
//    // --- Constructors ---
//    public Bill() {}
//
//    // --- Getters & Setters ---
//    public Long getBillId() { return billId; }
//    public void setBillId(Long billId) { this.billId = billId; }
//
//    public String getBillingMonth() { return billingMonth; }
//    public void setBillingMonth(String billingMonth) { this.billingMonth = billingMonth; }
//
//    public BigDecimal getUnitsConsumed() { return unitsConsumed; }
//    public void setUnitsConsumed(BigDecimal unitsConsumed) { this.unitsConsumed = unitsConsumed; }
//
//    public BigDecimal getPricePerUnit() { return pricePerUnit; }
//    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }
//
//    public BigDecimal getAmount() { return amount; }
//    public void setAmount(BigDecimal amount) { this.amount = amount; }
//
//    public LocalDate getDueDate() { return dueDate; }
//    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }
//
//    public String getConsumerNumber() { return consumerNumber; }
//    public void setConsumerNumber(String consumerNumber) { this.consumerNumber = consumerNumber; }
//
//    public String getStatus() { return status; }
//    public void setStatus(String status) { this.status = status; }
//
////    public String getGeneratedAt() { return generatedAt; }
////    public void setGeneratedAt(String generatedAt) { this.generatedAt = generatedAt; }
//
//    public String getMeterId() { return meterId; }
//    public void setMeterId(String meterId) { this.meterId = meterId; }
//
//	public LocalDateTime getPaymentDate() {
//		return paymentDate;
//	}
//
//	public void setPaymentDate(LocalDateTime paymentDate) {
//		this.paymentDate = paymentDate;
//	}
//}


package com.Auth_Service.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import org.hibernate.annotations.CreationTimestamp;

@Entity
@Table(name = "bills")
public class Bill {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "bill_id")
    private Long billId;

    @Column(name = "billing_month", length = 20, nullable = false)
    private String billingMonth;

    @Column(name = "units_consumed", nullable = false, precision = 10, scale = 2)
    private BigDecimal unitsConsumed;

    @Column(name = "price_per_unit", nullable = false, precision = 10, scale = 2)
    private BigDecimal pricePerUnit;

    @Column(nullable = false, precision = 10, scale = 2)
    private BigDecimal amount;

    @Column(name = "due_date", nullable = false)
    private LocalDate dueDate;

    @Column(name = "consumer_number", nullable = false, length = 13)
    private String consumerNumber;

    @Column(name = "status", length = 10)
    private String status = "Unpaid";

    @CreationTimestamp
    @Column(name = "generated_at", updatable = false)
    private LocalDateTime generatedAt;

    @Column(name = "meter_id", length = 50)
    private String meterId; // optional, may remain null
    @Column(name= "payment_date", nullable=true)
    private LocalDateTime paymentDate;

    // --- Constructors ---
    public Bill() {}

    // --- Getters & Setters ---
    public Long getBillId() { return billId; }
    public void setBillId(Long billId) { this.billId = billId; }

    public String getBillingMonth() { return billingMonth; }
    public void setBillingMonth(String billingMonth) { this.billingMonth = billingMonth; }

    public BigDecimal getUnitsConsumed() { return unitsConsumed; }
    public void setUnitsConsumed(BigDecimal unitsConsumed) { this.unitsConsumed = unitsConsumed; }

    public BigDecimal getPricePerUnit() { return pricePerUnit; }
    public void setPricePerUnit(BigDecimal pricePerUnit) { this.pricePerUnit = pricePerUnit; }

    public BigDecimal getAmount() { return amount; }
    public void setAmount(BigDecimal amount) { this.amount = amount; }

    public LocalDate getDueDate() { return dueDate; }
    public void setDueDate(LocalDate dueDate) { this.dueDate = dueDate; }

    public String getConsumerNumber() { return consumerNumber; }
    public void setConsumerNumber(String consumerNumber) { this.consumerNumber = consumerNumber; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getGeneratedAt() { return generatedAt; }
    public void setGeneratedAt(LocalDateTime generatedAt) { this.generatedAt = generatedAt; }

    public String getMeterId() { return meterId; }
    public void setMeterId(String meterId) { this.meterId = meterId; }

    public LocalDateTime getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(LocalDateTime paymentDate) {
        this.paymentDate = paymentDate;
    }

}
