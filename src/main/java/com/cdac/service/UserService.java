package com.cdac.service;

import java.util.List;

import com.cdac.dto.UserRequest;
import com.cdac.dto.UserResponse;

public interface UserService {
    UserResponse createUser(UserRequest dto);
    List<UserResponse> getAllUsers();
    UserResponse getUserById(Long id);
    void deleteUser(Long id);
}
