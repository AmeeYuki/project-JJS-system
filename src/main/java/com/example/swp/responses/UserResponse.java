package com.example.swp.responses;

import com.example.swp.entities.Users;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserResponse extends BaseResponse{
    private Long id;
    @JsonProperty("fullname")
    private String fullName;
    @JsonProperty("email")
    private String email;
    @JsonProperty("phone_number")
    private String phoneNumber;
    private String address;
    @JsonProperty("date_of_birth")
    private String dateOfBirth;
    @JsonProperty("active")
    private boolean active;
    @JsonProperty("role_id")
    private String role;
    @JsonProperty("counter_id")
    private String counter;

    public static UserResponse fromUser(Users user) {
        UserResponse userResponse = UserResponse.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .phoneNumber(user.getPhoneNumber())
                .address(user.getAddress())
                .dateOfBirth(user.getDateOfBirth())
                .active(user.isActive())
                .role(user.getRole().getName())
                .counter(user.getCounter().getLocation())
                .build();
        userResponse.setCreatedDate(user.getCreatedDate());
        userResponse.setModifiedDate(user.getModifiedDate());
        return userResponse;
    }
}
