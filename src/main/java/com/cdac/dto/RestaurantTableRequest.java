package com.cdac.dto;

import java.util.List;

import com.cdac.entites.CategoryType;
import com.cdac.entites.TableStatus;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class RestaurantTableRequest {

    @NotBlank(message = "Table number is required")
    private String tableNumber;

    @NotNull(message = "Capacity is required")
    @Min(value = 1, message = "Capacity must be at least 1")
    private Integer capacity;

    @NotNull(message = "Status is required")
    private TableStatus status;

    @NotNull(message = "Category is required")
    private CategoryType category;

    @NotEmpty(message = "Amenities must be provided")
    private List<String> amenities;

    private Long bookedById; // Optional, nullable if table is not booked
}
