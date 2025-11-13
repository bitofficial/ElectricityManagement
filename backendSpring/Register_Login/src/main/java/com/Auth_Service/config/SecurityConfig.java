package com.Auth_Service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class SecurityConfig {

    @Bean
    public PasswordEncoder passwordEncoder()
    {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // Customer login/register/dashboard
                        .requestMatchers("/api/register/**").permitAll()
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/dashboard/**").permitAll()

                        // Admin login/edit
                        .requestMatchers("/api/admin/**").permitAll()

                        // --- ADD THIS NEW LINE ---
                        .requestMatchers("/api/users/**").permitAll() // <-- ALLOWS USER PROFILE EDIT

                        // Swagger and H2
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()
                        .requestMatchers("/api/complaints/**").permitAll()

                        .anyRequest().authenticated()
                )

                .headers(headers -> headers.frameOptions().disable());

        return http.build();
    }
}