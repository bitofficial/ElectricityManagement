package com.electricity.elect_billing.repository;

import com.electricity.elect_billing.entity.Consumer;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ConsumerRepository extends JpaRepository<Consumer, Integer> {
}
