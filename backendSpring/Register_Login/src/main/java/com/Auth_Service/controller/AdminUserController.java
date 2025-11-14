package com.Auth_Service.controller;

import com.Auth_Service.dto.AdminAddUserDTO;
import com.Auth_Service.model.User;
import com.Auth_Service.service.RegistrationService; // <-- 1. IMPORT THE RIGHT SERVICE
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/user")
@CrossOrigin(origins = "*")
public class AdminUserController {

    // 2. INJECT THE REGISTRATION SERVICE
    @Autowired
    private RegistrationService registrationService;

    /**
     * Admin endpoint to create a new user.
     * This method correctly calls the RegistrationService to encrypt the password.
     */
    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody AdminAddUserDTO dto) {

        // 3. Create a new User object from the DTO
        User newUser = new User();
        newUser.setConsumerNumber(dto.getConsumerNumber());
        newUser.setFullName(dto.getFullName());
        newUser.setAddress(dto.getAddress());
        newUser.setCity(dto.getCity());
        newUser.setState(dto.getState());
        newUser.setPincode(dto.getPincode());
        newUser.setEmail(dto.getEmail());
        newUser.setMobile(dto.getMobile());
        newUser.setCustomerType(dto.getCustomerType());
        newUser.setElectricalSection(dto.getElectricalSection());
        newUser.setUserId(dto.getUserId());
        newUser.setPassword(dto.getPassword()); // Set the plain-text password
        // The connectionStatus will be "Active" by default, as we set in User.java

        // 4. Call the 'saveUser' method, which will encrypt the password
        //    before saving it to the database.
        User createdUser = registrationService.saveUser(newUser);

        return ResponseEntity.ok(createdUser);
    }

}