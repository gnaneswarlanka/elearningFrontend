package com.cognizant.project.elearning.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.project.elearning.dto.AssessmentRequestDTO;
import com.cognizant.project.elearning.dto.AssessmentResponseDTO;
import com.cognizant.project.elearning.dto.SubmissionResponseDTO;
import com.cognizant.project.elearning.entity.Assessment;
import com.cognizant.project.elearning.entity.Course;
import com.cognizant.project.elearning.entity.Enrollment;
import com.cognizant.project.elearning.entity.Submission;
import com.cognizant.project.elearning.exception.AllException.InvalidCourse;
import com.cognizant.project.elearning.repository.AssessmentRepository;
import com.cognizant.project.elearning.repository.CourseRepository;
import com.cognizant.project.elearning.repository.EnrollmentRepository;
import com.cognizant.project.elearning.repository.SubmissionRepository;

@Service
public class AssessmentService {
	
	@Autowired
	private CourseRepository courseRepository;
	
	@Autowired 
	ModelMapper modelMapper;
	
	@Autowired
	private AssessmentRepository assessmentRepository;
	
	
	@Autowired
	private SubmissionRepository submissionRepository;
	
	@Autowired
	private EnrollmentRepository enrollRepo;
	
	public AssessmentResponseDTO createAssessment(AssessmentRequestDTO assessmentRequestDTO,int courseId) {
		Assessment assessment=modelMapper.map(assessmentRequestDTO, Assessment.class);
		Course course=courseRepository.findById(courseId).orElseThrow(
						()->new InvalidCourse("Course with Id "+courseId+" not found.")
																	  );
		assessment.setCourseId(course);
		assessment=assessmentRepository.save(assessment);
		AssessmentResponseDTO assessmentResponseDTO=modelMapper.map(assessment, AssessmentResponseDTO.class); 
		assessmentResponseDTO.setCourseId(assessment.getCourseId().getCourseId());
		assessmentResponseDTO.setTitle(assessment.getCourseId().getTitle());
		assessmentResponseDTO.setContentURL(assessment.getCourseId().getContentURL());
		assessmentResponseDTO.setInstructorId(assessment.getCourseId().getInstructorId().getUserId());
		assessmentResponseDTO.setInstructorName(assessment.getCourseId().getInstructorId().getName());
		
		return assessmentResponseDTO;
	}
	
	public void gradeAssessment(int submissionId,int grade) {
		// TODO Auto-generated method stub
		Submission submission=submissionRepository.findById(submissionId).get();
		submission.setCurrentScore(grade);
		submissionRepository.save(submission);
		xyz(submission.getAssessmentId().getCourseId().getCourseId(),submission.getStudentId().getUserId());
		
		
	}

	public List<AssessmentResponseDTO> viewAllAssessments(int courseId) {
		// TODO Auto-generated method stub
		List<Assessment> assessmentList=assessmentRepository.findByCourseIdCourseId(courseId);
		List<AssessmentResponseDTO> assessmentListDTO=new ArrayList<>();
		assessmentList.forEach(element->assessmentListDTO.add(modelMapper.map(element,AssessmentResponseDTO.class)));
		
		return assessmentListDTO;
	}

	public List<SubmissionResponseDTO> viewAllSubmissions(int assessmentId) {
		List<Submission> submissionList=submissionRepository.findByAssessmentIdAssessmentId(assessmentId);
		Assessment assessment=assessmentRepository.findById(assessmentId).get();
		List<SubmissionResponseDTO> submissionListDTO=new ArrayList<>();
		submissionList.forEach(element->submissionListDTO.add(modelMapper.map(element,SubmissionResponseDTO.class)));
		for(SubmissionResponseDTO temp:submissionListDTO) {
			temp.setMaxScore(assessment.getMaxScore());
		}
		
		return submissionListDTO;
	}
	
	
	
	public void xyz(int courseId,int studentId) {
		int count=0;
		System.out.println("i was in xyz");
		 List<AssessmentResponseDTO> Alist= viewAllAssessments(courseId);
		 for(AssessmentResponseDTO a:Alist) {
			 List<SubmissionResponseDTO> Slist=viewAllSubmissions(a.getAssessmentId());
			 for(SubmissionResponseDTO s:Slist) {
				 if(s.getStudentId()==studentId) {
				 System.out.println("max:"+s.getMaxScore());
				 System.out.println("current:"+s.getCurrentScore());
				 if(Integer.parseInt(s.getCurrentScore())>=(s.getMaxScore()/2)) {
					 count++;
					 break;
				 }
			 }
			 }
			 System.out.println(count);
			 Enrollment enroll=enrollRepo.findByStudentIdUserIdAndCourseIdCourseId(studentId, courseId);
			 System.out.println("size of array is "+Alist.size());
			float progress=((float)count/(float)Alist.size())*100;
			 enroll.setProgress((int)progress);
			 enrollRepo.save(enroll); 
		 }
		 
		
	}

	public int viewProgess(int studentId,int courseId) {
		// TODO Auto-generated method stub
		Enrollment enroll=enrollRepo.findByStudentIdUserIdAndCourseIdCourseId(studentId, courseId);
		return enroll.getProgress();
	}
	
	
}
