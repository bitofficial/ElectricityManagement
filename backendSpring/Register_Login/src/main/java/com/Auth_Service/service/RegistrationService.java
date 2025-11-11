package com.Auth_Service.service;

import com.Auth_Service.model.User;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
public class RegistrationService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public Map<String, Object> registerUser(User user) {
        Map<String, Object> response = new HashMap<>();

        if (userRepository.existsByUserId(user.getUserId())) {
            response.put("error", "User ID already exists. Please choose a different User ID.");
            return response;
        }
        if (userRepository.existsByEmail(user.getEmail())) {
            response.put("error", "Email already exists.");
            return response;
        }
        if (userRepository.existsByConsumerNumber(user.getConsumerNumber())) {
            response.put("error", "Please enter a valid Consumer Number.");
            return response;
        }
        if (!user.getPassword().equals(user.getConfirmPassword())) {
            response.put("error", "Passwords do not match.");
            return response;
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        String customerId = "CUST" + (new Random().nextInt(9000000) + 1000000);

        response.put("message", "Registration successful");
        response.put("customerId", customerId);
        response.put("name", user.getFullName());
        response.put("email", user.getEmail());
        return response;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User saveUser(User user) {
        if (passwordEncoder != null && user.getPassword() != null) {
            user.setPassword(passwordEncoder.encode(user.getPassword()));
        }
        return userRepository.save(user);
    }
    public Optional<User> getUserById(String userId)
    {
    	return userRepository.findByUserId(userId);
    }
}