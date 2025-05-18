import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { getAllCourses } from '../../services/courseService';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function HeroSection() {
    const [courses, setCourses] = useState([]);
    const [searchTitle, setSearchTitle] = useState('');
    const [filteredCourses, setFilteredCourses] = useState([]);
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const allCourses = await getAllCourses();
                setCourses(allCourses);
                setFilteredCourses(allCourses); // Initially show all courses
            } catch (error) {
                console.error('Error fetching courses:', error);
            }
        };
        fetchCourses();
    }, []);

    const handleSearch = (e) => {
        const title = e.target.value;
        setSearchTitle(title);
        const filtered = courses.filter(course =>
            course.title.toLowerCase().includes(title.toLowerCase())
        );
        setFilteredCourses(filtered);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && filteredCourses.length > 0) {
            navigateToCourse(filteredCourses[0].id); // Navigate to the first filtered course
        }
    };

    const navigateToCourse = (courseId) => {
        setSearchTitle('');
        setFilteredCourses([]);
        navigate(`/course/${courseId}`); // Navigate to the course page
    };

    return (
        <section className="text-center py-5"
            style={{
                background: 'linear-gradient(135deg, #6a11cb, #2575fc)',
                color: '#fff'
            }}>
            <h1 className="display-4 fw-bold mb-4 animate__animated animate__fadeInLeft"
                style={{
                    background: 'linear-gradient(90deg, #ff7e5f, #feb47b)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent'
                }}>
                <span className="font-italic">Welcome to Trinetra</span>
            </h1>
            <p className="fs-5 text-light mb-4">Explore a variety of courses and expand your knowledge</p>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Search courses by title..."
                value={searchTitle}
                onChange={handleSearch}
                onKeyPress={handleKeyPress} // Handle Enter key press
                style={{ maxWidth: '400px', margin: '0 auto', borderRadius: '8px' }}
            />
            {searchTitle && filteredCourses.length > 0 && (
                <ul
                    className="list-group"
                    style={{
                        maxWidth: '400px',
                        margin: '0 auto',
                        position: 'relative', // Changed from 'absolute' to 'relative'
                        top: '-15px', // Adjusted to align directly below the input box
                        zIndex: 1000,
                        backgroundColor: '#fff',
                        borderRadius: '8px',
                        overflow: 'hidden',
                    }}
                >
                    {filteredCourses.map(course => (
                        <li
                            key={course.courseId}
                            className="list-group-item"
                            style={{ cursor: 'pointer' }}
                            onClick={() => navigateToCourse(course.courseId)} // Navigate on click
                        >
                            {course.title}
                        </li>
                    ))}
                </ul>
            )}
        </section>
    );
}

export default HeroSection;