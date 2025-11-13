package com.Auth_Service.controller;

import com.Auth_Service.dto.UserProfileUpdateDTO;
import com.Auth_Service.model.User;
import com.Auth_Service.service.UserService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * User endpoint to update their own profile details.
     * Can optionally include a new password.
     * API URL: PUT /api/users/1234567890124/profile
     */
    @PutMapping("/{consumerNumber}/profile")
    public ResponseEntity<User> updateUserProfile(
            @PathVariable String consumerNumber,
            @Valid @RequestBody UserProfileUpdateDTO request) {

        User updatedUser = userService.updateUserProfile(consumerNumber, request);
        return ResponseEntity.ok(updatedUser);
    }
}