package com.project.back_end.services;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import jakarta.annotation.PostConstruct;
import java.security.Key;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    private Key key;

    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(secret.getBytes());
    }

    public boolean validateToken(String token, String role) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            String tokenRole = claims.get("role", String.class);
            return role.equals(tokenRole);
        } catch (Exception e) {
            return false;
        }
    }

    public String generateToken(Long userId, String role) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("role", role)
                .signWith(key)
                .compact();
    }
}