package com.cdac.dto;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BillResponse {
    private Long id;
    private Long orderId;
    private Long paymentId;
    private double totalAmount;
    private double tax;
    private double grandTotal;
    private LocalDateTime billingTime;
}