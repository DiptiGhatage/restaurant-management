package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, Long> {
    // Add custom queries if needed
}