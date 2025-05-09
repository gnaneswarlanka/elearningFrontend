import React from 'react';
import CourseCard from './CourseCard';

function FeaturedCoursesSection() {
  const courses = [
    {
      id: 1,
      title: 'Web Development',
      lessons: '12 lessons',
      instructor: 'Alex Sauteen',
      icon: '</>', // Placeholder for an icon
    },
    {
      id: 2,
      title: 'Data Science',
      lessons: '12 lessons',
      instructor: 'Anorangea',
      icon: '📊', // Placeholder for an icon
    },
    {
      id: 3,
      title: 'Machine Learning',
      lessons: '15 lessons',
      instructor: 'Emred Mohumy',
      icon: '⚛️', // Placeholder for an icon
    },
    {
      id: 4,
      title: 'Python Programming',
      lessons: '15 lessons',
      instructor: 'John Schatten',
      icon: '🐍', // Placeholder for an icon
    },
  ];

  return (
    <section className="featured-courses">
      <h2>Featured Courses</h2>
      <div className="courses-grid">
        {courses.map(course => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  );
}

export default FeaturedCoursesSection;