package com.cognizant.project.elearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.project.elearning.dto.CourseRequestDTO;
import com.cognizant.project.elearning.dto.CourseResponseDTO;
import com.cognizant.project.elearning.service.CourseService;



@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins="http://localhost:3000")
public class CourseController {

    @Autowired
    CourseService courseService;

    //for retrieving all the courses - anyone can see it even if they are unauthorized
    @GetMapping("/")
    public ResponseEntity<List<CourseResponseDTO>> viewAllCourse() {

        return new ResponseEntity<>(courseService.viewAllCourse(), HttpStatus.OK);
       
    }
    
    
//    //for retrieving all the courses of a specific instructor
    @GetMapping("/course/{courseId}")
    public ResponseEntity<CourseResponseDTO> viewAllCourse(@PathVariable int courseId) {

        ResponseEntity<CourseResponseDTO> response = new ResponseEntity<>(courseService.viewSelectedCourse(courseId), HttpStatus.OK);
        return response;
    }

}
