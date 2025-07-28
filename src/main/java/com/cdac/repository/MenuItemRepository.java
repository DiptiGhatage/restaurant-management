package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.MenuItem;

@Repository
public interface MenuItemRepository extends JpaRepository<MenuItem, Long> {
    // Add custom queries if needed
}
