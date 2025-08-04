package com.cdac.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.OrderItem;
import com.cdac.entites.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    List<OrderItem> findByOrderId(Long orderId);
}