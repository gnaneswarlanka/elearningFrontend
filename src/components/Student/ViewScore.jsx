import { useParams } from "react-router-dom"; // Import useParams
import { useState, useEffect } from "react";
import axios from "axios";
import { useUserContext } from "../../context/UserContext";

function ViewScore() {
    const { submissionId } = useParams(); // Get submissionId from URL
    const { authToken,userId } = useUserContext();
    const [score, setScore] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:20003/api/students/${userId}/submission/${submissionId}`, {
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
    }, [submissionId, authToken]);

    if (!score) {
        return <p>Loading score...</p>;
    }

    return (
        <div>
            <h2>Score Details</h2>
            <p>Quesition: {score.question}</p>
            <p>Answer: {score.answer}</p>
            <p>Score: {score.currentScore}</p>
            
        </div>
    );
}

export default ViewScore;
