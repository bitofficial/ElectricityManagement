package com.Auth_Service.dto;

public class ErrorResponseDTO {
    private String error;
    private int status;       // HTTP status code (optional)
    private long timestamp;   // epoch millis (optional)

    public ErrorResponseDTO() {}

    public ErrorResponseDTO(String error, int status) {
        this.error = error;
        this.status = status;
        this.timestamp = System.currentTimeMillis();
    }

    // getters & setters
    public String getError() { return error; }
    public void setError(String error) { this.error = error; }

    public int getStatus() { return status; }
    public void setStatus(int status) { this.status = status; }

    public long getTimestamp() { return timestamp; }
    public void setTimestamp(long timestamp) { this.timestamp = timestamp; }
}