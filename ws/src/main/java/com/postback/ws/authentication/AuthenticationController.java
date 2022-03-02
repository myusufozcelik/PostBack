package com.postback.ws.authentication;

import com.fasterxml.jackson.annotation.JsonView;
import com.postback.ws.error.ApiError;
import com.postback.ws.shared.Views;
import com.postback.ws.user.User;
import com.postback.ws.user.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@RestController
public class AuthenticationController {

    @Autowired
    private UserRepository userRepository;

    PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();


    @PostMapping("/api/v1/auth")
    @JsonView(Views.Base.class)
    public ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization) {
        if (authorization == null) {
            ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        String base64encoded = authorization.split("Basic ")[1]; // Basic sadfasdfasd (sadfas.. tarafını aldık),
        String decoded = new String(Base64.getDecoder().decode(base64encoded)); // user:p4ssword
        String[] parts = decoded.split(":"); // ["user1","p4ssword"]
        String username = parts[0];
        String password = parts[1];
        User inDB = userRepository.findByUsername(username);
        if (inDB == null) {
            ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }
        String hashedPassword = inDB.getPassword();
        if (!passwordEncoder.matches(password, hashedPassword)) {
            // gelen password ile hashlı password match ederse şifre doğrudur
            ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
        }

        // username, displayName, image
//        Map<String, String> responseBody = new HashMap<>();
//        responseBody.put("username", inDB.getUsername());
//        responseBody.put("displayName", inDB.getDisplayName());
//        responseBody.put("image", inDB.getImage());

        return ResponseEntity.ok(inDB);
    }

}
