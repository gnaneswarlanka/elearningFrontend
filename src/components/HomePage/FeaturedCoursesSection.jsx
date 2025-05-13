import React, { useEffect, useState } from 'react';
import CourseCard from '../CourseCard';
import { getAllCourses } from '../../services/courseService';
import { enrollInCourse } from '../../services/enrollmentService';
import { useUserContext } from '../../context/UserContext';

function FeaturedCoursesSection() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const { authToken, userId } = useUserContext();

    useEffect(() => {
        const fetchCourses = async () => {
            if (!authToken) {
                console.error('Auth token is missing. Please log in.');
                setError('You must be logged in to view featured courses.');
                return;
            }

            try {
                const allCourses = await getAllCourses(authToken);
                const coursesWithImages = allCourses.slice(0, 4).map((course, index) => ({
                    ...course,
                    image: getCourseImage(index), // Assign an image based on the index
                }));
                setCourses(coursesWithImages);
            } catch (err) {
                console.error('Error fetching courses:', err.response || err.message || err);
                setError('Failed to load featured courses. Please try again later.');
            }
        };

        fetchCourses();
    }, [authToken]);

    const handleEnroll = async (courseId) => {
        try {
            await enrollInCourse(userId, courseId, authToken);
            alert('Successfully enrolled in the course!');
        } catch (err) {
            console.error('Error enrolling in course:', err);
            alert('Failed to enroll in the course. Please try again later.');
        }
    };

    const getCourseImage = (index) => {
        const images = [
            'https://img.icons8.com/?size=100&id=pIJdjOoL6KfU&format=png&color=000000',
            'https://img.icons8.com/?size=100&id=GPfHz0SM85FX&format=png&color=000000',
            'https://img.icons8.com/?size=100&id=J6KcaRLsTgpZ&format=png&color=000000',
            'https://img.icons8.com/?size=100&id=dRqM1lGcJv6U&format=png&color=000000',
        ]; // Example image paths
        return images[index % images.length];
    };

    return (
        <section className="featured-courses">
            <h2>Featured Courses</h2>
            {error && <p className="text-danger">{error}</p>}
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.courseId} className="course-card">
                        <CourseCard course={course} image={course.image} />
                        <button
                            onClick={() => handleEnroll(course.courseId)}
                            className="btn btn-primary mt-2"
                        >
                            Enroll
                        </button>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturedCoursesSection;