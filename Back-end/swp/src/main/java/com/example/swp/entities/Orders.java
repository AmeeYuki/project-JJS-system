package com.example.swp.entities;

import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Table(name = "orders")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Orders {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Date date;
    private double discount;
    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customers customer;
    @ManyToOne
    @JoinColumn(name = "employee_id")
    private Users employee;
}
