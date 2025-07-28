package com.cdac.service;

import java.util.List;

import com.cdac.dto.BookingRequest;
import com.cdac.dto.BookingResponse;

public interface BookingService {

    BookingResponse createBooking(BookingRequest request);

    BookingResponse getBookingById(Long id);

    List<BookingResponse> getAllBookings();

    BookingResponse updateBooking(Long id, BookingRequest request);

    void cancelBooking(Long id);
}
