package com.postback.pb.user;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.postback.pb.shared.GenericResponse;

@RestController
public class UserController {

	private static final Logger log = LoggerFactory.getLogger(UserController.class);

	@Autowired
	UserService userService;

	@PostMapping("/api/v1/users")
	@ResponseStatus(HttpStatus.CREATED)
	public GenericResponse createUser(@RequestBody User user) {
		log.info(user.toString());
		userService.save(user);
		int status = HttpStatus.CREATED.value();
		return new GenericResponse("User Created", status);

	}

}
