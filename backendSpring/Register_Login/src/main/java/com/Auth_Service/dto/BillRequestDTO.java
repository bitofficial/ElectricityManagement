

//************************************(FOR ADMIN USE)***************************************

package com.Auth_Service.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;

/**
 * DTO used by the Admin to create a new bill.
 * Admin provides billingMonth, unitsConsumed, pricePerUnit, dueDate, and consumerNumber.
 * The backend calculates total amount automatically.
 */
@Data
public class BillRequestDTO {

    @NotBlank(message = "Billing month is required.")
    private String billingMonth;

    @NotNull(message = "Units consumed is required.")
    @DecimalMin(value = "0.01", message = "Units consumed must be greater than 0.")
    private BigDecimal unitsConsumed;

    @NotNull(message = "Price per unit is required.")
    @DecimalMin(value = "0.01", message = "Price per unit must be greater than 0.")
    private BigDecimal pricePerUnit;

    @NotNull(message = "Due date is required.")
    private LocalDate dueDate;

    @NotBlank(message = "Consumer number is required.")
    @Pattern(regexp = "^[0-9]{13}$", message = "Consumer number must be 13 digits.")
    private String consumerNumber;
}
