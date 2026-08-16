package com.nexuscart.auth_service.controller;

import com.nexuscart.auth_service.model.User;
import com.nexuscart.auth_service.repository.UserRepository;
import com.nexuscart.auth_service.security.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.tags.Tag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/auth")
//@CrossOrigin(origins = "http://localhost:5173")
@Tag(name = "Authentication Controller", description = "Endpoints for user registration and JWT token login")
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Operation(summary = "Authenticate User", description = "Validates user credentials and returns a signed JWT token.")
    @ApiResponse(responseCode = "200", description = "Successfully authenticated")
    @ApiResponse(responseCode = "401", description = "Invalid credentials or missing API Key")
    
    // Endpoint 1: Register User
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            return ResponseEntity.badRequest().body("Username already exists!");
        }
        User savedUser = userRepository.save(user);
        return ResponseEntity.ok(savedUser);
    }

    // Endpoint 2: Login User
    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginReq) {
        Optional<User> userOpt = userRepository.findByUsername(loginReq.getUsername());
        if (userOpt.isPresent() && userOpt.get().getPassword().equals(loginReq.getPassword())) {
            String token = jwtUtil.generateToken(userOpt.get().getUsername());

            return ResponseEntity.ok(Map.of(
            "token", token,
            "type", "Bearer",
            "username", userOpt.get().getUsername()
        ));
        }
        return ResponseEntity.status(401).body("Invalid username or password");
    }

    // Endpoint 3: Get All Users
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Endpoint 4: Get User Profile by Username
    @GetMapping("/users/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        return userRepository.findByUsername(username)
                .map(user -> ResponseEntity.ok((Object) Map.of(
                        "id", user.getId(),
                        "username", user.getUsername()
                )))
                .orElse(ResponseEntity.notFound().build());
    }
}