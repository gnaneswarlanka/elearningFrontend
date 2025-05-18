import React from "react";
import { useUserContext } from "../../context/UserContext";

function MyProgress() {
    const { numberOfAssessments } = useUserContext();

    return (
        <div className="container mt-4">
            <h2 className="text-center mb-4">My Progress</h2>
            <p className="text-center">You have {numberOfAssessments} assessments in your enrolled courses.</p>
        </div>
    );
}

export default MyProgress;
