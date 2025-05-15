package com.cognizant.project.elearning.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.project.elearning.dto.LoginRequestDTO;
import com.cognizant.project.elearning.dto.RegisterRequestDTO;
import com.cognizant.project.elearning.dto.RegisterResponseDTO;
import com.cognizant.project.elearning.service.InstructorService;
import com.cognizant.project.elearning.service.StudentService;
import com.cognizant.project.elearning.service.UserService;

@RestController
@RequestMapping("api/auth")
@CrossOrigin(origins="http://localhost:3000")
public class UserController {
	@Autowired
	UserService userService;

	@Autowired
	StudentService studentService;
	@Autowired
	InstructorService instructorService;
	@PostMapping("login")
	public ResponseEntity<RegisterResponseDTO> getUserDetail(@RequestBody LoginRequestDTO loginRequestDTO){
		return new ResponseEntity<>(userService.getUserDetail(loginRequestDTO),HttpStatus.OK);
	}
	
	 @PostMapping("instructor/register")
	   public ResponseEntity<RegisterResponseDTO> addInstructor(@RequestBody RegisterRequestDTO registerRequestDTO){
		   
		   return new ResponseEntity<>(instructorService.addInstructor(registerRequestDTO),HttpStatus.OK);
	   }
	 
	 @PostMapping("/student/register")
	    public ResponseEntity<RegisterResponseDTO> addStudent(@RequestBody RegisterRequestDTO registerRequestDTO){
	 	   
	 	   return new ResponseEntity<>(studentService.addStudent(registerRequestDTO),HttpStatus.OK);
	    }
}
