package com.Auth_Service.controller;

import com.Auth_Service.dto.VerificationRequestDTO;
import com.Auth_Service.service.VerificationService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class VerificationController {

    @Autowired
    private VerificationService verificationService;

    /**
     * Verifies a user based on their Consumer Number and Password.
     * API URL: POST /api/verification/login
     */
    @PostMapping("/verification")
    public ResponseEntity<?> loginWithConsumerNumber(
            @Valid @RequestBody VerificationRequestDTO request) {
        
        Map<String, Object> response = verificationService.verifyUser(request);

        if (response.containsKey("error")) {
            // Send 401 Unauthorized for login failures
            return ResponseEntity.status(401).body(response);
        }

        // Send 200 OK for successful login
        return ResponseEntity.ok(response);
    }
}