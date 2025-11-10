package com.electricity.elect_billing.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "consumers")
public class Consumer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer consumerId;

    @Column(nullable = false, unique = true, length = 13)
    private String consumerNumber;

    @ManyToOne
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;  // which customer this belongs to

    @Column(nullable = false, length = 20)
    private String connectionStatus = "ACTIVE";   // ACTIVE / INACTIVE

    @Column(nullable = false, length = 20)
    private String connectionType; // Domestic / Commercial

    // getters and setters (can generate via IntelliJ)
}
