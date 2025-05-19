package com.cognizant.project.elearning.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.cognizant.project.elearning.entity.Course;
import com.cognizant.project.elearning.entity.Enrollment;
import com.cognizant.project.elearning.entity.Student;

@Repository
public interface EnrollmentRepository extends JpaRepository<Enrollment, Integer> {

	Enrollment findByStudentIdAndCourseId(Student student,Course course);
	Enrollment findByStudentIdUserIdAndCourseIdCourseId(int studentId,int courseId);
	List<Enrollment> findByStudentId(Student studentId);
	List<Enrollment> findByCourseIdCourseId(int courseId);
	Enrollment findByStudentIdUserId(int studentId);
}
