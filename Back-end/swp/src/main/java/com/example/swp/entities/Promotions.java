package com.example.swp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.Valid;
import lombok.*;

@Entity
@Builder
@Table(name = "promotions")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class Promotions {
    @Id
    private String code;

    private String description;

    @JsonProperty(value = "discount_percentage")
    private double discountPercentage;

    @JsonProperty(value = "fixed_discount_amount")
    private Long fixedDiscountAmount;

    @JsonProperty(value = "start_date")
    private Long startDate;

    @JsonProperty(value = "end_date")
    private Long endDate;
}
