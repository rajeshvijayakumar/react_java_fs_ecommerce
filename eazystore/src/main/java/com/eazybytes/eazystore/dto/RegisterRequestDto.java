package com.eazybytes.eazystore.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDto {

    @NotBlank(message = "Name is required")
    @Size(min = 5, max = 35, message = "Name must be between 5 and 35 characters")
    private String name;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile number is required")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be exactly 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Password is required")
    @Size(min = 5, max = 20, message = "Password must be between 8 and 20 characters")
    private String password;
}
