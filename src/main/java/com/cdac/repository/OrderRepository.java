package com.cdac.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.Order;

@Repository
public interface OrderRepository extends JpaRepository<Order, Long> {
    @EntityGraph(attributePaths = {
            "user", 
            "table", 
            "orderItems", 
            "orderItems.menuItem"
        })
        Optional<Order> findById(Long id);

        @EntityGraph(attributePaths = {
            "user", 
            "table", 
            "orderItems", 
            "orderItems.menuItem"
        })
        List<Order> findAll();
    }
