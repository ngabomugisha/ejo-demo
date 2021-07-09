import React from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import Button from "@material-ui/core/Button";
import https from "../../../helpers/https";
import { useState } from "react";
import { useSelector } from "react-redux";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

export const Review = ({ formData, navigation }) => {
	const { go } = navigation;
	const { newLessonPlan } = useSelector((state) => state);
	const [open, setOpen] = useState(false);

	const [alertMsg, setAlertMsg] = useState("");

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
					setOpen(true);

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
				<button
					className="backButton"
					onClick={() => {
						navigation.go("LessonPlan_4");
					}}
				>
					Back
				</button>
				<div className="summaryItem">
					<h5>Lesson Name:</h5>
					<h3>{newLessonPlan.lessonName}</h3>
				</div>
				<div className="summaryItem">
					<h5>Created on:</h5>
					<h3>{today}</h3>
				</div>
				<div className="summaryItem last">
					<h3>Ready to submit? </h3>
				</div>
				<Button
					color="primary"
					variant="contained"
					style={{ marginTop: "1.5rem" }}
					onClick={() => {
						onSubmit();
						setTimeout(() => {
							console.log("done!");
						}, 2000);
						go("submit");
					}}
				>
					Submit
				</Button>
				<Button
					color="primary"
					variant="contained"
					style={{ marginTop: "1.5rem" }}
					onClick={() => {
						go("final");
					}}
				>
					Review before submitting
				</Button>
				<Collapse in={open}>
					<Alert
						style={{ width: "100%", marginTop: "10px" }}
						severity="success"
						action={
							<IconButton
								aria-label="close"
								color="inherit"
								size="small"
								onClick={() => {
									setOpen(false);
								}}
							>
								<CloseIcon fontSize="inherit" />
							</IconButton>
						}
					>
						Enter atleast one Skill
					</Alert>
				</Collapse>
			</div>
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
