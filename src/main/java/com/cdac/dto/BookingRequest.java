package com.cdac.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cdac.entites.BookingStatus;

import jakarta.validation.constraints.Future;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Getter
@Setter
@Data
@NoArgsConstructor
@AllArgsConstructor
public class BookingRequest {

    @NotNull(message = "Table ID is required")
    private Long tableId;

    @NotNull(message = "User ID is required")
    private Long userId;

    @NotNull(message = "Booking time is required")
    @Future(message = "Booking time must be in the future")
    private LocalDateTime bookingTime;

    @NotNull(message = "Status is required")
    private BookingStatus status;

    @NotNull(message = "Number of guests is required")
    private Integer numberOfGuests;

    private List<String> requestedAmenities;
    
    
}
