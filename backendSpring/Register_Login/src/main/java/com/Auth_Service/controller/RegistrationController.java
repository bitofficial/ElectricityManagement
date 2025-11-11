package com.Auth_Service.controller;

import java.util.*;
import com.Auth_Service.model.User;
import com.Auth_Service.service.RegistrationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/register")
@CrossOrigin(origins = "*")
public class RegistrationController {

    @Autowired
    private RegistrationService registrationService;

    @PostMapping
    public ResponseEntity<?> registerUser(@Valid @RequestBody User user) {
        var result = registrationService.registerUser(user);
        if (result.containsKey("error")) {
            return ResponseEntity.badRequest().body(result);
//            return ResponseEntity.badRequest().body("Consumer Already exist");
        }
        return ResponseEntity.ok(result);
    }
    
    @GetMapping("/getall")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = registrationService.getAllUsers();
        return ResponseEntity.ok(users);
    }
    
    @GetMapping("/getbyid/{userId}")
    public ResponseEntity<?> getUserByUserId(@PathVariable String userId) {
        User user = registrationService.getUserById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        return ResponseEntity.ok(user);
    }
    
    @PostMapping("/save")
    public ResponseEntity<User> saveUser(@RequestBody User user)
    {
    	User savedUser = registrationService.saveUser(user);
    	return ResponseEntity.ok(savedUser);
    }
}