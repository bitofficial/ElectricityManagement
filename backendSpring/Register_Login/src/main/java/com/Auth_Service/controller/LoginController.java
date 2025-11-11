package com.Auth_Service.controller;

import com.Auth_Service.dto.LoginRequest;
import com.Auth_Service.service.LoginService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/login")
@CrossOrigin(origins = "*") // Allow requests from any origin
public class LoginController {

    @Autowired
    private LoginService loginService;

    @PostMapping
    public ResponseEntity<?> loginUser(@Valid @RequestBody LoginRequest loginRequest) {
        Map<String, Object> result = loginService.login(loginRequest);

        if (result.containsKey("error")) {
            // Send a 401 Unauthorized status for login failures
            return ResponseEntity.status(401).body(result);
        }

        // Send 200 OK for successful login
        return ResponseEntity.ok(result);
    }
}