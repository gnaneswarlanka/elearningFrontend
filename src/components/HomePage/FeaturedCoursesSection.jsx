import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import CourseCard from '../CourseCard';
import { useUserContext } from '../../context/UserContext'; // Import useUserContext
//import { enrollInCourse } from '../../services/enrollmentService';
const API_BASE_URL = 'http://localhost:20003/api/courses';
function FeaturedCoursesSection() {
    const [courses, setCourses] = useState([]);
    const [error, setError] = useState(null);
    const { userId, authToken } = useUserContext(); // Assuming you have a context to get userId and authToken
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchCourses = async () => {

            try {
                const allCourses = await axios.get(`${API_BASE_URL}/`);
                console.log(allCourses.data);
                const coursesWithImages = allCourses.data.slice(0, 4).map((course, index) => ({
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
    }, []);

    const handleEnroll = () => {
            Navigate("/login")
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
                            onClick={() => handleEnroll()}
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