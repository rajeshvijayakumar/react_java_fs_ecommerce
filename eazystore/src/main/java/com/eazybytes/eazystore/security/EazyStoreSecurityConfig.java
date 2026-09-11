package com.eazybytes.eazystore.security;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.security.autoconfigure.web.servlet.SecurityFilterProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

import static org.springframework.security.config.Customizer.withDefaults;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class EazyStoreSecurityConfig {

    @Bean
    @Order(SecurityFilterProperties.BASIC_AUTH_ORDER)
    SecurityFilterChain defaultSecurityFilterChain(HttpSecurity http) {

       return http.authorizeHttpRequests((requests) ->
                requests.requestMatchers(HttpMethod.GET).permitAll()  // We can tell any http request type can be permitted without auth
                        .requestMatchers("/api/v1/products/**", "/api/v1/contacts/**").permitAll()  // We can tell any number of http request path can be permitted without auth
                        .requestMatchers("/api/v1/dummy/**").authenticated()  // We can tell /api/v1/dummy/** http request path can be permitted with auth
                        .anyRequest().authenticated())
                .formLogin(withDefaults())
                .httpBasic(withDefaults())
                .build();
    }
}
