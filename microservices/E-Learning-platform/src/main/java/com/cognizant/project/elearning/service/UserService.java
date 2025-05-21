package com.cognizant.project.elearning.service;

import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.project.elearning.dto.LoginRequestDTO;
import com.cognizant.project.elearning.dto.RegisterResponseDTO;
import com.cognizant.project.elearning.entity.User;
import com.cognizant.project.elearning.exception.AllException.UserNotExist;
import com.cognizant.project.elearning.repository.UserRepository;

@Service
public class UserService {
	@Autowired
UserRepository userRepo;
	@Autowired
	ModelMapper modelMapper;
	public RegisterResponseDTO getUserDetail(LoginRequestDTO loginRequestDTO) {

		User user=userRepo.findByEmail(loginRequestDTO.getEmail()).orElseThrow(()->new UserNotExist("user details wrong"));

		RegisterResponseDTO registerResponseDTO=modelMapper.map(user,RegisterResponseDTO.class);
		return registerResponseDTO;
	}

}
