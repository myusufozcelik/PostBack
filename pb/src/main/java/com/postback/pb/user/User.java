package com.postback.pb.user;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import lombok.Data;

@Data // toString getter setter constructor hepsini oluşturur
@Entity
public class User {

	@Id
	@GeneratedValue
	private long id;

	@NotNull
	@Size(min = 4, max = 255)
	@UniqueUsername
	private String username;

	@NotNull
	@Size(min = 4, max = 255)
	private String displayName;

	@NotNull
	@Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$")
	@Size(min = 8, max = 255)
	private String password;

}
