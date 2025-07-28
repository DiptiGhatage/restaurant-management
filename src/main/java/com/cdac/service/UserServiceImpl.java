package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.dto.UserRequest;
import com.cdac.dto.UserResponse;
import com.cdac.entites.User;
import com.cdac.repository.UserRepository;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class UserServiceImpl implements UserService {

    private final UserRepository userRepo;

    public UserServiceImpl(UserRepository userRepo) {
        this.userRepo = userRepo;
    }

    @Override
    public UserResponse createUser(UserRequest dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword()); // For real app, hash this
        user.setRole(dto.getRole());

        userRepo.save(user);

        return mapToDTO(user);
    }

    @Override
    public List<UserResponse> getAllUsers() {
        return userRepo.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getUserById(Long id) {
        return userRepo.findById(id)
                .map(this::mapToDTO)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }

    @Override
    public void deleteUser(Long id) {
        userRepo.deleteById(id);
    }

    private UserResponse mapToDTO(User user) {
        UserResponse dto = new UserResponse();
        dto.setId(user.getId());
        dto.setName(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        return dto;
    }
}
