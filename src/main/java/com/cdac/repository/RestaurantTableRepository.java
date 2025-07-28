package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.RestaurantTable;

@Repository
public interface RestaurantTableRepository extends JpaRepository<RestaurantTable, Long> {
    // Add custom query methods if required
	boolean existsByTableNumber(String tableNumber);
}