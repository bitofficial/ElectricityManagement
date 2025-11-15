package com.Auth_Service.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer; // <-- ADD THIS IMPORT
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration; // <-- ADD THIS IMPORT
import org.springframework.web.cors.CorsConfigurationSource; // <-- ADD THIS IMPORT
import org.springframework.web.cors.UrlBasedCorsConfigurationSource; // <-- ADD THIS IMPORT
import java.util.List; // <-- ADD THIS IMPORT

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
                // --- THIS IS THE FIX ---
                // Enable CORS at the security filter level
                .cors(Customizer.withDefaults())

                // Disable CSRF (which you already did)
                .csrf(AbstractHttpConfigurer::disable)

                .authorizeHttpRequests(auth -> auth
                        // Permit all your application endpoints
                        .requestMatchers("/api/register/**").permitAll()
                        .requestMatchers("/api/login").permitAll()
                        .requestMatchers("/api/dashboard/**").permitAll()
                        .requestMatchers("/api/admin/**").permitAll()
                        .requestMatchers("/api/users/**").permitAll()
                        .requestMatchers("/api/complaints/**").permitAll()
                        .requestMatchers("/api/user/**").permitAll()
                        .requestMatchers("/api/sme/**").permitAll()
                        .requestMatchers("/api/admin/sme/getAll").permitAll()
                        


                        // Permit Swagger and H2
                        .requestMatchers("/swagger-ui.html", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
                        .requestMatchers("/h2-console/**").permitAll()

                        .anyRequest().authenticated()
                )

                .headers(headers -> headers.frameOptions().disable());

        return http.build();
    }

    // --- ADD THIS NEW BEAN ---
    /**
     * This bean configures CORS to allow all origins, methods, and headers.
     * This is the "default" that .cors(Customizer.withDefaults()) will use.
     * It's more powerful than just @CrossOrigin.
     */
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("*"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}