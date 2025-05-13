import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

function AssessmentList() {
    const [assessments, setAssessments] = useState([]);
    const [selectedAssessment, setSelectedAssessment] = useState(null); // State to track selected assessment
    const { courseId, authToken } = useUserContext();

    useEffect(() => {
        axios.get(`http://localhost:8082/api/students/course/${courseId}`, {
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

    if (selectedAssessment) {
        return <Assessment assessment={selectedAssessment} />; // Render Assessment component if selected
    }

    return (
        <div>
            <h1>Assessment List</h1>
            <ul>
                {assessments.map((assessment, index) => (
                    <li key={index}>
                        <button onClick={() => setSelectedAssessment(assessment)}>
                            Assessment-{index} | Score-{assessment.maxScore}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default AssessmentList;

export function Assessment({ assessment }) {
    const { userId, authToken } = useUserContext(); // Access studentId and authToken from context
    const [answer, setAnswer] = useState(""); // State to track the answer
    const [submissionResponse, setSubmissionResponse] = useState(null); // State to track submission response

    const handleSubmit = (e) => {
        e.preventDefault();
        const submissionDTO = { answer };

        axios.post(
            `http://localhost:8082/api/students/${userId}/submitAssessments/${assessment.assessmentId}`,
            submissionDTO,
            {
                headers: {
                    Authorization: `Bearer ${authToken}`,
                },
            }
        )
            .then((response) => {
                setSubmissionResponse(response.data); // Store the response
                alert("Submission successful!");
            })
            .catch((error) => {
                console.error("Error submitting assessment:", error);
                alert("Submission failed. Please try again.");
            });
    };

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
            {/* {submissionResponse && (
                <div>
                    <h3>Submission Response</h3>
                    <p>{JSON.stringify(submissionResponse)}</p>
                </div>
            )} */}
        </div>
    );
}