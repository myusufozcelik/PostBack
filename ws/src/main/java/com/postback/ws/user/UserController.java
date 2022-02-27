package com.postback.ws.user;

import com.postback.ws.shared.GenericResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/api/v1/users")
    public GenericResponse createUser(@RequestBody User user) {
        userService.save(user);
        GenericResponse response = new GenericResponse("User Created");
        return response;
    }

}
