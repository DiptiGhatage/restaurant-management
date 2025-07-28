package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.Review;

@Repository
public interface ReviewRepository extends JpaRepository<Review, Long> {
    // Add custom queries if needed
}