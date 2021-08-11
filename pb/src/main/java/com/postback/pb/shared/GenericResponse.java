package com.postback.pb.shared;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GenericResponse {

	private String message;
	
	private int status;

}
