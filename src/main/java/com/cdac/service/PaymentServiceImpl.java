package com.cdac.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cdac.dto.PaymentRequest;
import com.cdac.dto.PaymentResponse;
import com.cdac.entites.Order;
import com.cdac.entites.OrderItem;
import com.cdac.entites.Payment;
import com.cdac.entites.PaymentStatus;
import com.cdac.repository.OrderItemRepository;
import com.cdac.repository.OrderRepository;
import com.cdac.repository.PaymentRepository;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private OrderItemRepository orderItemRepository;

    @Override
    public PaymentResponse makePayment(PaymentRequest request) {
        Order order = orderRepository.findById(request.getOrderId())
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + request.getOrderId()));

        List<OrderItem> items = orderItemRepository.findByOrderId(order.getId());
        double total = items.stream()
                .mapToDouble(i -> i.getPrice() * i.getQuantity())
                .sum();

        Payment payment = Payment.builder()
                .order(order)
                .amount(total)
                .mode(request.getMode())
                .status(PaymentStatus.COMPLETED)
                .paymentTime(LocalDateTime.now())
                .build();

        Payment saved = paymentRepository.save(payment);

        return PaymentResponse.builder()
                .id(saved.getId())
                .orderId(saved.getOrder().getId())
                .amount(saved.getAmount())
                .mode(saved.getMode())
                .status(saved.getStatus())
                .paymentTime(saved.getPaymentTime())
                .build();
    }
}
