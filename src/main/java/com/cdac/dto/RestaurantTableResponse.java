package com.cdac.dto;

import java.util.List;

import com.cdac.entites.AmenityType;
import com.cdac.entites.CategoryType;
import com.cdac.entites.TableStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantTableResponse {
    private Long id;
    private String tableNumber;
    private int capacity;
    private TableStatus status;
    private List<AmenityType> amenities;
    private CategoryType category;
    private Long bookedByUserId; // Only ID to avoid deep nesting
}
