package com.electricity.elect_billing.service;

import com.electricity.elect_billing.dto.CustomerRegistrationRequest;
import com.electricity.elect_billing.entity.Customer;
import com.electricity.elect_billing.entity.User;
import com.electricity.elect_billing.repository.CustomerRepository;
import com.electricity.elect_billing.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class CustomerService {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;

    public CustomerService(UserRepository userRepository, CustomerRepository customerRepository) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
    }

    @Transactional
    public String registerCustomer(CustomerRegistrationRequest req) {

        User user = new User();
        user.setUsername(req.getUsername());
        user.setPassword(req.getPassword()); // later we will encrypt
        user.setRole("CUSTOMER");
        userRepository.save(user);

        Customer customer = new Customer();
        customer.setUser(user);
        customer.setFullName(req.getFullName());
        customer.setAddress(req.getAddress());
        customer.setEmail(req.getEmail());
        customer.setMobile(req.getMobile());
        customer.setCustomerType(req.getCustomerType());
        customer.setElectricalSection(req.getElectricalSection());

        customerRepository.save(customer);

        return "Customer Registered Successfully";
    }
}
