import React from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetail from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import https from "../../../helpers/https";
import { useState } from "react";
import ListItemText from "@material-ui/core/ListItemText";

import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import AttitudeAndValuesForm from "../forms/AttitudeAndValuesForm";
import { Link } from "react-router-dom";

export const Review = ({ formData, navigation }) => {
	const { go } = navigation;
	const { newLessonPlan } = useSelector((state) => state);

	const [alertMsg, setAlertMsg] = useState("");
	// const {
	// 	firstName,
	// 	lastName,
	// 	nickName,
	// 	address,
	// 	city,
	// 	state,
	// 	zip,
	// 	phone,
	// 	email,
	// } = formData;

	const lesson = {
		unit: newLessonPlan.unit,
		assignedClass: newLessonPlan.assignedClass,
		unitPlanId: newLessonPlan.unitPlanId,
		subject: newLessonPlan.subject,
		keyUnitCompetency: newLessonPlan.keyUnitCompetency,
		lessonNumber: newLessonPlan.lessonNumber,
		lessonName: newLessonPlan.lessonName,
		time: newLessonPlan.time,
	};

	const req = {
		lesson: JSON.stringify(lesson),
		knowledge: JSON.stringify(newLessonPlan.knowledge),
		skills: JSON.stringify(newLessonPlan.skills),
		attitudesAndValues: JSON.stringify(newLessonPlan.attitudesAndValues),
		activities: JSON.stringify(newLessonPlan.activities),
		teachingTechniques: JSON.stringify(newLessonPlan.teachingTechniques),
	};
	console.log("FINAL TEST:", newLessonPlan);
	const onSubmit = async () => {
		await https
			.post("/lessons/plans", req, {
				headers: {
					Authorization: `Basic ${localStorage.token}`,
					contentType: "application/json",
				},
			})
			.then((res) => {
				if (res.status == 200) {
					console.log("submitted");
					setAlertMsg("lesson plan submitted");
					//setOpen(true);
				} else return alert("something went wrong");
			});
	};

	var today = new Date();
	var dd = String(today.getDate()).padStart(2, "0");
	var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
	var yyyy = today.getFullYear();

	today = mm + "/" + dd + "/" + yyyy;

	return (
		<Container maxWidth="sm">
			<div className="lessonPlan">
				<div className="smallDiv leftSide">
					<h5>Lesson Name:</h5>
					<p>{newLessonPlan.lessonName}</p>
					<h5>Created on:</h5>
					<p>{today}</p>
				</div>
				<div className="smallDiv rightSide">
					<Link to="/teacher/newLessonPlan/details">
						<h5>Review before submitting</h5>
					</Link>
				</div>
			</div>

			<h3>Ready to submit </h3>
			<Button
				color="primary"
				variant="contained"
				style={{ marginTop: "1.5rem" }}
				onClick={() => {
					onSubmit();
					go("submit");
				}}
			>
				Submit
			</Button>
		</Container>
	);
};

// export const RenderAccordion = ({ summary, details, go }) => (
// 	<Accordion>
// 		<AccordionSummary expandIcon={<ExpandMoreIcon />}>
// 			{summary}
// 		</AccordionSummary>
// 		<AccordionDetail>
// 			<div>
// 				{details.map((data, index) => {
// 					const objKey = Object.keys(data)[0];
// 					const objValue = data[Object.keys(data)[0]];

// 					return (
// 						<ListItemText key={index}>{`${objKey}: ${objValue}`}</ListItemText>
// 					);
// 				})}
// 				<IconButton
// 					color="primary"
// 					component="span"
// 					onClick={() => go(`${summary.toLowerCase()}`)}
// 				>
// 					<EditIcon />
// 				</IconButton>
// 			</div>
// 		</AccordionDetail>
// 	</Accordion>
// );
