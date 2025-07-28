package com.cdac.dto;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor

public class OrderRequest {
    @NotNull
    private Long userId;

    @NotNull
    private Long tableId;

    @NotEmpty
    private List<OrderItemRequest> items;
}
