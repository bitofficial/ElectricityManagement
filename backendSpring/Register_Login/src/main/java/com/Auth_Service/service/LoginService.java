package com.Auth_Service.service;

import com.Auth_Service.dto.LoginRequest;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    /**
     * Handles user login authentication.
     */
    public Map<String, Object> login(LoginRequest loginRequest) {
        Map<String, Object> response = new HashMap<>();

        User user = userRepository.findByUserId(loginRequest.getUserId())
                .orElse(null);

        if (user == null) {
            response.put("error", "User ID not found");
            return response;
        }

        // Compare encoded passwords
        if (!passwordEncoder.matches(loginRequest.getPassword(), user.getPassword())) {
            response.put("error", "Invalid password");
            return response;
        }

        response.put("message", "Login successful");
        response.put("consumerNumber", user.getConsumerNumber());
//        response.put("firstLogin", user.isFirstLogin());
        response.put("name", user.getFullName());
        response.put("email", user.getEmail());

        return response;
    }

    /**
     * Updates the user's password and sets firstLogin = false.
     */
    public User updatePassword(String userId, String newPassword) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        user.setPassword(passwordEncoder.encode(newPassword));
//        user.setFirstLogin(false);

        return userRepository.save(user);
    }
}