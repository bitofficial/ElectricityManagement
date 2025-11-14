package com.Auth_Service.repository;


import com.Auth_Service.model.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {
    List<Complaint> findByUserConsumerNumber(String consumerNumber);
    List<Complaint> findAll();
    List<Complaint> findByAssignedSmeId(String smeId);

    // --- FOR THE ADMIN SEARCH ---
    List<Complaint> findByUser_ConsumerNumber(String consumerNumber);
    List<Complaint> findByComplaintType(String complaintType);
}
