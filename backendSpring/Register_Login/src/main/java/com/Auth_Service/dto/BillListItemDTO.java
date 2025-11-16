//package com.Auth_Service.dto;
//
//import com.Auth_Service.model.Bill;
//import java.math.BigDecimal;
//import java.time.LocalDate;
//
///**
// * A simple DTO to represent a bill in a list.
// * This is a summary, not the full detail.
// */
//public class BillListItemDTO {
//
//    private Long billId;
//    private String billingMonth;
//    private BigDecimal amount;
//    private LocalDate dueDate;
//    private String status;
//
//    public BillListItemDTO() {
//    }
//
//    public BillListItemDTO(Long billId, String billingMonth, BigDecimal amount, LocalDate dueDate, String status) {
//        this.billId = billId;
//        this.billingMonth = billingMonth;
//        this.amount = amount;
//        this.dueDate = dueDate;
//        this.status = status;
//    }
//
//    /**
//     * Helper method to convert a full Bill entity into this summary DTO
//     */
//    public static BillListItemDTO fromEntity(Bill bill) {
//        return new BillListItemDTO(
//            bill.getBillId(),
//            bill.getBillingMonth(),
//            bill.getAmount(),
//            bill.getDueDate(),
//            bill.getStatus()
//        );
//    }
//
//    // --- Getters and Setters ---
//
//    public Long getBillId() {
//        return billId;
//    }
//
//    public void setBillId(Long billId) {
//        this.billId = billId;
//    }
//
//    public String getBillingMonth() {
//        return billingMonth;
//    }
//
//    public void setBillingMonth(String billingMonth) {
//        this.billingMonth = billingMonth;
//    }
//
//    public BigDecimal getAmount() {
//        return amount;
//    }
//
//    public void setAmount(BigDecimal amount) {
//        this.amount = amount;
//    }
//
//    public LocalDate getDueDate() {
//        return dueDate;
//    }
//
//    public void setDueDate(LocalDate dueDate) {
//        this.dueDate = dueDate;
//    }
//
//    public String getStatus() {
//        return status;
//    }
//
//    public void setStatus(String status) {
//        this.status = status;
//    }
//}

package com.Auth_Service.dto;

import com.Auth_Service.model.Bill;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

/**
 * A DTO to represent a bill summary for list views.
 * Includes amount, units consumed, and price per unit for transparency.
 */
public class BillListItemDTO {

    private Long billId;
    private String billingMonth;
    private BigDecimal unitsConsumed;
    private BigDecimal pricePerUnit;
    private BigDecimal amount;
    private LocalDate dueDate;
    private String status;
    private LocalDateTime generated_at;

    public BillListItemDTO() {
    }

    public BillListItemDTO(Long billId, String billingMonth, BigDecimal unitsConsumed,
                           BigDecimal pricePerUnit, BigDecimal amount, LocalDate dueDate, String status,LocalDateTime generated_at) {
        this.billId = billId;
        this.billingMonth = billingMonth;
        this.unitsConsumed = unitsConsumed;
        this.pricePerUnit = pricePerUnit;
        this.amount = amount;
        this.dueDate = dueDate;
        this.status = status;
        this.generated_at = generated_at;
    }

    /**
     * Helper method to convert a full Bill entity into this summary DTO
     */
    public static BillListItemDTO fromEntity(Bill bill) {
        return new BillListItemDTO(
                bill.getBillId(),
                bill.getBillingMonth(),
                bill.getUnitsConsumed(),
                bill.getPricePerUnit(),
                bill.getAmount(),
                bill.getDueDate(),
                bill.getStatus(), 
                bill.getGeneratedAt()
        );
    }

    // --- Getters and Setters ---

    public Long getBillId() {
        return billId;
    }

    public void setBillId(Long billId) {
        this.billId = billId;
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

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

	public LocalDateTime getGenerated_at() {
		return generated_at;
	}

	public void setGenerated_at(LocalDateTime generated_at) {
		this.generated_at = generated_at;
	}
    
}
