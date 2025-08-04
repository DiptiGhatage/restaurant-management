package com.cdac.restcontroller;

import com.cdac.dto.AuthRequest;
import com.cdac.dto.AuthResponse;
import com.cdac.dto.RegisterRequest;
import com.cdac.entites.Role;
import com.cdac.entites.User;
import com.cdac.repository.UserRepository;
import com.cdac.security.JwtService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Endpoint
    @PostMapping("/login")
    public AuthResponse login(@RequestBody AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getEmail(), request.getPassword())
        );

        UserDetails userDetails = (UserDetails) authentication.getPrincipal();
        String token = jwtService.generateToken(userDetails);

        return new AuthResponse(token, "Login successful");
    }

    //REGISTER Endpoint
    @PostMapping("/register")
    public AuthResponse register(@RequestBody RegisterRequest request) {

        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(null, "Email already registered!");
        }

        // Save user
        User user = new User();
        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(Role.USER);
        userRepository.save(user);

        // Generate token
        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                user.getEmail(),
                user.getPassword(),
                List.of(() -> "ROLE_USER")
        );

        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, "User registered successfully");
    }
    
 // Admin Register Endpoint
    @PostMapping("/register-admin")
    public AuthResponse registerAdmin(@RequestBody RegisterRequest request) {
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            return new AuthResponse(null, "Email already registered!");
        }

        User admin = new User();
        admin.setName(request.getName());
        admin.setEmail(request.getEmail());
        admin.setPassword(passwordEncoder.encode(request.getPassword()));
        admin.setRole(Role.ADMIN); 
        userRepository.save(admin);

        UserDetails userDetails = new org.springframework.security.core.userdetails.User(
                admin.getEmail(),
                admin.getPassword(),
                List.of(() -> "ROLE_ADMIN")
        );

        String token = jwtService.generateToken(userDetails);
        return new AuthResponse(token, "Admin registered successfully");
    }
}


