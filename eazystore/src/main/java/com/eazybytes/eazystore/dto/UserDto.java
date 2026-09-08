package com.eazybytes.eazystore.dto;


import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;

@Getter
@Setter
@ToString
public class UserDto {

    private Long id;
    private String name;
    private String email;
    private String mobileNumber;
}
