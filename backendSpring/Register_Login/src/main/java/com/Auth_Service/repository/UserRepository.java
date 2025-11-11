package com.Auth_Service.repository;

import com.Auth_Service.model.User;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByUserId(String userId);
    boolean existsByEmail(String email);
    boolean existsByConsumerNumber(String consumerNumber);
    
    Optional<User> findByUserId(String userId);

    // --- ADD THIS NEW METHOD ---
    /**
     * Finds a user by their unique consumer number.
     * This is needed for the dashboard to get the user's name and address.
     */
    Optional<User> findByConsumerNumber(String consumerNumber);
}