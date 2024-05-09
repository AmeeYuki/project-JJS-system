package com.example.swp.entities;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Table(name = "customer_policy")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPolicies {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String description;

    @JsonProperty(value = "discount_rate")
    private double discountRate;

    @JsonProperty(value = "valid_from")
    private Date validFrom;

    @JsonProperty(value = "valid_to")
    private Date validTo;

    @JsonProperty(value = "approval_required")
    private boolean approvalRequired;


}
