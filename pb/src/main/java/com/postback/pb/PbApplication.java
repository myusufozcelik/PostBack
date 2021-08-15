package com.postback.pb;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.context.annotation.Bean;

import com.postback.pb.user.User;
import com.postback.pb.user.UserService;

@SpringBootApplication
public class PbApplication {

	public static void main(String[] args) {
		SpringApplication.run(PbApplication.class, args);
	}
	
	// Uygulama ayağa kalktığında burası çalışır
	// Bean ile işaretlediğimiz için Spring CommandLineRunner tipinde olduğundan burayı çalıştırır
	@Bean
	CommandLineRunner createInitialUsers(UserService userService) {
		return new CommandLineRunner() {
			
			@Override
			public void run(String... args) throws Exception {
				
				User user = new User();
				user.setUsername("myuser");
				user.setDisplayName("myDisplay");
				user.setPassword("myP4ssword");
				userService.save(user);
				
			}
		};
	}


}
