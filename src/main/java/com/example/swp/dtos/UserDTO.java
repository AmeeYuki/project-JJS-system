package com.example.swp.dtos;


import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Data
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {
    @JsonProperty("fullname")
    private String fullName;

    @JsonProperty("email")
    private String email;

    @JsonProperty("phone_number")
    private String phoneNumber;

    private String address;

    @JsonProperty("date_of_birth")
    private String dateOfBirth;

    @NotNull(message = "Role ID is required")
    @JsonProperty("role_id")
    private Long roleId;

    @JsonProperty("counter_id")
    private Long counterId;
}
