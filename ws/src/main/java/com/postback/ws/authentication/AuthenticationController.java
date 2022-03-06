package com.postback.ws.authentication;

import com.fasterxml.jackson.annotation.JsonView;
import com.postback.ws.shared.CurrentUser;
import com.postback.ws.shared.Views;
import com.postback.ws.user.User;
import com.postback.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;


    @PostMapping("/api/v1/auth")
    @JsonView(Views.Base.class)
    public ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
        // Spring security den username objesini alabiliriz. Bu nedenle aşağıya gerek kalmadı
//        String base64encoded = authorization.split("Basic ")[1]; // Basic sadfasdfasd (sadfas.. tarafını aldık),
//        String decoded = new String(Base64.getDecoder().decode(base64encoded)); // user:p4ssword
//        String[] parts = decoded.split(":"); // ["user1","p4ssword"]
//        String username = userDetails.getUsername();
//        User inDB = userRepository.findByUsername(username);
        return ResponseEntity.ok(user);
    }

}
