package com.Auth_Service.config;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Configuration
public class AdminPasswordGenerator {

    @Bean
    public CommandLineRunner createAdminPassword() {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String rawPassword = "admin123@"; // <-- Your password
            String hashedPassword = encoder.encode(rawPassword);

            System.out.println("----------------------------------------------------");
            System.out.println("ADMIN PASSWORD HASH GENERATOR");
            System.out.println("Your BCrypt hash is: " + hashedPassword);
            System.out.println("COPY THIS HASH!");
            System.out.println("----------------------------------------------------");
        };
    }
}