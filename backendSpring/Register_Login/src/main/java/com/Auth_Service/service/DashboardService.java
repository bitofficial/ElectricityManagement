//package com.Auth_Service.service;
//
//import com.Auth_Service.dto.*;
//import com.Auth_Service.model.Bill;
//import com.Auth_Service.model.Payment;
//import com.Auth_Service.model.User;
//import com.Auth_Service.repository.BillRepository;
//import com.Auth_Service.repository.PaymentRepository;
//import com.Auth_Service.repository.UserRepository;
//import jakarta.transaction.Transactional;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.stereotype.Service;
//
//import java.math.BigDecimal;
//import java.time.LocalDateTime;
//import java.util.List;
//import java.util.UUID;
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
//    @Autowired
//    private PaymentRepository paymentRepository;
//
//    /**
//     * Main dashboard data - user info + current bill summary.
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
//    /**
//     * Gets a list of all bills for a consumer.
//     * Used for the "View All Bills" page.
//     */
//    public List<BillListItemDTO> getAllBills(String consumerNumber) {
//        if (!userRepository.existsByConsumerNumber(consumerNumber)) {
//            throw new RuntimeException("User not found with consumer number: " + consumerNumber);
//        }
//
//        return billRepository.findByConsumerNumber(consumerNumber)
//                .stream()
//                .map(BillListItemDTO::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Gets the full details of a single bill.
//     * Includes ownership check.
//     */
//    public Bill getBillDetails(String consumerNumber, Long billId) {
//        return billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
//                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));
//    }
//
//    /**
//     * Gets the "Bill History" (all "Paid" bills) for a user.
//     */
//    public List<BillListItemDTO> getBillHistory(String consumerNumber) {
//        return billRepository.findByConsumerNumberAndStatus(consumerNumber, "Paid")
//                .stream()
//                .map(BillListItemDTO::fromEntity)
//                .collect(Collectors.toList());
//    }
//
//    /**
//     * Updates a bill status AND creates a new payment invoice record.
//     * This is a "Transactional" operation.
//     */
//    @Transactional
//    public Payment markBillAsPaid(String consumerNumber, Long billId, PaymentRequestDTO request) {
//
//        // Step 1: Find the bill AND verify it belongs to this user
//        Bill billToUpdate = billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
//                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));
//
//        // Step 2: Check if bill is already paid
//        if ("Paid".equals(billToUpdate.getStatus())) {
//            throw new RuntimeException("This bill is already paid.");
//        }
//
//        // Step 3: Update the bill status
//        billToUpdate.setStatus("Paid");
//        billToUpdate.setPaymentDate(LocalDateTime.now());
//        billRepository.save(billToUpdate);
//
//        // Step 4: Create the new Payment record
//        Payment payment = new Payment();
//        payment.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
//        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().toUpperCase());
//        payment.setPaymentId("PAY-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
//        payment.setReceiptNumber("RCT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
//
//        payment.setPaymentMethod(request.getPaymentMethod());
//        payment.setTransactionDate(LocalDateTime.now());
//        payment.setBillId(billToUpdate.getBillId());
//        payment.setConsumerNumber(consumerNumber);
//
//        payment.setAmount(billToUpdate.getAmount());
//        payment.setBillingMonth(billToUpdate.getBillingMonth());
//        payment.setUnitsConsumed(billToUpdate.getUnitsConsumed());
//        payment.setGeneratedAt(LocalDateTime.now());
//        payment.setStatus("Paid");
//
//        return paymentRepository.save(payment);
//    }
//
//    /**
//     * ADMIN FUNCTIONALITY:
//     * Adds a new bill for a consumer.
//     * Calculates amount = unitsConsumed × pricePerUnit.
//     */
//    public Bill addBill(BillRequestDTO dto) {
//
//        if (!userRepository.existsByConsumerNumber(dto.getConsumerNumber())) {
//            throw new RuntimeException("Invalid consumer number: " + dto.getConsumerNumber());
//        }
//
//        List<Bill> existingBills = billRepository.findByConsumerNumber(dto.getConsumerNumber());
//        boolean duplicate = existingBills.stream()
//                .anyMatch(b -> b.getBillingMonth().equalsIgnoreCase(dto.getBillingMonth()));
//        if (duplicate) {
//            throw new RuntimeException("A bill already exists for this consumer and billing month.");
//        }
//
//        BigDecimal amount = dto.getUnitsConsumed().multiply(dto.getPricePerUnit());
//
//        Bill bill = new Bill();
//        bill.setBillingMonth(dto.getBillingMonth());
//        bill.setUnitsConsumed(dto.getUnitsConsumed());
//        bill.setPricePerUnit(dto.getPricePerUnit());
//        bill.setAmount(amount);
//        bill.setDueDate(dto.getDueDate());
//        bill.setConsumerNumber(dto.getConsumerNumber());
//        bill.setPaymentDate(LocalDateTime.now());
//        bill.setStatus("Unpaid");
//
//        return billRepository.save(bill);
//    }
//
//    /**
//     * ADMIN FUNCTIONALITY:
//     * Adds a new customer to the system.
//     */
//    @Transactional
//    public User addCustomer(AdminAddUserDTO dto) {
//        if (userRepository.existsByEmail(dto.getEmail())) {
//            throw new RuntimeException("Email already exists!");
//        }
//        if (userRepository.existsByUserId(dto.getUserId())) {
//            throw new RuntimeException("User ID already exists!");
//        }
//        if (userRepository.existsByConsumerNumber(dto.getConsumerNumber())) {
//            throw new RuntimeException("Consumer Number already exists!");
//        }
//
//        User user = new User();
//        user.setConsumerNumber(dto.getConsumerNumber());
//        user.setFullName(dto.getFullName());
//        user.setAddress(dto.getAddress());
//        user.setCity(dto.getCity());
//        user.setState(dto.getState());
//        user.setPincode(dto.getPincode());
//        user.setEmail(dto.getEmail());
//        user.setMobile(dto.getMobile());
//        user.setCustomerType(dto.getCustomerType());
//        user.setElectricalSection(dto.getElectricalSection());
//        user.setUserId(dto.getUserId());
//
//        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
//            String defaultPassword = dto.getConsumerNumber() + "@default";
//            user.setPassword(defaultPassword);
////            user.setFirstLogin(true);
//        } else {
//            user.setPassword(dto.getPassword());
////            user.setFirstLogin(false);
//        }
//
//        return userRepository.save(user);
//    }
//
//    /**
//     * Fetches the Payment Invoice for a specific bill and consumer.
//     */
//    public Payment getPaymentInvoice(String consumerNumber, Long billId) {
//        return paymentRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
//                .orElseThrow(() -> new RuntimeException("Payment invoice not found for this bill"));
//    }
//
//    // --- Helper Methods ---
//    private DashboardResponseDTO mapToDashboardResponse(User user, BillSummaryDTO billSummary) {
//        DashboardResponseDTO response = new DashboardResponseDTO();
//
//        response.setFullName(user.getFullName());
//        response.setConsumerNumber(user.getConsumerNumber());
//
//        String address = user.getAddress() + ", " + user.getCity() +
//                ", " + user.getState() + " - " + user.getPincode();
//        response.setBillingAddress(address);
//
//        response.setCurrentBill(billSummary);
//        return response;
//    }
//
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

