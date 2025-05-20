import React from 'react';

function AboutUsSection() {
  return (
    <section className="bg-light text-dark py-5">
      <div className="container text-center">
        <h2 className="display-4 fw-bold mb-4 text-primary">About Trinetra</h2>
        <p className="lead mb-4 text-muted">
          Trinetra is an innovative e-learning platform designed to empower individuals with knowledge and skills.
          Our platform offers a wide range of courses across various domains, enabling learners to achieve their
          personal and professional goals. Whether you're looking to upskill, reskill, or explore new interests,
          Trinetra provides a seamless and engaging learning experience.
        </p>
        <p className="lead mb-4 text-muted">
          Join us today and start your journey towards a brighter future!
        </p>
        <div className="row mt-5">
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Wide Range of Courses</h5>
                <p className="card-text text-muted">
                  Explore courses in technology, business, arts, and more, curated by industry experts.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-outline-primary btn-sm">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Flexible Learning</h5>
                <p className="card-text text-muted">
                  Learn at your own pace with our flexible schedules and user-friendly platform.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-outline-primary btn-sm">Learn More</button>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm border-0 h-100">
              <div className="card-body">
                <h5 className="card-title text-primary">Expert Instructors</h5>
                <p className="card-text text-muted">
                  Gain insights and guidance from experienced professionals and educators.
                </p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-outline-primary btn-sm">Learn More</button>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h3 className="fw-bold text-primary mb-4">Our Journey and Achievements</h3>
          <div className="row">
            <div className="col-md-3">
              <div className="p-4 bg-white shadow-sm rounded">
                <h4 className="text-primary">10,000+</h4>
                <p className="text-muted">Learners Empowered</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 bg-white shadow-sm rounded">
                <h4 className="text-primary">500+</h4>
                <p className="text-muted">Courses Offered</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 bg-white shadow-sm rounded">
                <h4 className="text-primary">50+</h4>
                <p className="text-muted">Industry Experts</p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 bg-white shadow-sm rounded">
                <h4 className="text-primary">100+</h4>
                <p className="text-muted">Corporate Partners</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AboutUsSection;