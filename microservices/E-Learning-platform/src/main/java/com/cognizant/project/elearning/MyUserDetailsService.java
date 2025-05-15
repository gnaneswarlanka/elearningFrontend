package com.cognizant.project.elearning;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cognizant.project.elearning.entity.User;
import com.cognizant.project.elearning.repository.UserRepository;



@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	ModelMapper modelMapper;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

	User user = userRepository.findByEmail(username).get();
	
	return new UserPrincipal(user);
	}

}
