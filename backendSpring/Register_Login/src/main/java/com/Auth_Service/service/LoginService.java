package com.Auth_Service.service;

import com.Auth_Service.dto.LoginRequest;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class LoginService {

    // This service can now safely use the UserRepository
    @Autowired
    private UserRepository userRepository;

    // It uses the same PasswordEncoder bean
    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Object> login(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        // 1. Find the user by their userId from the database
        Optional<User> userOptional = userRepository.findByUserId(loginRequest.getUserId());

        if (userOptional.isEmpty()) {
            // User not found
            response.put("error", "Invalid User ID or Password");
            return response;
        }

        User user = userOptional.get();

        // 2. Check if the provided password matches the stored hashed password
        if (passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            // Passwords match - Login successful
            response.put("message", "Login Successful");
            response.put("userId", user.getUserId());
            response.put("fullName", user.getFullName());
            response.put("email", user.getEmail());
        } else {
            // Passwords do not match
            response.put("error", "Invalid User ID or Password");
        }

        return response;
    }
}