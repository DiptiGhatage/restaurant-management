package com.cdac.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import com.cdac.security.JwtAuthenticationFilter;
import com.cdac.security.UserDetailsServiceImpl;

@Configuration
@EnableWebSecurity
//This is required for @PreAuthorize to work
@EnableMethodSecurity 

public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthFilter;
    private final UserDetailsServiceImpl userDetailsService;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthFilter,
                          UserDetailsServiceImpl userDetailsService) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .csrf(csrf -> csrf.disable()) 
            .authorizeHttpRequests(auth -> auth
                
            		.requestMatchers("/api/auth/login", "/api/auth/register", "/swagger-ui/**", "/v3/api-docs/**").permitAll()
            		// ADMIN-only access
            	    .requestMatchers("/api/menu/**", "/api/booking/all").hasRole("ADMIN")

            	    // USER-only access (Booking, Order, Bill, Payment)
            	    .requestMatchers(
            	        "/api/order/**",
            	        "/api/booking/**",
            	        "/api/review/**",
            	        "/api/bill/**",
            	        "/api/payment/**"
            	    ).hasRole("USER")


                    // Menu view access for both USER and ADMIN
                    .requestMatchers("/api/menu", "/api/menu/**").hasAnyRole("USER", "ADMIN")

                    // All other requests require authentication
                    .anyRequest().authenticated()

            )
            
            .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
            
            .authenticationProvider(authenticationProvider())
            
            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public AuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}
