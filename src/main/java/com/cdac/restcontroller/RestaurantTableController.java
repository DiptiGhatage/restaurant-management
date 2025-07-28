package com.cdac.restcontroller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cdac.dto.RestaurantTableRequest;
import com.cdac.dto.RestaurantTableResponse;
import com.cdac.service.RestaurantTableService;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/tables")
@RequiredArgsConstructor
public class RestaurantTableController {

    private final RestaurantTableService tableService;

    // Create Table
    @PostMapping
    public ResponseEntity<RestaurantTableResponse> createTable(@Valid @RequestBody RestaurantTableRequest request) {
        RestaurantTableResponse response = tableService.createTable(request);
        return ResponseEntity.ok(response);
    }

    // Get all tables
    @GetMapping
    public ResponseEntity<List<RestaurantTableResponse>> getAllTables() {
        List<RestaurantTableResponse> list = tableService.getAllTables();
        return ResponseEntity.ok(list);
    }

    // Get table by ID
    @GetMapping("/{id}")
    public ResponseEntity<RestaurantTableResponse> getTableById(@PathVariable Long id) {
    	RestaurantTableResponse response = tableService.getTableResponseById(id);
        return ResponseEntity.ok(response);
    }

    // Update table
    @PutMapping("/{id}")
    public ResponseEntity<RestaurantTableResponse> updateTable(
            @PathVariable Long id,
            @Valid @RequestBody RestaurantTableRequest request) {
        RestaurantTableResponse updated = tableService.updateTable(id, request);
        return ResponseEntity.ok(updated);
    }

    // Delete table
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTable(@PathVariable Long id) {
        tableService.deleteTable(id);
        return ResponseEntity.noContent().build();
    }
}
