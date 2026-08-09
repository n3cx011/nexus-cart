package com.nexuscart.order_service.model;

import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Table(name = "orders")
@Data
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String username;
    private Double totalPrice;
    private String status; // e.g., PENDING, COMPLETED

    @ElementCollection
    private List<Long> productIds;
}