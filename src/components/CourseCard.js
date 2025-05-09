import React from 'react';

function CourseCard({ course }) {
  return (
    <div className="course-card">
      <div className="course-icon">{course.icon}</div>
      <h3>{course.title}</h3>
      <p>{course.lessons}</p>
      <p>{course.instructor}</p>
    </div>
  );
}

export default CourseCard;