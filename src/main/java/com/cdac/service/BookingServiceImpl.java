package com.cdac.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.cdac.custom_exception.ResourceNotFoundException;
import com.cdac.dto.BookingRequest;
import com.cdac.dto.BookingResponse;
import com.cdac.entites.Booking;
import com.cdac.entites.BookingStatus;
import com.cdac.entites.RestaurantTable;
import com.cdac.entites.User;
import com.cdac.repository.BookingRepository;
import com.cdac.repository.RestaurantTableRepository;
import com.cdac.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BookingServiceImpl implements BookingService {

	private final BookingRepository bookingRepository;
    private final UserRepository userRepository;
    private final RestaurantTableRepository tableRepository;
    
    @Override
    public BookingResponse createBooking(BookingRequest request) {
        try {
            User user = userRepository.findById(request.getUserId())
                    .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

            RestaurantTable table = tableRepository.findById(request.getTableId())
                    .orElseThrow(() -> new ResourceNotFoundException("Table not found with ID: " + request.getTableId()));

            Booking booking = Booking.builder()
                    .user(user)
                    .table(table)
                    .bookingTime(request.getBookingTime())
                    .status(request.getStatus())
                    .numberOfGuests(request.getNumberOfGuests())
                    .requestedAmenities(request.getRequestedAmenities())
                    .build();

            Booking saved = bookingRepository.save(booking);
            return mapToResponse(saved);

        } catch (Exception e) {
            throw new RuntimeException("Error creating booking: " + e.getMessage());
        }
    }

    @Override
    public BookingResponse getBookingById(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));
        return mapToResponse(booking);
    }

    @Override
    public List<BookingResponse> getAllBookings() {
        return bookingRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookingResponse updateBooking(Long id, BookingRequest request) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        User user = userRepository.findById(request.getUserId())
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + request.getUserId()));

        RestaurantTable table = tableRepository.findById(request.getTableId())
                .orElseThrow(() -> new ResourceNotFoundException("Table not found with ID: " + request.getTableId()));

        booking.setUser(user);
        booking.setTable(table);
        booking.setBookingTime(request.getBookingTime());
        booking.setStatus(request.getStatus());
        booking.setNumberOfGuests(request.getNumberOfGuests());
        booking.setRequestedAmenities(request.getRequestedAmenities());

        return mapToResponse(bookingRepository.save(booking));
    }

    @Override
    public void cancelBooking(Long id) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Booking not found with ID: " + id));

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);
    }

    // Mapping Method
    private BookingResponse mapToResponse(Booking booking) {
        return BookingResponse.builder()
                .id(booking.getId())
                .userId(booking.getUser().getId())
                .userName(booking.getUser().getName())
                .tableId(booking.getTable().getId())
                .tableNumber(booking.getTable().getTableNumber())
                .bookingTime(booking.getBookingTime())
                .status(booking.getStatus())
                .numberOfGuests(booking.getNumberOfGuests())
                .requestedAmenities(booking.getRequestedAmenities())
                .build();
    }
}
