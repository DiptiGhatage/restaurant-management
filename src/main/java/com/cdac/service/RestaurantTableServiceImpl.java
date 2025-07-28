package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.custom_exception.ResourceNotFoundException;
import com.cdac.dto.RestaurantTableRequest;
import com.cdac.dto.RestaurantTableResponse;
import com.cdac.entites.AmenityType;
import com.cdac.entites.RestaurantTable;
import com.cdac.entites.User;
import com.cdac.repository.RestaurantTableRepository;
import com.cdac.repository.UserRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Transactional
@Service
@RequiredArgsConstructor
public class RestaurantTableServiceImpl implements RestaurantTableService {

    private final RestaurantTableRepository tableRepo;
    private final UserRepository userRepo;

    @Override
    public RestaurantTableResponse createTable(RestaurantTableRequest request) {
        RestaurantTable table = new RestaurantTable();
        table.setTableNumber(request.getTableNumber());
        table.setCapacity(request.getCapacity());
        table.setStatus(request.getStatus());
        List<AmenityType> amenities = request.getAmenities().stream()
        	    .map(String::toUpperCase)
        	    .map(AmenityType::valueOf)
        	    .collect(Collectors.toList());

        	table.setAmenities(amenities);

        table.setCategory(request.getCategory());

        if (request.getBookedById() != null) {
            User user = userRepo.findById(request.getBookedById())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getBookedById()));
            table.setBookedBy(user);
        }

        RestaurantTable saved = tableRepo.save(table);
        return mapToResponse(saved);
    }

    @Override
    public RestaurantTableResponse getTableResponseById(Long id) {
        RestaurantTable table = getTableById(id);
        return mapToResponse(table);
    }

    @Override
    public RestaurantTable getTableById(Long id) {
        return tableRepo.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with id: " + id));
    }

    @Override
    public List<RestaurantTableResponse> getAllTables() {
        return tableRepo.findAll().stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public RestaurantTableResponse updateTable(Long id, RestaurantTableRequest request) {
        RestaurantTable table = getTableById(id);
        table.setTableNumber(request.getTableNumber());
        table.setCapacity(request.getCapacity());
        table.setStatus(request.getStatus());
        List<AmenityType> amenities = request.getAmenities().stream()
        	    .map(String::toUpperCase) // ensure case matches enum
        	    .map(AmenityType::valueOf)
        	    .collect(Collectors.toList());
            table.setAmenities(amenities);
 

        table.setCategory(request.getCategory());

        if (request.getBookedById() != null) {
            User user = userRepo.findById(request.getBookedById())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getBookedById()));
            table.setBookedBy(user);
        } else {
            table.setBookedBy(null);
        }

        RestaurantTable updated = tableRepo.save(table);
        return mapToResponse(updated);
    }

    @Override
    public void deleteTable(Long id) {
        RestaurantTable table = getTableById(id);
        tableRepo.delete(table);
    }

    //Convert entity to response
    private RestaurantTableResponse mapToResponse(RestaurantTable table) {
        return RestaurantTableResponse.builder()
                .id(table.getId())
                .tableNumber(table.getTableNumber())
                .capacity(table.getCapacity())
                .status(table.getStatus())
                .amenities(table.getAmenities())
                .category(table.getCategory())
                .bookedByUserId(table.getBookedBy() != null ? table.getBookedBy().getId() : null)
                .build();
    }
}
