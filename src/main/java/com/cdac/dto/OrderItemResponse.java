package com.cdac.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
@Builder
@Getter
@Setter
public class OrderItemResponse {
    private Long id;
    private Long menuItemId;
    private String menuItemName;
    private int quantity;
    private double price;
}
