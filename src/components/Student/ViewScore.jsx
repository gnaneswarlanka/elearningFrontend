import { useParams } from "react-router-dom"; // Import useParams
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

function ViewScore() {
    const { submissionId } = useParams(); // Get submissionId from URL
    const { authToken,userId } = useUserContext();
    const [score, setScore] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:20001/elearning/api/students/${userId}/submission/${submissionId}`, {
            headers: {
                Authorization: `Bearer ${authToken}`,
            },
        })
            .then((response) => {
                console.log(response.data);
                setScore(response.data);
            })
            .catch((error) => {
                console.error("Error fetching score:", error);
            });
    }, [submissionId, authToken,userId]);

    if (!score) {
        return <p className="text-center mt-5">Loading score...</p>;
    }

    return (
        <div className="container mt-5">
            <div className="card">
                <div className="card-header bg-primary text-white">
                    <h2 className="text-center">Score Details</h2>
                </div>
                <div className="card-body">
                    <p><strong>Question:</strong> {score.question}</p>
                    <p><strong>Answer:</strong> {score.answer}</p>
                    <p><strong>Score:</strong> {score.currentScore === "0" ? "Result Awaited" : score.currentScore}</p>
                </div>
            </div>
        </div>
    );
}

export default ViewScore;
