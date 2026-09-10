package com.eazybytes.eazystore.exception;


import com.eazybytes.eazystore.dto.ErrorResponseDto;
import jakarta.validation.ConstraintViolation;
import jakarta.validation.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponseDto> handleGlobalException(Exception exception,
                                                                  WebRequest webRequest) {
        
        ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                webRequest.getDescription(false), HttpStatus.INTERNAL_SERVER_ERROR,
                exception.getMessage(), LocalDateTime.now());

        return new ResponseEntity<>(errorResponseDto, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationException(MethodArgumentNotValidException exception,
                                                                         WebRequest webRequest) {
        Map<String, String> errors = new HashMap<String, String>();

        List<FieldError> fieldErrorList = exception.getBindingResult().getFieldErrors();

        fieldErrorList.forEach(error -> errors.put(error.getField(), error.getDefaultMessage()));

        return ResponseEntity.badRequest().body(errors);
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<Map<String, String>> handleConstraintViolationException(ConstraintViolationException exception,
                                                                         WebRequest webRequest) {
        Map<String, String> errors = new HashMap<String, String>();

        Set<ConstraintViolation<?>> constraintViolationSet = exception.getConstraintViolations();

        constraintViolationSet.forEach(error ->
                errors.put(error.getPropertyPath().toString(),
                        error.getMessage()));

        return ResponseEntity.badRequest().body(errors);
    }
}
