package com.cognizant.project.elearning.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.project.elearning.dto.AssessmentResponseDTO;
import com.cognizant.project.elearning.dto.CourseResponseDTO;
import com.cognizant.project.elearning.dto.EnrollmentResponseDTO;
import com.cognizant.project.elearning.dto.RegisterRequestDTO;
import com.cognizant.project.elearning.dto.RegisterResponseDTO;
import com.cognizant.project.elearning.dto.StudentResponseDTO;
import com.cognizant.project.elearning.dto.SubmissionRequestDTO;
import com.cognizant.project.elearning.dto.SubmissionResponseDTO;
import com.cognizant.project.elearning.dto.UpdateStudentDetailsDTO;
import com.cognizant.project.elearning.service.AssessmentService;
import com.cognizant.project.elearning.service.CourseService;
import com.cognizant.project.elearning.service.EnrollmentService;
import com.cognizant.project.elearning.service.StudentService;
import com.cognizant.project.elearning.service.SubmissionService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/students")
@CrossOrigin(origins="http://localhost:3000")
public class StudentController {


    @Autowired
    StudentService studentService;

    @Autowired
    EnrollmentService enrollmentService;

    @Autowired
    SubmissionService submissionService;

    @Autowired
    CourseService courseService;


    @Autowired
    AssessmentService assessmentService;
    //for enrolling into a course
    @PreAuthorize("#studentId==authentication.principal.id")
    @PostMapping("/{studentId}/enroll/{courseId}")
    public ResponseEntity<EnrollmentResponseDTO> enroll(@PathVariable int studentId, @PathVariable int courseId) {
        ResponseEntity<EnrollmentResponseDTO> response = new ResponseEntity<>(enrollmentService.enroll(studentId, courseId), HttpStatus.OK);

        return response;
    }

    //for submitting assessment of the existing course
    @PreAuthorize("#studentId==authentication.principal.id")
    @PostMapping("/{studentId}/submitAssessments/{assessmentId}")
    public ResponseEntity<SubmissionResponseDTO> submitAssessment(@PathVariable int studentId, @PathVariable int assessmentId,@RequestBody SubmissionRequestDTO submissionDTO) {

        ResponseEntity<SubmissionResponseDTO> response = new ResponseEntity<>(submissionService.submitAssessment(studentId, assessmentId, submissionDTO), HttpStatus.OK);

        return response;
    }

    //for retrieving student details
    
    @GetMapping("/{studentId}")
    public ResponseEntity<StudentResponseDTO> viewStudent(@PathVariable int studentId) {

        ResponseEntity<StudentResponseDTO> response = new ResponseEntity<>(studentService.viewStudent(studentId), HttpStatus.OK);

        return response;
    }

    //for retrieving courses registered by a particular student
    @PreAuthorize("#studentId==authentication.principal.id")
    @GetMapping("/{studentId}/enrolled-courses")
    public ResponseEntity<List<CourseResponseDTO>> viewEnrolled(@PathVariable int studentId) {
        ResponseEntity<List<CourseResponseDTO>> response = new ResponseEntity<>(enrollmentService.viewEnrolled(studentId), HttpStatus.OK);
        return response;

    }
    
    //for updating the student profile
    @PreAuthorize("#studentId==authentication.principal.id")
    @PutMapping("/{studentId}/updateDetails")
    public ResponseEntity<StudentResponseDTO> updateStudentDetails(@PathVariable int studentId,
            @RequestBody @Valid UpdateStudentDetailsDTO request) {
        StudentResponseDTO updatedStudent = studentService.updateStudentDetails(studentId, request.getCollege(),
                request.getAge());
        return ResponseEntity.ok(updatedStudent);
    }
    @PreAuthorize("#studentId==authentication.principal.id")
    @GetMapping("/{studentId}/course/{courseId}")
    public ResponseEntity<List<AssessmentResponseDTO>> viewAllAssessments(@PathVariable int studentId,@PathVariable int courseId){ 
    	return new ResponseEntity<>(assessmentService.viewAllAssessments(courseId),HttpStatus.OK);
    
    }
    @PreAuthorize("#studentId==authentication.principal.id")
    @GetMapping("/{studentId}/submission/{submissionId}")
    public ResponseEntity<SubmissionResponseDTO> viewScore(@PathVariable int studentId,@PathVariable int submissionId){
    	return new ResponseEntity<>(submissionService.viewScore(submissionId),HttpStatus.OK);
    }
    @PreAuthorize("#studentId==authentication.principal.id")
    @GetMapping("/{studentId}/assessment/{assessmentId}")
    public ResponseEntity<List<SubmissionResponseDTO>> viewStudentSubmissions(@PathVariable int studentId,@PathVariable int assessmentId){
    	return new ResponseEntity<>(submissionService.viewStudentSubmissions(assessmentId,studentId),HttpStatus.OK);
    
    }
   
}
