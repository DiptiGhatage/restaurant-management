package com.cdac.dto;

import java.math.BigDecimal;
import java.time.LocalDateTime;

import com.cdac.entites.MenuCategory;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MenuItemResponse {

    private Long id;
    private String name;
    private String description;
    private BigDecimal price;
    private Boolean available;
    private MenuCategory category;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

}
