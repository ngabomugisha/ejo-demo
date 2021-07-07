import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import { connect, useDispatch, useSelector } from "react-redux";
import https from "../../../helpers/https";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";
import Modal from "react-bootstrap/Modal";

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
		flexWrap: "wrap",
		"& > *": {
			margin: theme.spacing(1),
		},
	},
	margin: {
		margin: theme.spacing(1),
	},
	withoutLabel: {
		marginTop: theme.spacing(3),
	},
	textField: {
		width: "25ch",
	},
	input: {
		display: "none",
	},
}));

const contentFocus = [
	{ item: "LIVE LECTURING" },
	{ item: "AUDIO VISUAL PRESENTATIONS" },
	{ item: "ASSIGNED READING/TEXT" },
	{ item: "GUEST SPEAKERS" },
	{ item: "CLASSROOM DISPLAYS" },
	{ item: "FIELD VISIT" },
	{ item: "PEER TEACHING" },
];

const interactiveFocus = [
	{ item: "GROUP WORK" },
	{ item: "DIRECTED QUESTION AND ANSWER" },
	{ item: "FACILITATED SYNCHRONOUS DISCUSSION" },
	{ item: "JIGSAW COLLABORATIVE INFORMATION SHARING" },
	{ item: "GROUP ASSIGNMENTS" },
	{ item: "PEER TO PEER LEARNING" },
];

const criticalThinking = [
	{ item: "CLASS DISCUSSION DEBATES" },
	{ item: "RESPONSE TO AN ASSIGNMENT" },
];

const production = [
	{ item: "SKILLLS PRACTICE" },
	{ item: "DEMONSTRATION AND MODELING" },
	{ item: "INFOGRAPHIC" },
	{ item: "ORAL SUMMARY" },
	{ item: "WRITTEN SUMMARY" },
	{ item: "CLASS TEST" },
];

const problemSolving = [
	{ item: "RESEARCH INQUIRY" },
	{ item: "SIMULATION" },
	{ item: "CASE STUDY" },
	{ item: "CLASS SOLUTION AND CONSEQUENCE" },
	{ item: "ROLE PLAY" },
];

const reflection = [
	{ item: "REFLECTION ON LEARNING" },
	{ item: "PRIOR UNDERSTANDING" },
	{ item: "SELF ASSESSMENT" },
];

const sittingArrangement = [
	{ item: "LECTURE/INDEPENDENT WORK/TEST" },
	{ item: "GROUP WORK/STATIONS" },
	{ item: "DEMONSTRATION/DISCUSSION" },
];

