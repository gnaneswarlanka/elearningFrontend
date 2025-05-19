package com.cognizant.project.elearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.project.elearning.dto.AssessmentRequestDTO;
import com.cognizant.project.elearning.dto.AssessmentResponseDTO;
import com.cognizant.project.elearning.dto.CourseRequestDTO;
import com.cognizant.project.elearning.dto.CourseResponseDTO;
import com.cognizant.project.elearning.dto.InstructorResponseDTO;
import com.cognizant.project.elearning.dto.RegisterRequestDTO;
import com.cognizant.project.elearning.dto.RegisterResponseDTO;
import com.cognizant.project.elearning.dto.SubmissionResponseDTO;
import com.cognizant.project.elearning.dto.UpdateCourseDTO;
import com.cognizant.project.elearning.service.AssessmentService;
import com.cognizant.project.elearning.service.CourseService;
import com.cognizant.project.elearning.service.InstructorService;
import com.cognizant.project.elearning.service.SubmissionService;

import jakarta.validation.Valid;


@RestController
@RequestMapping("/api/instructors")
@CrossOrigin(origins="http://localhost:3000")
public class InstructorController {


    @Autowired
    InstructorService instructorService;

    @Autowired
    CourseService courseService;

    @Autowired
    AssessmentService assessmentService;

    @Autowired
    SubmissionService submissionService;

    // for adding new course
    
    @PreAuthorize("#instructorId==authentication.principal.id")
    @PostMapping("/{instructorId}/courses")
    public ResponseEntity<CourseResponseDTO> addCourse(@PathVariable int instructorId, @Valid @RequestBody CourseRequestDTO courseDTO) {
        ResponseEntity<CourseResponseDTO> response = new ResponseEntity<>(courseService.addCourse(courseDTO, instructorId), HttpStatus.CREATED);
        return response;
    }
    
    //for creating assessment to the existing course
    
    @PreAuthorize("#instructorId==authentication.principal.id")
    @PostMapping("/{instructorId}/courses/{courseId}/assessments")
    public ResponseEntity<AssessmentResponseDTO> createAssessment(@Valid @RequestBody AssessmentRequestDTO assessmentRequestDTO,@PathVariable("instructorId") int instructorId, @PathVariable("courseId") int courseId){
        System.out.println("this is came in the controller");
    	
        ResponseEntity<AssessmentResponseDTO> response = new ResponseEntity<>(assessmentService.createAssessment(assessmentRequestDTO, courseId), HttpStatus.CREATED);
        return response;
    }

    //for updating the details of existing course
   
    @PreAuthorize("#instructorId==authentication.principal.id")
    @PutMapping("{instructorId}/courses/{courseId}")
    public ResponseEntity<CourseResponseDTO> updateCourse(@PathVariable int instructorId, @PathVariable int courseId, @Valid @RequestBody UpdateCourseDTO courseRequestDTO) {
        ResponseEntity<CourseResponseDTO> response = new ResponseEntity<>(courseService.updateCourse(instructorId, courseId, courseRequestDTO), HttpStatus.ACCEPTED);
        return response;
    }

    //for deleting the instructor profile
  
    @PreAuthorize("#instructorId==authentication.principal.id")
    @DeleteMapping("/{instructorId}")
    public ResponseEntity<String> removeInstructor(@PathVariable int instructorId) {
        ResponseEntity<String> response = new ResponseEntity<>(instructorService.removeInstructor(instructorId), HttpStatus.OK);
        return response;
    }

    //for deleting the course
   
    @PreAuthorize("#instructorId==authentication.principal.id")
        @DeleteMapping("/{instructorId}/courses/{courseId}")
    public ResponseEntity<String> removeCourse(@PathVariable int courseId, @PathVariable int instructorId) {
        ResponseEntity<String> response = new ResponseEntity<>(courseService.removeCourse(courseId, instructorId), HttpStatus.OK);
        return response;
    }

    //for retrieving the instructor details
   
    @PreAuthorize("#instructorId==authentication.principal.id")
    @GetMapping("/{instructorId}")
   
    public ResponseEntity<InstructorResponseDTO> viewInstructor(@PathVariable int instructorId) {
        ResponseEntity<InstructorResponseDTO> response = new ResponseEntity<>(instructorService.viewInstructor(instructorId), HttpStatus.OK);
        return response;
    }
    
    @PreAuthorize("#instructorId==authentication.principal.id")
    @GetMapping("/{instructorId}/course")
    public ResponseEntity<List<CourseResponseDTO>> viewAllCourse(@PathVariable int instructorId) {

        return new ResponseEntity<>(courseService.viewAllCourse(instructorId), HttpStatus.OK);
         }
    @PreAuthorize("#instructorId==authentication.principal.id")
    
//    @PutMapping("{instructorId}/student/{studentId}/assessment/{assessmentId}/grade/{grade}")
    @PutMapping("/{instructorId}/submission/{submissionId}/grade/{grade}")
    public void gradeAssessment(@PathVariable int instructorId ,@PathVariable int submissionId,@PathVariable int grade){
    	assessmentService.gradeAssessment(submissionId,grade);
    }
    @PreAuthorize("#instructorId==authentication.principal.id")
    @GetMapping("/{instructorId}/course/{courseId}")
    public ResponseEntity<List<AssessmentResponseDTO>> viewAllAssessments(@PathVariable int instructorId,@PathVariable int courseId){ 
    	return new ResponseEntity<>(assessmentService.viewAllAssessments(courseId),HttpStatus.OK);
    
    }
    @PreAuthorize("#instructorId==authentication.principal.id")
    @GetMapping("/{instructorId}/assessment/{assessmentId}")
    public ResponseEntity<List<SubmissionResponseDTO>> viewAllSubmissions(@PathVariable int instructorId,@PathVariable int assessmentId){ 
    	return new ResponseEntity<>(assessmentService.viewAllSubmissions(assessmentId),HttpStatus.OK);
    
    }
    @PreAuthorize("#instructorId==authentication.principal.id")
    @GetMapping("/{instructorId}/assessment/{assessmentId}/submission/{submissionId}")
    public ResponseEntity<SubmissionResponseDTO> viewAnswer(@PathVariable int instructorId,@PathVariable int assessmentId,@PathVariable int submissionId){ 
    	return new ResponseEntity<>(submissionService.viewAnswer(assessmentId,submissionId),HttpStatus.OK);
    
    }
    
    
   
}
