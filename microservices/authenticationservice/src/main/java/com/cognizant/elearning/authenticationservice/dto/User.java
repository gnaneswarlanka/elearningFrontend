package com.cognizant.elearning.authenticationservice.dto;

import lombok.Data;

@Data
public class User {

	private int userId;
	private String name;
	private String password;
	private String email;
	private Role role;
}
