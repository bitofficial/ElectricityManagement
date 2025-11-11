package com.Auth_Service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import static org.springframework.boot.autoconfigure.security.servlet.PathRequest.toH2Console;

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
            // Disable CSRF
            .csrf(AbstractHttpConfigurer::disable)
            
            .authorizeHttpRequests(auth -> auth
                // Permit all requests to registration
                .requestMatchers("/api/register/**").permitAll()
                // Permit all requests to login
                .requestMatchers("/api/login").permitAll() 
                .requestMatchers("/api/dashboard/**").permitAll()
                .requestMatchers("/api/complaints/**").permitAll()
                .requestMatchers("/api/consumer/**").permitAll()
                .requestMatchers("/api/admin/**").permitAll()
                // Permit all requests to Swagger UI
                .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                
                // --- (NEW) ALLOW H2 CONSOLE ---
                // This line allows access to the H2 console
                .requestMatchers("/h2-console/**").permitAll()
                
                // All other requests must be authenticated
                .anyRequest().authenticated()
            )
            
            // --- (NEW) H2 CONSOLE FIX ---
            // The H2 console runs in a <frame>, which is blocked by default.
            // This line disables that protection FOR THE H2 CONSOLE ONLY.
            .headers(headers -> headers.frameOptions().disable());
            
        return http.build();
    }
}