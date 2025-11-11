package com.Auth_Service.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;

@Entity
@Table(name = "connection")
public class Connection {

    // --- Fields ---

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String billingPeriod; // e.g., "OCT-2025"

    @Column(nullable = false)
    private LocalDate dueDate;

    @Column(nullable = false)
    private BigDecimal amountDue;

    @Column(nullable = false)
    private boolean isPaid;

    /**
     * This is the relationship link.
     * It maps this Bill to a single User.
     * FetchType.LAZY means we only load the User when we explicitly ask for it.
     */
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    
    // --- Constructors ---

    /**
     * Default no-argument constructor (required by JPA)
     */
    public Connection() {
    }

    /**
     * All-argument constructor (except for the auto-generated id)
     */
    public Connection(String billingPeriod, LocalDate dueDate, BigDecimal amountDue, boolean isPaid, User user) {
        this.billingPeriod = billingPeriod;
        this.dueDate = dueDate;
        this.amountDue = amountDue;
        this.isPaid = isPaid;
        this.user = user;
    }

    
    // --- Getters and Setters ---

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getbillingPeriod() {
        return billingPeriod;
    }

    public void setbillingPeriod(String billingPeriod) {
        this.billingPeriod = billingPeriod;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public BigDecimal getAmountDue() {
        return amountDue;
    }

    public void setAmountDue(BigDecimal amountDue) {
        this.amountDue = amountDue;
    }

    public boolean isPaid() {
        return isPaid;
    }

    public void setPaid(boolean isPaid) {
        this.isPaid = isPaid;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }
}