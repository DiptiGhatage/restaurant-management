package com.cdac.service;

import java.util.List;

import com.cdac.dto.RestaurantTableRequest;
import com.cdac.dto.RestaurantTableResponse;
import com.cdac.entites.RestaurantTable;

public interface RestaurantTableService {
    RestaurantTableResponse createTable(RestaurantTableRequest request);
    RestaurantTableResponse getTableResponseById(Long id);
    RestaurantTable getTableById(Long id);
    List<RestaurantTableResponse> getAllTables();
    RestaurantTableResponse updateTable(Long id, RestaurantTableRequest request);
    void deleteTable(Long id);
}