package com.postback.pb.user;

import java.util.HashMap;
import java.util.Map;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
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
	public GenericResponse createUser(@Valid @RequestBody User user) {
		userService.save(user);
		return new GenericResponse("User Created", HttpStatus.CREATED.value());
	}

// MethodArgumentNotValidException atılırsa aşağıdaki metodu çalıştır
	@ExceptionHandler(MethodArgumentNotValidException.class)
	@ResponseStatus(HttpStatus.BAD_REQUEST)
	public ApiError handleValidationException(MethodArgumentNotValidException exception) {
		ApiError error = new ApiError(400, "Validation Error", "/api/v1/users");
		Map<String, String> validationErrors = new HashMap<String, String>();
		for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
			validationErrors.put(fieldError.getField(), fieldError.getDefaultMessage());
		}
		error.setValidationErrors(validationErrors);
		return error;
	}

}
