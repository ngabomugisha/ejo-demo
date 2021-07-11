import React from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import { Link } from "react-router-dom";

export const Submit = ({ navigation }) => {
	return (
		<Container maxWidth="sm" style={{ marginTop: "4rem" }}>
			<div className="lastStepCard">
				<h3>Your Lesson Plan has been submitted!</h3>
				<p>Go back to home page for review</p>
				<Link to="/teacher">
					<button className="backButton">Home</button>
				</Link>
			</div>
		</Container>
	);
};
