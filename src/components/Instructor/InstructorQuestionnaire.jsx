import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const InstructorQuestionnaire = () => {
    const navigate = useNavigate();
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState({
        teachingExperience: "",
        videoProficiency: "",
        audience: "",
    });

    const [error, setError] = useState("");

    const questions = [
        {
            label: "1) What kind of teaching have you done before?",
            name: "teachingExperience",
            options: [
                "Inperson, informally",
                "Inperson, professionally",
                "Online",
                "Other",
            ],
        },
        {
            label: "2) How much of a video “pro” are you?",
            name: "videoProficiency",
            options: [
                "I'm a beginner",
                "I have some knowledge",
                "I'm experienced",
                "I have videos ready to upload",
            ],
        },
        {
            label: "3) Do you have an audience to share your course with?",
            name: "audience",
            options: [
                "Not at the moment",
                "I have a small following",
                "I have a sizable following",
            ],
        },
    ];

    const handleChange = (e) => {
        setAnswers({
            ...answers,
            [e.target.name]: e.target.value,
        });
    };

    const handleNext = () => {
        if (!answers[questions[currentQuestion].name]) {
            setError("Please select an option before proceeding.");
            return;
        }
        setError("");
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            console.log("Instructor Questionnaire Answers:", answers);
            navigate("/login"); // Redirect to login page after successful submission
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(currentQuestion - 1);
        }
    };

    return (
        <div className="container mt-5">
            <div className="card shadow p-4">
                <h2 className="text-center mb-4">Instructor Questionnaire</h2>
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                    <div className="mb-4">
                        <label className="form-label">{questions[currentQuestion].label}</label>
                        {questions[currentQuestion].options.map((option, index) => (
                            <div className="form-check" key={index}>
                                <input
                                    className="form-check-input"
                                    type="radio"
                                    name={questions[currentQuestion].name}
                                    value={option}
                                    onChange={handleChange}
                                    checked={answers[questions[currentQuestion].name] === option}
                                />
                                <label className="form-check-label">{option}</label>
                            </div>
                        ))}
                    </div>
                    <div className="d-flex justify-content-between">
                        {currentQuestion > 0 && (
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={handlePrevious}
                            >
                                Previous
                            </button>
                        )}
                        <button
                            type="button"
                            className="btn btn-primary"
                            onClick={handleNext}
                        >
                            {currentQuestion === questions.length - 1 ? "Submit" : "Next"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default InstructorQuestionnaire;
