package com.nexuscart.order_service.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI customOpenAPI() {
        return new OpenAPI()
                // Force Swagger to target the Gateway URL (port 8080)
                .servers(List.of(
                        new Server().url("http://localhost:8080").description("API Gateway")
                ))
                .info(new Info()
                        .title("Order Service API")  // Fix title here
                        .version("1.0")
                        .description("Order Management and Cart Processing Microservice Documentation"))
                .addSecurityItem(new SecurityRequirement()
                        .addList("ApiKeyScheme")
                        .addList("BearerAuthScheme"))
                .components(new Components()
                        .addSecuritySchemes("ApiKeyScheme", new SecurityScheme()
                                .name("x-api-key")
                                .type(SecurityScheme.Type.APIKEY)
                                .in(SecurityScheme.In.HEADER))
                        .addSecuritySchemes("BearerAuthScheme", new SecurityScheme()
                                .name("Authorization")
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")));
    }
}