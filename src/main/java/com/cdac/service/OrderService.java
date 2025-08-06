package com.cdac.service;

import java.util.List;

import com.cdac.dto.OrderRequest;
import com.cdac.dto.OrderResponse;

public interface OrderService {
	OrderResponse createOrder(OrderRequest request);
    OrderResponse getOrderById(Long id);
    List<OrderResponse> getAllOrders();
    void cancelOrder(Long id);
    List<OrderResponse> getOrdersByUserEmail(String email);


}
