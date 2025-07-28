package com.cdac.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.custom_exception.ResourceNotFoundException;
import com.cdac.dto.OrderItemRequest;
import com.cdac.dto.OrderItemResponse;
import com.cdac.dto.OrderRequest;
import com.cdac.dto.OrderResponse;
import com.cdac.entites.MenuItem;
import com.cdac.entites.Order;
import com.cdac.entites.OrderItem;
import com.cdac.entites.OrderStatus;
import com.cdac.entites.RestaurantTable;
import com.cdac.entites.User;
import com.cdac.repository.MenuItemRepository;
import com.cdac.repository.OrderItemRepository;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.RestaurantTableRepository;
import com.cdac.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
@Transactional
@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final UserRepository userRepository;
    private final RestaurantTableRepository tableRepository;
    private final MenuItemRepository menuItemRepository;
    private final OrderItemRepository orderItemRepository;

    @Override
    public OrderResponse createOrder(OrderRequest request) {
        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with id " + request.getUserId()));

        RestaurantTable table = tableRepository.findById(request.getTableId())
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id " + request.getTableId()));

        List<OrderItem> orderItems = new ArrayList<>();
        double totalAmount = 0;

        for (OrderItemRequest itemRequest : request.getItems()) {
            MenuItem menuItem = menuItemRepository.findById(itemRequest.getMenuItemId())
                    .orElseThrow(() -> new ResourceNotFoundException("Menu item not found with id " + itemRequest.getMenuItemId()));

            OrderItem item = OrderItem.builder()
                    .menuItem(menuItem)
                    .quantity(itemRequest.getQuantity())
                    .price(menuItem.getPrice() * itemRequest.getQuantity())
                    .build();

            orderItems.add(item);
            totalAmount += item.getPrice();
        }

        Order order = Order.builder()
                .orderNumber(UUID.randomUUID().toString())
                .orderTime(LocalDateTime.now())
                .status(OrderStatus.PENDING)
                .user(user)
                .table(table)
                .totalAmount(totalAmount)
                .build();

        order = orderRepository.save(order);

        for (OrderItem item : orderItems) {
            item.setOrder(order);
        }

        orderItemRepository.saveAll(orderItems);
        order.setOrderItems(orderItems);

        return mapToResponse(order);
    }

    @Override
    public OrderResponse getOrderById(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
        return mapToResponse(order);
    }

    @Override
    public List<OrderResponse> getAllOrders() {
        return orderRepository.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public void cancelOrder(Long id) {
        Order order = orderRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Order not found with id " + id));
        order.setStatus(OrderStatus.CANCELLED);
        orderRepository.save(order);
    }

  
    private OrderResponse mapToResponse(Order order) {
        List<OrderItemResponse> itemResponses = order.getOrderItems() != null
                ? order.getOrderItems().stream()
                    .map((OrderItem item) -> OrderItemResponse.builder()
                            .id(item.getId())
                            .menuItemId(item.getMenuItem().getId())
                            .menuItemName(item.getMenuItem().getName())
                            .quantity(item.getQuantity())
                            .price(item.getPrice())
                            .build())
                    .collect(Collectors.toList())
                : new ArrayList<>();

        return OrderResponse.builder()
                .id(order.getId())
                .orderNumber(order.getOrderNumber())
                .orderTime(order.getOrderTime())
                .status(order.getStatus())
                .totalAmount(order.getTotalAmount())
                .userId(order.getUser().getId())
                .userName(order.getUser().getName())
                .tableId(order.getTable().getId())
                .tableNumber(order.getTable().getTableNumber())
                .items(itemResponses)
                .build();
    }
}