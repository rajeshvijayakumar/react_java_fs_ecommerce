package com.eazybytes.eazystore.controller;


import com.eazybytes.eazystore.dto.UserDto;
import jakarta.validation.constraints.Size;
import org.springframework.http.HttpHeaders;
import org.springframework.http.RequestEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("api/v1/dummy")
@Validated
public class DummyController {

    @PostMapping("/create-user")
    public String createUser(@RequestBody UserDto userDto) {
        System.out.println(userDto);

        return "User created successfully.";
    }

    @GetMapping("/search")
    public String searchUser(@Size(min = 5, max = 30) @RequestParam(required = false, defaultValue = "Rajesh Vijayakumar", name = "name") String userName) {

        return "Searching for User: "+userName;
    }

   /* @GetMapping("/multiple-search")
    public String multipleSearch(@RequestParam String firstName, @RequestParam String lastName) {
        return "Searching for User: "+firstName+" "+lastName;
    }*/

    @GetMapping("/multiple-search")
    public String multipleSearch(@RequestParam Map<String, String> params) {
        return "Searching for User: "+params.get("firstName")+" "+params.get("lastName");
    }


    /*@GetMapping("/user/{userId}")
    public String getUser(@PathVariable String userId) {
        return "Searching for User: "+userId;
    }*/

    @GetMapping({"/user/{userId}/posts/{postId}", "/user/{userId}"})
    public String getUser(@PathVariable(name = "userId") String id,
                          @PathVariable(required = false) String postId) {
        return "Searching for User : "+id+ " and post : "+postId;
    }

    @GetMapping({"/user/map/{userId}/posts/{postId}", "/user/map/{userId}"})
    public String getUserUsingMap(@PathVariable Map<String,String> pathVariables) {
        return "Searching for user : " + pathVariables.get("userId") + " and post : "
                + pathVariables.get("postId");
    }

    @GetMapping("/headers")
    public String readHeaders(@RequestHeader HttpHeaders headers) {
        List<String> location= headers.get("User-Location");
        return "Received headers with value : " + headers.toString();
    }

    //Use request entity, in case you want to read headers and body, but don't use it for reading query params and path variables.
    @PostMapping("/request-entity")
    public String createUserWithEntity(RequestEntity<UserDto> requestEntity) {
        HttpHeaders header = requestEntity.getHeaders();
        UserDto userDto = requestEntity.getBody();

        return "User created successfully";
    }
}
