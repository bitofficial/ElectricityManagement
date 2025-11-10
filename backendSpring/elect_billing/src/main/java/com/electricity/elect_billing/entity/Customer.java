package com.electricity.elect_billing.entity;

import jakarta.persistence.*;
import java.util.List;
import lombok.Data;

@Data
@Entity
@Table(name = "customers")
public class Customer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer customerId;

    @OneToOne
    @JoinColumn(name = "user_id", unique = true)
    private User user;     // mapping to login table

    @Column(nullable = false, length = 50)
    private String fullName;

    @Column(nullable = false, length = 255)
    private String address;

    @Column(nullable = false, unique = true, length = 100)
    private String email;

    @Column(nullable = false, length = 15)
    private String mobile;

    @Column(nullable = false, length = 20)
    private String customerType;   // Residential / Commercial

    @Column(nullable = false, length = 50)
    private String electricalSection;

    // each customer has multiple consumers
    @OneToMany(mappedBy = "customer")
    private List<Consumer> consumers;

    // getters and setters (can generate via IntelliJ)
}
