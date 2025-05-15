package com.cognizant.elearning.authenticationservice.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class RegisterRequestDTO {

	@NotBlank
	@Size(min=4,max=50,message="Name must be 4 to 50 characters")
	private String name;
	@NotBlank
	@Size(min=4,message="Password should be atleast 4 characters long")
	private String password;
	@NotBlank
	@Email
	private String email;
	@NotNull
	private Role role;
}
