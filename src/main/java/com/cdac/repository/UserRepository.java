package com.cdac.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cdac.entites.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    // You can add custom query methods if needed
    // Optional<User> findByUsername(String username);
	Optional<User> findByEmail(String email);

}