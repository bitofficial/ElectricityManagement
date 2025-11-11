//package com.Auth_Service.service;
//
//import com.Auth_Service.dto.BillListItemDTO;
//import com.Auth_Service.dto.BillSummaryDTO;
//import com.Auth_Service.dto.DashboardResponseDTO;
//import com.Auth_Service.model.Bill;
//import com.Auth_Service.model.User;
//import com.Auth_Service.repository.BillRepository;
//import com.Auth_Service.repository.UserRepository;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.util.List;
//import java.util.stream.Collectors;
//
//@Service
//public class DashboardService {
//
//    @Autowired
//    private UserRepository userRepository;
//
//    @Autowired
//    private BillRepository billRepository;
//
//    /**
//     * This is your existing method for the main dashboard page.
//     */
//    public DashboardResponseDTO getDashboardInfo(String consumerNumber) {
//
//        User user = userRepository.findByConsumerNumber(consumerNumber)
//                .orElseThrow(() -> new RuntimeException("User not found with consumer number: " + consumerNumber));
//
//        BillSummaryDTO billSummary = billRepository
//                .findTopByConsumerNumberOrderByDueDateDesc(consumerNumber)
//                .map(this::mapEntityToBillSummaryDTO)
//                .orElse(null);
//
//        return mapToDashboardResponse(user, billSummary);
//    }
//
//
//    // --- (NEW METHOD 1) ---
//    /**
//     * Gets a list of all bill summaries for a user.
//     * This is for your "View All Bills" page.
//     * @param consumerNumber The user's consumer number
//     * @return A list of BillListItemDTOs
//     */
//    public List<BillListItemDTO> getAllBills(String consumerNumber) {
//        // First, check if the user exists.
//        if (!userRepository.existsByConsumerNumber(consumerNumber)) {
//            throw new RuntimeException("User not found with consumer number: " + consumerNumber);
//        }
//
//        // Find all bills and convert them to the simple DTO
//        return billRepository.findByConsumerNumber(consumerNumber)
//                .stream()
//                .map(BillListItemDTO::fromEntity) // Uses the static helper method
//                .collect(Collectors.toList());
//    }
//
//
//    // --- (NEW METHOD 2) ---
//    /**
//     * Gets the full details for a single, specific bill.
//     * Includes a security check.
//     * @param consumerNumber The user's consumer number
//     * @param billId The ID of the bill they want to see
//     * @return The full Bill entity
//     */
//    public Bill getBillDetails(String consumerNumber, Long billId) {
//        // Use the new repository method to find the bill
//        // This ensures the bill exists AND belongs to the consumerNumber
//        return billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
//                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));
//    }
//
//
//    // --- Helper Methods (unchanged) ---
//
//    private DashboardResponseDTO mapToDashboardResponse(User user, BillSummaryDTO billSummary) {
//        DashboardResponseDTO response = new DashboardResponseDTO();
//
//        response.setFullName(user.getFullName());
//        response.setConsumerNumber(user.getConsumerNumber());
//
//        String address = user.getAddress() + ", " + user.getCity() +
//                         ", " + user.getState() + " - " + user.getPincode();
//        response.setBillingAddress(address);
//
//        response.setCurrentBill(billSummary);
//
//        return response;
//    }
//
//    private BillSummaryDTO mapEntityToBillSummaryDTO(Bill bill) {
//        return new BillSummaryDTO(
//                bill.getBillingMonth(),
//                bill.getDueDate(),
//                bill.getAmount(),
//                bill.getStatus()
//        );
//    }
//}
//

package com.Auth_Service.service;

import com.Auth_Service.dto.BillListItemDTO;
import com.Auth_Service.dto.BillRequestDTO;
import com.Auth_Service.dto.BillSummaryDTO;
import com.Auth_Service.dto.DashboardResponseDTO;
import com.Auth_Service.model.Bill;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.BillRepository;
import com.Auth_Service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BillRepository billRepository;

    /**
     * Main dashboard data - user info + current bill summary.
     */
    public DashboardResponseDTO getDashboardInfo(String consumerNumber) {

        User user = userRepository.findByConsumerNumber(consumerNumber)
                .orElseThrow(() -> new RuntimeException("User not found with consumer number: " + consumerNumber));

        BillSummaryDTO billSummary = billRepository
                .findTopByConsumerNumberOrderByDueDateDesc(consumerNumber)
                .map(this::mapEntityToBillSummaryDTO)
                .orElse(null);

        return mapToDashboardResponse(user, billSummary);
    }

    // --- (NEW METHOD 1) ---
    /**
     * Gets a list of all bills for a consumer.
     * Used for the "View All Bills" page.
     */
    public List<BillListItemDTO> getAllBills(String consumerNumber) {
        if (!userRepository.existsByConsumerNumber(consumerNumber)) {
            throw new RuntimeException("User not found with consumer number: " + consumerNumber);
        }

        return billRepository.findByConsumerNumber(consumerNumber)
                .stream()
                .map(BillListItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    // --- (NEW METHOD 2) ---
    /**
     * Gets the full details of a single bill.
     * Includes ownership check.
     */
    public Bill getBillDetails(String consumerNumber, Long billId) {
        return billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));
    }

    // --- (NEW METHOD 3: Admin Feature) ---
    /**
     * ADMIN FUNCTIONALITY:
     * Adds a new bill for a consumer.
     * Calculates amount = unitsConsumed × pricePerUnit.
     */
    public Bill addBill(BillRequestDTO dto) {

        // 1. Validate consumer
        if (!userRepository.existsByConsumerNumber(dto.getConsumerNumber())) {
            throw new RuntimeException("Invalid consumer number: " + dto.getConsumerNumber());
        }

        // 2. Prevent duplicate bill for same consumer + month
        List<Bill> existingBills = billRepository.findByConsumerNumber(dto.getConsumerNumber());
        boolean duplicate = existingBills.stream()
                .anyMatch(b -> b.getBillingMonth().equalsIgnoreCase(dto.getBillingMonth()));
        if (duplicate) {
            throw new RuntimeException("A bill already exists for this consumer and billing month.");
        }

        // 3. Calculate amount
        BigDecimal amount = dto.getUnitsConsumed().multiply(dto.getPricePerUnit());

        // 4. Create Bill entity
        Bill bill = new Bill();
        bill.setBillingMonth(dto.getBillingMonth());
        bill.setUnitsConsumed(dto.getUnitsConsumed());
        bill.setPricePerUnit(dto.getPricePerUnit());
        bill.setAmount(amount);
        bill.setDueDate(dto.getDueDate());
        bill.setConsumerNumber(dto.getConsumerNumber());
        bill.setStatus("Unpaid");

        // 5. Save and return
        return billRepository.save(bill);
    }

    // --- Helper Methods ---
    private DashboardResponseDTO mapToDashboardResponse(User user, BillSummaryDTO billSummary) {
        DashboardResponseDTO response = new DashboardResponseDTO();

        response.setFullName(user.getFullName());
        response.setConsumerNumber(user.getConsumerNumber());

        String address = user.getAddress() + ", " + user.getCity() +
                ", " + user.getState() + " - " + user.getPincode();
        response.setBillingAddress(address);

        response.setCurrentBill(billSummary);
        return response;
    }

    private BillSummaryDTO mapEntityToBillSummaryDTO(Bill bill) {
        return new BillSummaryDTO(
                bill.getBillingMonth(),
                bill.getDueDate(),
                bill.getAmount(),
                bill.getStatus()
        );
    }
}
