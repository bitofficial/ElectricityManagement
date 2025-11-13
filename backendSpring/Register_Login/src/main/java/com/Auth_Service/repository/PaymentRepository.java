package com.Auth_Service.repository;

import com.Auth_Service.model.Payment;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // You can add findBy... methods here later if needed
	Optional<Payment> findByBillIdAndConsumerNumber(Long billId, String consumerNumber);
}