package com.cdac.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.cdac.entites.Bill;

public interface BillRepository extends JpaRepository<Bill, Long> 
{
	}
