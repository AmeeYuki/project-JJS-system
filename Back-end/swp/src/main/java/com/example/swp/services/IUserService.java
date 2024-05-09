package com.example.swp.services;

import com.example.swp.dtos.UserDTO;
import com.example.swp.entities.Users;
import com.example.swp.exceptions.DataNotFoundException;
import com.example.swp.responses.UserResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

public interface IUserService {
    Users createUser(UserDTO userDTO) throws Exception;

    Page<UserResponse> getAllUsers(String keyword, PageRequest pageRequest);

    Users deleteSyllabus(long userId) throws DataNotFoundException;

    String login(String userAccount, String password,Long roleId) throws Exception;

    Boolean create(String name, String email, String password);
    String generateRandomPassword(int minLen, int maxLen);

    Users getUserDetailsFromToken(String token) throws Exception;
}
