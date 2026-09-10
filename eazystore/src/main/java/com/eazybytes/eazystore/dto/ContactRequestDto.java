package com.eazybytes.eazystore.dto;


import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.ColumnDefault;

import java.math.BigDecimal;
import java.time.Instant;

@Getter
@Setter
public class ContactRequestDto {

    @NotBlank(message = "Name cannot be blank or empty")
    @Size(min = 5, max = 35, message = "Name must be between 5 and 35 characters")
    private String name;

    @NotBlank(message = "Email cannot be blank or empty")
    @Email(message = "Invalid email address")
    private String email;

    @NotBlank(message = "Mobile number cannot be blank or empty")
    @Pattern(regexp = "^\\d{10}$", message = "Mobile number must be 10 digits")
    private String mobileNumber;

    @NotBlank(message = "Message cannot be blank or empty")
    @Size(min = 5, max = 500, message = "Name must be between 5 and 500 characters")
    private String message;
}
