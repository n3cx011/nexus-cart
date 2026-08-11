package com.nexuscart.order_service.controller;

import com.nexuscart.order_service.model.CartItem;
import com.nexuscart.order_service.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    @Autowired
    private CartRepository cartRepository;

    @GetMapping("/{userId}")
    public List<CartItem> getCart(@PathVariable String userId) {
        return cartRepository.findByUserId(userId);
    }

    @PostMapping("/{userId}/add")
    public CartItem addToCart(@PathVariable String userId, @RequestBody CartItem item) {
        return cartRepository.findByUserIdAndProductId(userId, item.getProductId())
                .map(existing -> {
                    existing.setQuantity(existing.getQuantity() + item.getQuantity());
                    return cartRepository.save(existing);
                })
                .orElseGet(() -> {
                    item.setUserId(userId);
                    return cartRepository.save(item);
                });
    }

    @DeleteMapping("/{userId}/clear")
    @Transactional
    public void clearCart(@PathVariable String userId) {
        cartRepository.deleteByUserId(userId);
    }
}