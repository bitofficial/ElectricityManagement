package com.electricity.elect_billing.repository;

import com.electricity.elect_billing.entity.Customer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CustomerRepository extends JpaRepository<Customer, Integer> {
}
