package com.example.swp.repositories;

import com.example.swp.entities.Users;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;

public interface UserRepository extends JpaRepository<Users,Long> {
    boolean existsByEmail(String email);

    @Query("SELECT u FROM Users u WHERE " +
            "(:keyword IS NULL OR :keyword = '' OR u.fullName ILIKE %:keyword%)")
    Page<Users> searchUsers(@Param("keyword") String keyword, Pageable pageable);

    Optional<Users> findByEmail(String userAccount);

}
