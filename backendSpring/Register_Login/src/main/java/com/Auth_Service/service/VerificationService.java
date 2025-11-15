package com.Auth_Service.service;

import com.Auth_Service.dto.VerificationRequestDTO;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Service
public class VerificationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Object> verifyUser(VerificationRequestDTO request) {
        Map<String, Object> response = new HashMap<>();

        // 1. Find the user by their consumerNumber
        Optional<User> userOptional = userRepository.findByConsumerNumber(request.getConsumerNumber());

        if (userOptional.isEmpty()) {
            // User not found
            response.put("error", "Invalid Consumer Number or Password");
            return response;
        }

        User user = userOptional.get();
        
        // 2. Check if a password is set (is the user registered?)
        if (user.getPassword() == null || user.getPassword().isEmpty()) {
            response.put("error", "User is not fully registered. Please complete registration.");
            return response;
        }

        // 3. Check if the provided password matches the stored hashed password
        if (passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            // Passwords match - Login successful
            response.put("message", "Login Successful");
            response.put("userId", user.getUserId());
            response.put("fullName", user.getFullName());
            response.put("consumerNumber", user.getConsumerNumber());
        } else {
            // Passwords do not match
            response.put("error", "Invalid Consumer Number or Password");
        }

        return response;
    }
}