package com.Auth_Service.controller;

import com.Auth_Service.dto.AdminAddUserDTO;
import com.Auth_Service.model.User;
import com.Auth_Service.service.DashboardService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/users")
@CrossOrigin(origins = "*")
public class AdminUserController {

    @Autowired
    private DashboardService dashboardService;

    @PostMapping("/add")
    public ResponseEntity<User> addUser(@Valid @RequestBody AdminAddUserDTO dto) {
        User createdUser = dashboardService.addCustomer(dto);
        return ResponseEntity.ok(createdUser);
    }
    @GetMapping("/generate-consumer-number")
    public ResponseEntity<String> generateConsumerNumber() {
        String number = dashboardService.generateUniqueConsumerNumber();
        return ResponseEntity.ok(number);
    }
}