export const TechniquesIntro = (props) => {
	const { newLessonPlan } = props;
	const dispatchLesson = useDispatch();
	const [contentFocusArr, setContentFocusArr] = useState([]);
	const [interactiveFocusArr, setInteractiveFocusArr] = useState([]);
	const [criticalThinkingArr, setCriticalThinkingArr] = useState([]);
	const [productionArr, setProductionArr] = useState([]);
	const [problemSolvingArr, setProblemSolvingArr] = useState([]);
	const [reflectionArr, setReflectionArr] = useState([]);
	const [sittingArrangementArr, setSittingArrangementArr] = useState([]);
	const [duration, setDuration] = useState();

	console.log("TEST DURATION:", newLessonPlan);
	const classes = useStyles();

	const handleChange = (e) => {
		if (e.target.checked) {
			handleAddChange(e);
		} else {
			handleRemoveChange(e);
		}
	};

	const handleAddChange = (e) => {
		if (e.target.name === "contentFocus") {
			newLessonPlan.teachingTechniques.introduction.contentFocus.push({
				item: e.target.value,
			});
		} else if (e.target.name === "interactiveFocus") {
			newLessonPlan.teachingTechniques.introduction.interactiveFocus.push({
				item: e.target.value,
			});
		} else if (e.target.name === "criticalThinking") {
			newLessonPlan.teachingTechniques.introduction.criticalThinking.push({
				item: e.target.value,
			});
		} else if (e.target.name === "production") {
			newLessonPlan.teachingTechniques.introduction.production.push({
				item: e.target.value,
			});
		} else if (e.target.name === "problemSolving") {
			newLessonPlan.teachingTechniques.introduction.problemSolving.push({
				item: e.target.value,
			});
		} else if (e.target.name === "reflection") {
			newLessonPlan.teachingTechniques.introduction.reflection.push({
				item: e.target.value,
			});
		} else if (e.target.name === "sittingArrangement") {
			newLessonPlan.teachingTechniques.introduction.sitingArrangement.push({
				item: e.target.value,
			});
		}
	};

	const handleRemoveChange = (e) => {
		if (e.target.name === "contentFocus") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.contentFocus.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.contentFocus.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "interactiveFocus") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.interactiveFocus.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.interactiveFocus.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "criticalThinking") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.criticalThinking.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.criticalThinking.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "production") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.production.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.production.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "problemSolving") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.problemSolving.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.problemSolving.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "reflection") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.reflection.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.reflection.splice(
				contentIndex,
				1
			);
		} else if (e.target.name === "sittingArrangement") {
			var contentIndex =
				newLessonPlan.teachingTechniques.introduction.sitingArrangement.indexOf(
					e.target.value
				);
			newLessonPlan.teachingTechniques.introduction.sitingArrangement.splice(
				contentIndex,
				1
			);
		}
	};

	const handleTextField = (e) => {
		newLessonPlan.teachingTechniques.introduction.duration = e.target.value;
	};

	useEffect(() => {
		console.log("dispatchhhh:");
		dispatchLesson(setNewLessonplan(newLessonPlan));
		console.log("dispached an action", newLessonPlan);

		console.log("dispatch finally", newLessonPlan);
	}, [
		contentFocusArr,
		interactiveFocusArr,
		criticalThinkingArr,
		productionArr,
		problemSolvingArr,
		reflectionArr,
		sittingArrangementArr,
	]);

	return (
		<>
			<div className="knowledge-container">
				<p></p>
				<div className="topic">
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Content Focus</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{contentFocus.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="contentFocus"
														onChange={(e) => {
															handleChange(e);
															setContentFocusArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Interactivity Focus</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{interactiveFocus.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="interactiveFocus"
														onChange={(e) => {
															handleChange(e);
															setInteractiveFocusArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Critical Thinking</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{criticalThinking.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="criticalThinking"
														onChange={(e) => {
															handleChange(e);
															setCriticalThinkingArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Production</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{production.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="production"
														onChange={(e) => {
															handleChange(e);
															setProductionArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Problem Solving</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{problemSolving.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="problemSolving"
														onChange={(e) => {
															handleChange(e);
															setProblemSolvingArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Reflection</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{reflection.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="reflection"
														onChange={(e) => {
															handleChange(e);
															setReflectionArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Sitting Arrangement</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{sittingArrangement.map((val) => {
										return (
											<FormControlLabel
												value={val.item}
												control={
													<Checkbox
														color="primary"
														name="sittingArrangement"
														onChange={(e) => {
															handleChange(e);
															setSittingArrangementArr(e.target.value);
														}}
													/>
												}
												label={val.item}
												labelPlacement="start"
											/>
										);
									})}
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
					<div className="msg-field">
						<TextField
							id="outlined-basic"
							name="duration"
							variant="outlined"
							label="Duration(Min)"
							row={1}
							type="number"
							fullWidth
							color="primary"
							multiline={true}
							rowsMax="8"
							onChange={(e) => {
								handleTextField(e);
								setDuration(e.target.value);
							}}
						/>
					</div>
				</div>
			</div>
		</>
	);
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
	// console.log("dispatch");
	// return {
	//   setNewLessonplan: (newLessonPlan) =>
	//     dispatch(setNewLessonplan(newLessonPlan)),
	// };
};

export default connect(mapStateToProps, mapDispatchToProps)(TechniquesIntro);
