package com.Auth_Service.service;

import com.Auth_Service.dto.BillResponseDTO;
import com.Auth_Service.repository.BillRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BillServiceImpl implements BillService {

    @Autowired
    private BillRepository billRepository;

    @Override
    public List<BillResponseDTO> getAllBills() {
        return billRepository.findAll()
                .stream()
                .map(BillResponseDTO::new)
                .collect(Collectors.toList());
    }
}
