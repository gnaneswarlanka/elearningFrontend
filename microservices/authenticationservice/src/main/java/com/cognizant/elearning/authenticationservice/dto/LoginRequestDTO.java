package com.cognizant.elearning.authenticationservice.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class LoginRequestDTO {

	@NotBlank
	@Email
	private	String email;
	
	private	String password;
	
}
