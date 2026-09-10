package com.eazybytes.eazystore.controller;


import com.eazybytes.eazystore.dto.ProductDto;
import com.eazybytes.eazystore.service.IProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@RequiredArgsConstructor
public class ProductController {

    private final IProductService iProductService;

    @GetMapping
    public ResponseEntity<List<ProductDto>> getProducts() {

        System.out.println("Hello Product controller");
        List<ProductDto> productList = iProductService.getProducts();

//            return ResponseEntity.status(HttpStatus.OK)
//                    .body(productList);
        return ResponseEntity.ok().body(productList);
    }
}
