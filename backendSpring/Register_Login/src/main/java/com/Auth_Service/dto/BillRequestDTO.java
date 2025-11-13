

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

	public BillRequestDTO(@NotBlank(message = "Billing month is required.") String billingMonth,
			@NotNull(message = "Units consumed is required.") @DecimalMin(value = "0.01", message = "Units consumed must be greater than 0.") BigDecimal unitsConsumed,
			@NotNull(message = "Price per unit is required.") @DecimalMin(value = "0.01", message = "Price per unit must be greater than 0.") BigDecimal pricePerUnit,
			@NotNull(message = "Due date is required.") LocalDate dueDate,
			@NotBlank(message = "Consumer number is required.") @Pattern(regexp = "^[0-9]{13}$", message = "Consumer number must be 13 digits.") String consumerNumber) {
		super();
		this.billingMonth = billingMonth;
		this.unitsConsumed = unitsConsumed;
		this.pricePerUnit = pricePerUnit;
		this.dueDate = dueDate;
		this.consumerNumber = consumerNumber;
	}

	public String getBillingMonth() {
		return billingMonth;
	}

	public void setBillingMonth(String billingMonth) {
		this.billingMonth = billingMonth;
	}

	public BigDecimal getUnitsConsumed() {
		return unitsConsumed;
	}

	public void setUnitsConsumed(BigDecimal unitsConsumed) {
		this.unitsConsumed = unitsConsumed;
	}

	public BigDecimal getPricePerUnit() {
		return pricePerUnit;
	}

	public void setPricePerUnit(BigDecimal pricePerUnit) {
		this.pricePerUnit = pricePerUnit;
	}

	public LocalDate getDueDate() {
		return dueDate;
	}

	public void setDueDate(LocalDate dueDate) {
		this.dueDate = dueDate;
	}

	public String getConsumerNumber() {
		return consumerNumber;
	}

	public void setConsumerNumber(String consumerNumber) {
		this.consumerNumber = consumerNumber;
	}
    
    
}
