package com.Auth_Service.controller;

import com.Auth_Service.dto.*;
import com.Auth_Service.model.User; // <-- ADD IMPORT
import com.Auth_Service.service.AdminService;
import com.Auth_Service.service.BillService;
import com.Auth_Service.service.SMEService;

import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin(origins = "*")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @Autowired
    private SMEService smeService;

    // --- (This is your existing login endpoint) ---
    @PostMapping("/login")
    public ResponseEntity<?> loginAdmin(@Valid @RequestBody AdminLoginRequestDTO loginRequest) {
        // --- Your existing login logic ---
        Map<String, Object> response = adminService.loginAdmin(loginRequest);
        if (response.containsKey("error")) {
            return ResponseEntity.status(401).body(response);
        }
        return ResponseEntity.ok(response);
        // --- End of existing logic ---
    }


    // --- ADD THIS NEW ENDPOINT ---
    /**
     * Admin endpoint to update a user's details.
     * API URL: PUT /api/admin/users/1234567890124
     */
    @PutMapping("/users/{consumerNumber}")
    public ResponseEntity<User> updateUser(
            @PathVariable String consumerNumber,
            @Valid @RequestBody UserUpdateDTO request) {

        User updatedUser = adminService.updateUser(consumerNumber, request);
        return ResponseEntity.ok(updatedUser);
    }
    @GetMapping("/users/by-customer/{consumerNumber}")
    public ResponseEntity<User> serachByConsumerNumber(@PathVariable String consumerNumber)
    {
        User user = adminService.searchByConsumerNumber(consumerNumber);
        return ResponseEntity.ok(user);
    }
    @GetMapping("/users/by-userid/{userid}")
    public ResponseEntity<User> serachbyUserID(@PathVariable String userid)
    {
        User user = adminService.serachByUserId(userid);
        return ResponseEntity.ok(user);
    }
    @PatchMapping("/users/{consumerNumber}/status")
    public ResponseEntity<User> updateStatus(@PathVariable String consumerNumber, @Valid @RequestBody UserStatusUpdateDTO request)
    {
        User update = adminService.updateUserStatus(consumerNumber,request);
        return ResponseEntity.ok(update);
    }
    @GetMapping("/sme/all")
    public ResponseEntity<List<SMEDetailsDTO>> getAllSME()
    {
    	List<SMEDetailsDTO> smelist = smeService.getAllSMEs();
    	return ResponseEntity.ok(smelist);
    }

    @Autowired
    private BillService billService;

    // ✔ ADMIN — VIEW ALL BILLS
    @GetMapping("/bills")
    public ResponseEntity<List<BillResponseDTO>> getAllBills() {
        List<BillResponseDTO> bills = billService.getAllBills();
        return ResponseEntity.ok(bills);
    }
}