package com.Auth_Service.service;

import com.Auth_Service.dto.AdminLoginRequestDTO;
import com.Auth_Service.dto.BillListItemDTO;
import com.Auth_Service.dto.UserStatusUpdateDTO;
import com.Auth_Service.dto.UserUpdateDTO; // <-- ADD IMPORT
import com.Auth_Service.model.Admin;
import com.Auth_Service.model.Bill;
import com.Auth_Service.model.User; // <-- ADD IMPORT
import com.Auth_Service.repository.AdminRepository;
import com.Auth_Service.repository.BillRepository;
import com.Auth_Service.repository.UserRepository; // <-- ADD IMPORT
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional; // <-- ADD IMPORT

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class AdminService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private AdminRepository adminRepository;

    @Autowired
    private UserRepository userRepository; // <-- ADD NEW REPOSITORY


    public Map<String, Object> loginAdmin(AdminLoginRequestDTO request) {
        // --- Your existing login logic ---
        Map<String, Object> response = new HashMap<>();
        Optional<Admin> adminOptional = adminRepository.findByAdminId(request.getAdminId());
        if (adminOptional.isEmpty()) {
            response.put("error", "Invalid credentials");
            return response;
        }
        Admin admin = adminOptional.get();
//        if (!admin.getEmail().equals(request.getEmail())) {
//            response.put("error", "Invalid credentials");
//            return response;
//        }
        if (!passwordEncoder.matches(request.getPassword(), admin.getPassword())) {
            response.put("error", "Invalid credentials");
            return response;
        }
        response.put("message", "Admin login successful");
        response.put("adminId", admin.getAdminId());
        return response;
        // --- End of existing logic ---
    }


    // --- ADD THIS NEW METHOD ---
    /**
     * Admin updates a user. This logic does NOT touch the password.
     */
    @Transactional
    public User updateUser(String consumerNumber, UserUpdateDTO dto) {

        User user = userRepository.findByConsumerNumber(consumerNumber)
                .orElseThrow(() -> new RuntimeException("User not found with consumer number: " + consumerNumber));

//         Check for email conflicts
        if (!user.getEmail().equals(dto.getEmail()) && userRepository.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Error: Email address is already in use.");
        }

        // Check for userId conflicts
        if (!user.getUserId().equals(dto.getUserId()) && userRepository.existsByUserId(dto.getUserId())) {
            throw new RuntimeException("Error: User ID is already taken.");
        }

        // Update all fields from the DTO
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

        return userRepository.save(user);
    }
    public User searchByConsumerNumber(String consumerNumber)
    {
        return userRepository.findByConsumerNumber(consumerNumber).orElseThrow(()-> new RuntimeException("User not found with consumer number" + consumerNumber));
    }

    public User serachByUserId(String userId)
    {
        return userRepository.findByUserId(userId).orElseThrow(()-> new RuntimeException("UserId is not found" + userId));
    }
    @Transactional
    public User updateUserStatus(String consumerNumber, UserStatusUpdateDTO dto)
    {
        User user = userRepository.findByConsumerNumber(consumerNumber).orElseThrow(()-> new RuntimeException("Consumer number is not found " + consumerNumber));
        user.setConnection_status(dto.getNewStatus());
        return userRepository.save(user);
    }
    @Autowired
    private BillRepository billRepository;
    public List<BillListItemDTO> getAllBills() {

        // 1. Fetch all Bill entities from the database
        List<Bill> allBills = billRepository.findAll();

        // 2. Convert the list of entities into a list of "safe" DTOs
        //    We are reusing the BillListItemDTO you already created
        return allBills.stream()
                .map(BillListItemDTO::fromEntity)
                .collect(Collectors.toList());
    }
}