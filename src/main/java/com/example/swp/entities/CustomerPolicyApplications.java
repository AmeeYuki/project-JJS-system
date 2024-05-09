package com.example.swp.entities;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.*;

import java.util.Date;

@Entity
@Builder
@Table(name = "customer_policy_application")
@Setter
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerPolicyApplications {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    @JsonProperty(value = "approved_by")
    private String approvedBy;

    @JsonProperty(value = "approval_date")
    private Date approvalDate;

    @JsonProperty(value = "publishing_status")
    private String publishingStatus;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    private Customers customer;

    @ManyToOne
    @JoinColumn(name = "policy_id")
    private CustomerPolicies customerPolicy;
}
