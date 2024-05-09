package com.example.swp.repositories;


import com.example.swp.entities.Users;
import com.example.swp.entities.Token;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TokenRepository extends JpaRepository<Token, Long> {
    List<Token> findByUser(Users user);
    Token findByToken(String token);
    Token findByRefreshToken(String token);
    List<Token> findByUserId(Long userId);
}

