package com.Auth_Service.repository;

import com.Auth_Service.model.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {

    /**
     * Finds an admin by their 5-digit adminId.
     */
    Optional<Admin> findByAdminId(String adminId);

}