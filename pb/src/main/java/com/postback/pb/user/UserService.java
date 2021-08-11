package com.postback.pb.user;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

	UserRepository userRepository;
	
	PasswordEncoder passwordEncoder;

	// Bir classta sadece bir tane constructur varsa ve o parametre alıyorsa
	// autowired anotasyonu kullanma zorunluluğu yok
	public UserService(UserRepository userRepository) {
		this.userRepository = userRepository;
		this.passwordEncoder = new BCryptPasswordEncoder(); 
	}

	public void save(User user) {
		String getPassword = user.getPassword();
		String encryptedPassword = this.passwordEncoder.encode(getPassword);
		user.setPassword(encryptedPassword);
		userRepository.save(user);
	}

}
