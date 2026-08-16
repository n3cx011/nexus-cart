package com.nexuscart.auth_service.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.nexuscart.auth_service.model.User;
import org.springframework.stereotype.Repository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByUsername(String username);
}