package com.postback.pb.user;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.Data;

@Data // toString getter setter constructor hepsini oluşturur
@Entity
public class User {

	@Id
	@GeneratedValue
	private long id;

	private String username;

	private String displayName;

	private String password;

}
