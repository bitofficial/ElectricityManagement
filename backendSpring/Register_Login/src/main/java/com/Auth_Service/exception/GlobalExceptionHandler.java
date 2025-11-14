package com.Auth_Service.exception;

import com.Auth_Service.dto.ErrorResponseDTO;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@ControllerAdvice
public class GlobalExceptionHandler {

    // handle our ApiException
    @ExceptionHandler(ApiException.class)
    public ResponseEntity<ErrorResponseDTO> handleApiException(ApiException ex) {
        ErrorResponseDTO err = new ErrorResponseDTO(ex.getMessage(), ex.getStatus());
        return ResponseEntity.status(ex.getStatus()).body(err);
    }

    // fallback for any other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDTO> handleException(Exception ex) {
        ErrorResponseDTO err = new ErrorResponseDTO("Internal server error", HttpStatus.INTERNAL_SERVER_ERROR.value());
        // optionally log ex here
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(err);
    }
}