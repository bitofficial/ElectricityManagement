package com.electricity.elect_billing.controller;

import com.electricity.elect_billing.dto.CustomerRegistrationRequest;
import com.electricity.elect_billing.service.CustomerService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/customer")
public class CustomerController {

    private final CustomerService customerService;

    public CustomerController(CustomerService customerService) {
        this.customerService = customerService;
    }

    @PostMapping("/register")
    public String register(@RequestBody CustomerRegistrationRequest req) {
        return customerService.registerCustomer(req);
    }
}
