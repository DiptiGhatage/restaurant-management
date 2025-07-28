package com.cdac.entites;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Data 
@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Booking extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "table_id", nullable = false)
    private RestaurantTable table;

    @Enumerated(EnumType.STRING)
    private BookingStatus status;
    
    @Column(nullable = false)
    private LocalDateTime bookingTime;
    
    @Column(nullable = false)
    private Integer numberOfGuests; 
    
    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "booking_requested_amenities", joinColumns = @JoinColumn(name = "booking_id"))
    @Column(name = "amenity")
    private List<String> requestedAmenities;
        
}


