package com.Auth_Service.repository;
import com.Auth_Service.model.SME;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface SMERepository extends JpaRepository<SME, Long> {
    Optional<SME> findBySmeId(String smeId);
}