package com.cognizant.elearning.authenticationservice.security;



import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cognizant.elearning.authenticationservice.ElearningClient;
import com.cognizant.elearning.authenticationservice.dto.LoginRequestDTO;
import com.cognizant.elearning.authenticationservice.dto.RegisterResponseDTO;
import com.cognizant.elearning.authenticationservice.dto.User;


@Service
public class MyUserDetailsService implements UserDetailsService {
	@Autowired
	ElearningClient userRepository;
	@Autowired
	ModelMapper modelMapper;
	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
LoginRequestDTO l=new LoginRequestDTO();
l.setEmail(username);
	RegisterResponseDTO reg = userRepository.getUserDetail(l).getBody();
	
	User user=modelMapper.map(reg,User.class);
	
	
	return new UserPrincipal(user);
	}

}
