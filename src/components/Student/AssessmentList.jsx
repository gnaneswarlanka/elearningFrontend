import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";
import ViewScore from "./ViewScore"; // Import the new ViewScore component
import { useNavigate } from "react-router-dom"; // Import useNavigate

function AssessmentList() {
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null); // State to track selected assessment

    const { courseId, authToken, userId } = useUserContext();
    const [viewSubmissions, setViewSubmissions] = useState(null); // State to track submissions for an assessment
    const navigate = useNavigate(); // Initialize navigate function


    useEffect(() => {
        axios.get(`http://localhost:20001/elearning/api/students/${userId}/course/${courseId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then(response => {
                setAssessments(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error("Error fetching assessments:", error);
            });
    }, [courseId, authToken]);

    const handleViewSubmissions = (assessmentId) => {
        axios.get(`http://localhost:20001/elearning/api/students/${userId}/assessment/${assessmentId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => {
                setViewSubmissions(response.data); // Store the submissions
            })
            .catch((error) => {
                console.error("Error fetching submissions:", error);
            });
    };

    if (viewSubmissions) {
        return (
            <div>
                <h2>Submissions</h2>
                <ul>
                    {viewSubmissions.map((submission, index) => (
                        <li key={index}>
                            <p>Submission No.: {index + 1}</p>
                            <button onClick={() => navigate(`/view-score/${submission.submissionId}`)}>
                                View
                            </button>
                        </li>
                    ))}
                </ul>
                <button onClick={() => setViewSubmissions(null)}>Back to Assessments</button>
            </div>
        );
    }

    if (selectedAssessment) {
        return <Assessment assessment={selectedAssessment} />; // Render Assessment component if selected
    }

    return (
        <div>
            <h1>Assessment List</h1>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
                {assessments.map((assessment, index) => (
                    <div key={index} style={{ border: "1px solid #ccc", padding: "10px", borderRadius: "5px", width: "200px" }}>
                        <h3>Assessment-{index}</h3>
                        <p>Score: {assessment.maxScore}</p>
                        <button onClick={() => setSelectedAssessment(assessment)}>
                            Take Assessment
                        </button>
                        <button onClick={() => handleViewSubmissions(assessment.assessmentId)}>
                            View Submissions
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default AssessmentList;

export function Assessment({ assessment }) {
    const { userId, authToken } = useUserContext(); // Access studentId and authToken from context
    const [answer, setAnswer] = useState(""); // State to track the answer
    const [submissionResponse, setSubmissionResponse] = useState(null); // State to track submission response
//const [isSubmitted, setIsSubmitted] = useState(false); // Track if the assessment is submitted
    const [viewScore, setViewScore] = useState(false); // Track if "View Scores" is clicked
    const [hasSubmission, setHasSubmission] = useState(false); // Track if there is at least one submission


    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionDTO = { answer };

        axios.post(
            `http://localhost:20001/elearning/api/students/${userId}/submitAssessments/${assessment.assessmentId}`,
            submissionDTO,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then((response) => {
                setSubmissionResponse(response.data); // Store the response
 //               setIsSubmitted(true); // Mark as submitted
                setHasSubmission(true); // Update submission status
                alert("Submission successful!");
            })
            .catch((error) => {
                console.error("Error submitting assessment:", error);
                alert("Submission failed. Please try again.");
            });
    };

    if (viewScore) {
        return <ViewScore submissionId={submissionResponse?.submissionId} />; // Render ViewScore component
    }

    return (
        <div>
            <h2>Assessment Details</h2>
            <p>Question: {assessment.question}</p>
            <p>Max Score: {assessment.maxScore}</p>
            <form onSubmit={handleSubmit}>
                <label htmlFor="answer">Answer</label>
                <textarea
                    id="answer"
                    name="answer"
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                />
                <button type="submit">Submit</button>
            </form>
            {hasSubmission && (
                <button onClick={() => setViewScore(true)}>View Scores</button>
            )}
        </div>
    );
}