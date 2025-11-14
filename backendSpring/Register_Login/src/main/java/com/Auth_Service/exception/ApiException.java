package com.Auth_Service.exception;

public class ApiException extends RuntimeException {
    private final int status;

    public ApiException(String message, int status) {
        super(message);
        this.status = status;
    }

    public ApiException(String message) {
        this(message, 400); // default Bad Request
    }

    public int getStatus() { return status; }
}
