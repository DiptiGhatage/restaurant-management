package com.cdac.entites;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.CollectionTable;
import jakarta.persistence.Column;
import jakarta.persistence.ElementCollection;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class RestaurantTable extends BaseEntity {
	
	@Column(nullable = false, unique = true)
    private String tableNumber;
	
	 @Column(nullable = false)
    private int capacity;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TableStatus status;

    @OneToMany(mappedBy = "table", cascade = CascadeType.ALL)
    @JsonIgnore
    private List<Booking> bookings;
    //Add this block for amenities
    @ElementCollection(targetClass = AmenityType.class, fetch = FetchType.EAGER)
    @CollectionTable(name = "table_amenities", joinColumns = @JoinColumn(name = "restaurant_table_id", referencedColumnName = "id"))
    @Column(name = "amenity", nullable = false)
    @Enumerated(EnumType.STRING)
    private List<AmenityType> amenities;
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CategoryType category;  

    @ManyToOne
    @JoinColumn(name = "booked_by_id")
    private User bookedBy;
    
   
    @OneToMany(mappedBy = "table")
    @JsonIgnore
    private List<Order> orders;


}