package com.Auth_Service.service;

import com.Auth_Service.dto.*;
import com.Auth_Service.exception.ApiException;
import com.Auth_Service.model.Bill;
import com.Auth_Service.model.Payment;
import com.Auth_Service.model.User;
import com.Auth_Service.repository.BillRepository;
import com.Auth_Service.repository.PaymentRepository;
import com.Auth_Service.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class DashboardService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BillRepository billRepository;

    @Autowired
    private PaymentRepository paymentRepository;

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

    /**
     * Gets the full details of a single bill.
     * Includes ownership check.
     */
    public Bill getBillDetails(String consumerNumber, Long billId) {
        return billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));
    }

    /**
     * Gets the "Bill History" (all "Paid" bills) for a user.
     */
    public List<BillListItemDTO> getBillHistory(String consumerNumber) {
        return billRepository.findByConsumerNumberAndStatus(consumerNumber, "Paid")
                .stream()
                .map(BillListItemDTO::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * Updates a bill status AND creates a new payment invoice record.
     * This is a "Transactional" operation.
     */
    @Transactional
    public Payment markBillAsPaid(String consumerNumber, Long billId, PaymentRequestDTO request) {

        // Step 1: Find the bill AND verify it belongs to this user
        Bill billToUpdate = billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
                .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user"));

        // Step 2: Check if bill is already paid
        if ("Paid".equals(billToUpdate.getStatus())) {
            throw new RuntimeException("This bill is already paid.");
        }

        // Step 3: Update the bill status
        billToUpdate.setStatus("Paid");
        billToUpdate.setPaymentDate(LocalDateTime.now());
        billRepository.save(billToUpdate);

        // Step 4: Create the new Payment record
        Payment payment = new Payment();
        payment.setInvoiceNumber("INV-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());
        payment.setTransactionId("TXN-" + UUID.randomUUID().toString().toUpperCase());
        payment.setPaymentId("PAY-" + UUID.randomUUID().toString().substring(0, 10).toUpperCase());
        payment.setReceiptNumber("RCT-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase());

        payment.setPaymentMethod(request.getPaymentMethod());
        payment.setTransactionDate(LocalDateTime.now());
        payment.setBillId(billToUpdate.getBillId());
        payment.setConsumerNumber(consumerNumber);

        payment.setAmount(billToUpdate.getAmount());
        payment.setBillingMonth(billToUpdate.getBillingMonth());
        payment.setUnitsConsumed(billToUpdate.getUnitsConsumed());
        payment.setGeneratedAt(LocalDateTime.now());
        payment.setStatus("Paid");

        return paymentRepository.save(payment);
    }

    /**
     * ADMIN FUNCTIONALITY:
     * Adds a new bill for a consumer.
     * Calculates amount = unitsConsumed × pricePerUnit.
     */
    public Bill addBill(BillRequestDTO dto) {

        if (!userRepository.existsByConsumerNumber(dto.getConsumerNumber())) {
            throw new RuntimeException("Invalid consumer number: " + dto.getConsumerNumber());
        }

        List<Bill> existingBills = billRepository.findByConsumerNumber(dto.getConsumerNumber());
        boolean duplicate = existingBills.stream()
                .anyMatch(b -> b.getBillingMonth().equalsIgnoreCase(dto.getBillingMonth()));
        if (duplicate) {
            throw new RuntimeException("A bill already exists for this consumer and billing month.");
        }

        BigDecimal amount = dto.getUnitsConsumed().multiply(dto.getPricePerUnit());

        Bill bill = new Bill();
        bill.setBillingMonth(dto.getBillingMonth());
        bill.setUnitsConsumed(dto.getUnitsConsumed());
        bill.setPricePerUnit(dto.getPricePerUnit());
        bill.setAmount(amount);
        bill.setDueDate(dto.getDueDate());
        bill.setConsumerNumber(dto.getConsumerNumber());
//        bill.setPaymentDate(LocalDateTime.now());
        bill.setStatus("Unpaid");

        return billRepository.save(bill);
    }

    /**
     * ADMIN FUNCTIONALITY:
     * Adds a new customer to the system.
     */
    @Transactional
    public User addCustomer(AdminAddUserDTO dto) {
        if (userRepository.existsByConsumerNumber(dto.getConsumerNumber())) {
            throw new ApiException("Consumer Number already exists!",409);
        }

        if (userRepository.existsByUserId(dto.getUserId())) {
            throw new ApiException("User ID already exists!",409);
        }

        if (userRepository.existsByEmail(dto.getEmail())) {
            throw new ApiException("Email already exists!",409);
        }



        User user = new User();
        user.setConsumerNumber(dto.getConsumerNumber());
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

        if (dto.getPassword() == null || dto.getPassword().isBlank()) {
            String defaultPassword = dto.getConsumerNumber() + "@default";
            user.setPassword(defaultPassword);
//            user.setFirstLogin(true);
        } else {
            user.setPassword(dto.getPassword());
//            user.setFirstLogin(false);
        }

        String consumerNumber = generateUniqueConsumerNumber();
        user.setConsumerNumber(consumerNumber);

        return userRepository.save(user);
    }

    /**
     * Fetches the Payment Invoice for a specific bill and consumer.
     */
    public Payment getPaymentInvoice(String consumerNumber, Long billId) {
        return paymentRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
                .orElseThrow(() -> new RuntimeException("Payment invoice not found for this bill"));
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

    public String generateUniqueConsumerNumber() {
        String number;
        Random random = new Random();

        do {
            number = String.format("%013d", Math.abs(random.nextLong()) % 10000000000000L);
        } while (userRepository.existsByConsumerNumber(number));

        return number;
    }
    // --- ADD THIS NEW METHOD FOR BATCH PAYMENTS ---
    /**
     * Marks multiple bills as "Paid" in a single transaction.
     * @param consumerNumber The user's consumer number
     * @param batchRequest The DTO containing the list of bill IDs
     * @return A list of the new Payment records that were created
     */
//    @Transactional // This is CRITICAL. If one bill fails, all are rolled back.
//    public List<Payment> markMultipleBillsAsPaid(String consumerNumber, PaymentBatchRequestDTO batchRequest) {
//
//        List<Payment> createdPayments = new ArrayList<>();
//
//        // Create a single DTO for the payment method
//        PaymentRequestDTO singlePaymentRequest = new PaymentRequestDTO();
//        singlePaymentRequest.setPaymentMethod(batchRequest.getPaymentMethod());
//
//        // Loop through every billId sent from the front-end
//        for (Long billId : batchRequest.getBillIds()) {
//            // Call your existing, single-payment logic for each bill
//            // This reuses your code and is very efficient
//            Payment paymentRecord = markBillAsPaid(consumerNumber, billId, singlePaymentRequest);
//            createdPayments.add(paymentRecord);
//        }
//
//        // Return the list of all payment records we just created
//        return createdPayments;
//    }
    @Transactional // This is CRITICAL. If one bill fails, all are rolled back.
    public List<Payment> markMultipleBillsAsPaid(String consumerNumber, PaymentBatchRequestDTO batchRequest) {

        List<Payment> createdPayments = new ArrayList<>();

        // Loop through every billId sent from the front-end
        for (Long billId : batchRequest.getBillIds()) {

            // Step 1: Find the bill AND verify it belongs to this user
            Bill billToUpdate = billRepository.findByBillIdAndConsumerNumber(billId, consumerNumber)
                    .orElseThrow(() -> new RuntimeException("Bill not found or does not belong to user: " + billId));

            // Step 2: Check if bill is already paid
            if ("Paid".equals(billToUpdate.getStatus())) {
                throw new RuntimeException("Bill with ID " + billId + " is already paid.");
            }

            // Step 3: Update the bill status and payment date
            billToUpdate.setStatus("Paid");
            billToUpdate.setPaymentDate(LocalDateTime.now());
            billRepository.save(billToUpdate);

            // Step 4: Create a new Payment record for this bill
            Payment payment = new Payment();

            // Set the SHARED details from the DTO
            payment.setPaymentMethod(batchRequest.getPaymentMethod());
            payment.setTransactionId(batchRequest.getTransactionId());
            payment.setInvoiceNumber(batchRequest.getInvoiceNumber());
            payment.setPaymentId(batchRequest.getPaymentId());
            payment.setReceiptNumber(batchRequest.getReceiptNumber());

            // Set other details
            payment.setTransactionDate(LocalDateTime.now());
            payment.setBillId(billToUpdate.getBillId());
            payment.setConsumerNumber(consumerNumber);
            payment.setAmount(billToUpdate.getAmount());
            payment.setBillingMonth(billToUpdate.getBillingMonth());
            payment.setUnitsConsumed(billToUpdate.getUnitsConsumed());
            payment.setStatus("Paid");
            // 'generatedAt' will be set automatically by @CreationTimestamp
            payment.setGeneratedAt(LocalDateTime.now());

            // Step 5: Save the new payment and add to our list
            createdPayments.add(paymentRepository.save(payment));
        }

        // Return the list of all payment records we just created
        return createdPayments;
    }

}