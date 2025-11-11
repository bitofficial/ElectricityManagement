package com.Auth_Service.repository;

import com.Auth_Service.model.Bill;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface BillRepository extends JpaRepository<Bill, Long> {

    /**
     * Finds a list of all bills associated with a specific user,
     * searching by their 'consumerNumber' string.
     * (This is for your new "View All Bills" list)
     */
    List<Bill> findByConsumerNumber(String consumerNumber);

    /**
     * This is the key method for the dashboard.
     * It finds the SINGLE most recent bill by searching 'consumerNumber'
     * and ordering by 'dueDate' (newest first).
     */
    Optional<Bill> findTopByConsumerNumberOrderByDueDateDesc(String consumerNumber);

    // --- ADD THIS NEW METHOD ---
    /**
     * Finds a single bill by its ID AND checks that it belongs to the correct consumer.
     * This is a critical security check for the "Bill Details" endpoint.
     * @param billId The ID of the bill
     * @param consumerNumber The consumer number to check against
     * @return An Optional containing the bill if it exists and belongs to the user
     */
    Optional<Bill> findByBillIdAndConsumerNumber(Long billId, String consumerNumber);
    
}
