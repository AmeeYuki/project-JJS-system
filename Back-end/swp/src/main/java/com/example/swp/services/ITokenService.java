package com.example.swp.services;

import com.example.swp.entities.Token;
import com.example.swp.entities.Users;

import org.springframework.stereotype.Service;

@Service

public interface ITokenService {
    Token addToken(Users user, String token, boolean isMobileDevice);
    Token refreshToken(String refreshToken, Users user) throws Exception;

    void deleteToken(String token);
}
