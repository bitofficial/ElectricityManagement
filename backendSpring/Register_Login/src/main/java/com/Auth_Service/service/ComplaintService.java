//package com.Auth_Service.service;
//
//import com.Auth_Service.dto.ComplaintRequestDTO;
//import com.Auth_Service.dto.ComplaintResponseDTO;
//import java.util.List;
//
//public interface ComplaintService {
//    ComplaintResponseDTO raiseComplaint(ComplaintRequestDTO dto);
//    List<ComplaintResponseDTO> getComplaintsByConsumer(String consumerNumber);
//    ComplaintResponseDTO updateComplaintStatus(Long complaintId, String status, String notes);
//}
//
package com.Auth_Service.service;

import com.Auth_Service.dto.ComplaintRequestDTO;
import com.Auth_Service.dto.ComplaintResponseDTO;
import java.time.LocalDate;
import java.util.List;

public interface ComplaintService {

    ComplaintResponseDTO raiseComplaint(ComplaintRequestDTO dto);

    List<ComplaintResponseDTO> getComplaintsByConsumer(String consumerNumber);

    ComplaintResponseDTO updateComplaintStatus(Long complaintId, String status, String notes);

    // 🆕 NEW METHOD
    List<ComplaintResponseDTO> getComplaintHistory(
            String consumerNumber,
            String status,
            String type,
            LocalDate startDate,
            LocalDate endDate
    );
}
