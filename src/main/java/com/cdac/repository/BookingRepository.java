package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    // Add custom queries if needed
}