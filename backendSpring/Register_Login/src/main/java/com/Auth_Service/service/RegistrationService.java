package com.Auth_Service.service;

import com.Auth_Service.exception.ApiException;
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

//    public Map<String, Object> registerUser(User user) {
//        Map<String, Object> response = new HashMap<>();
//
//        if (userRepository.existsByUserId(user.getUserId())) {
//            response.put("error", "User ID already exists. Please choose a different User ID.");
//            return response;
//        }
//        if (userRepository.existsByEmail(user.getEmail())) {
//            response.put("error", "Email already exists.");
//            return response;
//        }
//        if (userRepository.existsByConsumerNumber(user.getConsumerNumber())) {
//            response.put("error", "Please enter a valid Consumer Number.");
//            return response;
//        }
//        if (!user.getPassword().equals(user.getConfirmPassword())) {
//            response.put("error", "Passwords do not match.");
//            return response;
//        }
//
//        user.setPassword(passwordEncoder.encode(user.getPassword()));
//
//        userRepository.save(user);
//        String customerId = "CUST" + (new Random().nextInt(9000000) + 1000000);
//
//        response.put("message", "Registration successful");
//        response.put("customerId", customerId);
//        response.put("name", user.getFullName());
//        response.put("email", user.getEmail());
//        return response;
//    }

    public Map<String, Object> registerUser(User userInput) {

        // 1. Check if consumer number exists (must be added by admin earlier)
        Optional<User> optionalUser = userRepository.findByConsumerNumber(userInput.getConsumerNumber());

        if (optionalUser.isEmpty()) {
            throw new ApiException("Invalid Consumer Number. Contact Admin.", 400);
        }

        User user = optionalUser.get();

        // 2. Check if already registered (password exists)
        if (user.getPassword() != null && !user.getPassword().isEmpty()) {
            throw new ApiException("This consumer is already registered. Please login.", 409);
        }

        // 3. Email already taken by another user?
        if (userInput.getEmail() != null &&
                userRepository.existsByEmail(userInput.getEmail()) &&
                !userInput.getEmail().equals(user.getEmail())) {

            throw new ApiException("Email already exists.", 409);
        }

        // 4. Validate matching passwords
        if (!userInput.getPassword().equals(userInput.getConfirmPassword())) {
            throw new ApiException("Passwords do not match.", 400);
        }

        // 5. Save new registration details into existing DB entry
        user.setFullName(userInput.getFullName());
        user.setEmail(userInput.getEmail());
        user.setPassword(passwordEncoder.encode(userInput.getPassword()));

        userRepository.save(user);

        // SUCCESS RESPONSE
        Map<String, Object> response = new HashMap<>();
        response.put("message", "Registration successful");
        response.put("consumerNumber", user.getConsumerNumber());
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