package com.cdac.entites;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Review extends BaseEntity {

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @ManyToOne
    @JoinColumn(name = "menu_item_id", nullable = true)
    private MenuItem menuItem;

    @ManyToOne
    @JoinColumn(name = "order_id", nullable = true)
    private Order order;

    @Column(nullable = false)
    private int rating;  // e.g. 1 to 5

    @Column(length = 500)
    private String comment;
}
