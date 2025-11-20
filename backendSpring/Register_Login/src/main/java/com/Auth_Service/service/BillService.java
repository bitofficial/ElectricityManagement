package com.Auth_Service.service;

import com.Auth_Service.dto.BillResponseDTO;

import java.util.List;

public interface BillService {
    List<BillResponseDTO> getAllBills();
}