package com.postback.pb.auth;

import java.net.IDN;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.annotation.JsonView;
import com.postback.pb.error.ApiError;
import com.postback.pb.shared.Views;
import com.postback.pb.user.User;
import com.postback.pb.user.UserRepository;

@RestController
public class AuthController {
	
	@Autowired
	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

	
	@PostMapping("/api/v1/auth")
	@JsonView(Views.Base.class)
	ResponseEntity<?> handleAuthentication(@RequestHeader(name = "Authorization", required = false) String authorization) {
		if (authorization == null) {
			ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
		String base64encoded = authorization.split("Basic ")[1]; // dönen değer Basic dasdaszxcv123 şeklinde olduğu için 
		String decoded = new String(Base64.getDecoder().decode(base64encoded)); // user1:P4ssword şeklinde bir değer var
		String[] parts = decoded.split(":"); // ["user1", "P4ssword"]
		String username = parts[0];
		String password = parts[1];
		User inDB = userRepository.findByUsername(username);
		if (inDB == null) {
			ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
		String hashedPassword = inDB.getPassword();
		if (!passwordEncoder.matches(password, hashedPassword)) {
			ApiError error = new ApiError(401, "Unauthorized request", "/api/v1/auth");
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(error);
		}
		
		Map<String, String> responseBody = new HashMap<String, String>();
		responseBody.put("username", inDB.getUsername());
		responseBody.put("displayName", inDB.getDisplayName());
		responseBody.put("image", inDB.getImage());
		return ResponseEntity.ok(responseBody);
	}
}
