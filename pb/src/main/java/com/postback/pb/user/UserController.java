package com.postback.pb.user;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.postback.pb.error.ApiError;
import com.postback.pb.shared.GenericResponse;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@PostMapping("/api/v1/users")
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<?> createUser(@RequestBody User user) {
		ApiError error = new ApiError(400, "Validation Error", "/api/v1/users");
		Map<String, String> validationErrors = new HashMap<String, String>();
		
		String username = user.getUsername();
		String displayName = user.getDisplayName();
		
		if (username == null || username.isEmpty()) {
			validationErrors.put("username", "Username cannot be null");
		}
		
		if (displayName == null || displayName.isEmpty()) {
			validationErrors.put("displayName", "Display Name Cannot be null");
		}
		
		if (validationErrors.size() > 0 ) {
			error.setValidationErrors(validationErrors);
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
		}
		
		userService.save(user);
		return ResponseEntity.ok(new GenericResponse("User Created", HttpStatus.CREATED.value()));
	}
	


}
