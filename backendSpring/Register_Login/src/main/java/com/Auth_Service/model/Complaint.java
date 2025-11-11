package com.Auth_Service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import com.Auth_Service.model.User; // ✅ Import your existing User entity

@Data
@Entity
@Table(name = "complaint")
public class Complaint {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long complaintId;

    // ✅ Connect complaint to your existing User entity via consumerNumber
    @ManyToOne
    @JoinColumn(name = "consumer_number", referencedColumnName = "consumerNumber", nullable = false)
    private User user;

    @Column(nullable = false, length = 50)
    private String complaintType;

    @Column(nullable = false, length = 50)
    private String category;

    @Column(nullable = false, length = 500)
    private String description;

    @Column(nullable = false, length = 20)
    private String preferredContact; // "Email" or "Phone"

    @Column(nullable = false)
    private String status = "PENDING";

    private LocalDateTime dateSubmitted = LocalDateTime.now();
    private LocalDateTime lastUpdated = LocalDateTime.now();

    private String notes; // Admin/SME notes
}
