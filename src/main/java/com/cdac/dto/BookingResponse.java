package com.cdac.dto;

import java.time.LocalDateTime;
import java.util.List;

import com.cdac.entites.BookingStatus;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Setter
@Getter
@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor

public class BookingResponse {

    private Long id;
    private Long tableId;
    private String tableNumber;
    private Long userId;
    private String userName;
    private LocalDateTime bookingTime;
    private BookingStatus status;
    private Integer numberOfGuests;
    private List<String> requestedAmenities;
}
