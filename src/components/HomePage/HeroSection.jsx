import React, { useState } from 'react';

function HeroSection() {
  const [searchQuery, setSearchQuery] = useState('');
  const [courses] = useState(['java','React Basics', 'Advanced JavaScript', 'Python for Beginners']); // Mocked course titles
  const [filteredCourses, setFilteredCourses] = useState([]);

  const handleSearch = () => {
    const results = courses.filter(course =>
      course.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredCourses(results);
  };

  return (
    <section className="hero">
      <h1>Welcome to E-Learning Platform</h1>
      <p>Explore a variety of courses and expand your knowledge</p>
      <input
        type="text"
        placeholder="Search courses..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <button onClick={handleSearch}>Browse Courses</button>
      {filteredCourses.length > 0 && (
        <ul>
          {filteredCourses.map((course, index) => (
            <li key={index}>{course}</li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default HeroSection;