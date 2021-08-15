package com.postback.pb.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.postback.pb.shared.CurrentUser;
import com.postback.pb.shared.Views;
import com.postback.pb.user.User;
import com.postback.pb.user.UserRepository;

@RestController
public class AuthController {

	@Autowired
	UserRepository userRepository;

	@PostMapping("/api/v1/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@CurrentUser User user) {
		return ResponseEntity.ok(user);
	}

}
