package com.example.swp.entities;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Table(name = "counters")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Counters {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String location;
}
