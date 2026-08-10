package com.nexuscart.payment_service.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "payments")
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long orderId;
    private Double amount;
    private String paymentStatus; // e.g., SUCCESS, FAILED
    private String paymentMethod; // e.g., CREDIT_CARD, CASH
}