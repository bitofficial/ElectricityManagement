package com.Auth_Service.service;

import com.Auth_Service.dto.UserProfileUpdateDTO;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional
    public User updateUserProfile(String consumerNumber, UserProfileUpdateDTO dto) {

        // 1. Find the user
        User user = userRepository.findByConsumerNumber(consumerNumber)
                .orElseThrow(() -> new RuntimeException("User not found with consumer number: " + consumerNumber));

        // 2. Check for email conflicts
        if (!user.getEmail().equals(dto.getEmail()) && userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Error: Email address is already in use.");
        }

        // 3. Check for userId conflicts
        if (!user.getUserId().equals(dto.getUserId()) && userRepository.existsByUserId(dto.getUserId())) {
            throw new RuntimeException("Error: User ID is already taken.");
        }

        // 4. Update all normal fields
        user.setFullName(dto.getFullName());
        user.setAddress(dto.getAddress());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setPincode(dto.getPincode());
        user.setEmail(dto.getEmail());
        user.setMobile(dto.getMobile());
        user.setCustomerType(dto.getCustomerType());
        user.setElectricalSection(dto.getElectricalSection());
        user.setUserId(dto.getUserId());

        // 5. Check and update password (if provided)
        if (dto.getNewPassword() != null && !dto.getNewPassword().isEmpty()) {
            if (!dto.getNewPassword().equals(dto.getConfirmPassword())) {
                throw new RuntimeException("Error: Passwords do not match.");
            }
            // Hash the new password before saving

            user.setPassword(passwordEncoder.encode(dto.getNewPassword()));
            System.out.println(dto.getConfirmPassword());
        }

        // 6. Save and return the updated user
        return userRepository.save(user);
    }
}