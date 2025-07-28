package com.cdac.dto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

import com.cdac.entites.OrderStatus;
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderResponse {
    private Long id;
    private String orderNumber;
    private LocalDateTime orderTime;
    private OrderStatus status;
    private double totalAmount;
    private Long userId;
    private String userName;
    private Long tableId;
    private String tableNumber;
    private List<OrderItemResponse> items;
}