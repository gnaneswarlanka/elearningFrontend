package com.cognizant.elearning.authenticationservice;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.cognizant.elearning.authenticationservice.dto.LoginRequestDTO;
import com.cognizant.elearning.authenticationservice.dto.RegisterRequestDTO;
import com.cognizant.elearning.authenticationservice.dto.RegisterResponseDTO;



@FeignClient("ELEARNING")
public interface ElearningClient {
	@PostMapping("/api/auth/instructor/register")
	   public ResponseEntity<RegisterResponseDTO> addInstructor(@RequestBody RegisterRequestDTO registerRequestDTO);
		   
	 @PostMapping("/api/auth/student/register")
	    public ResponseEntity<RegisterResponseDTO> addStudent(@RequestBody RegisterRequestDTO registerRequestDTO);
		
	 @PostMapping("api/auth/login")
		public ResponseEntity<RegisterResponseDTO> getUserDetail(@RequestBody LoginRequestDTO loginRequestDTO);
}
