import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import { connect, useDispatch, useSelector } from "react-redux";
import https from "../../../helpers/https";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
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

const crossCuttingIssuesArrInto = [
	{ issue: "GENOCIDE-STUDIES" },
	{ issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
	{ issue: "GENDER" },
	{ issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
	{ issue: "PEACE-AND-VALUES-EDUCATION" },
	{ issue: "FINANCIAL-EDUCATION" },
	{ issue: "STANDARDISATION-CULTURE" },
	{ issue: "INCLUSIVE-EDUCATION" },
];
const crossCuttingIssuesArrDeve = [
	{ issue: "GENOCIDE-STUDIES" },
	{ issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
	{ issue: "GENDER" },
	{ issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
	{ issue: "PEACE-AND-VALUES-EDUCATION" },
	{ issue: "FINANCIAL-EDUCATION" },
	{ issue: "STANDARDISATION-CULTURE" },
	{ issue: "INCLUSIVE-EDUCATION" },
];
const crossCuttingIssuesArrConc = [
	{ issue: "GENOCIDE-STUDIES" },
	{ issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
	{ issue: "GENDER" },
	{ issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
	{ issue: "PEACE-AND-VALUES-EDUCATION" },
	{ issue: "FINANCIAL-EDUCATION" },
	{ issue: "STANDARDISATION-CULTURE" },
	{ issue: "INCLUSIVE-EDUCATION" },
];
const competenceArrInto = [
	{ competency: "CRITICAL-THINKING" },
	{ competency: "RESEARCH-AND-PROBLEM-SOLVING" },
	{ competency: "CREATIVITY-AND-INNOVATION" },
	{ competency: "COMMUNICATION" },
	{ competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
	{ competency: "LIFELONG-LEARNING" },
];
const competenceArrDeve = [
	{ competency: "CRITICAL-THINKING" },
	{ competency: "RESEARCH-AND-PROBLEM-SOLVING" },
	{ competency: "CREATIVITY-AND-INNOVATION" },
	{ competency: "COMMUNICATION" },
	{ competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
	{ competency: "LIFELONG-LEARNING" },
];
const competenceArrConc = [
	{ competency: "CRITICAL-THINKING" },
	{ competency: "RESEARCH-AND-PROBLEM-SOLVING" },
	{ competency: "CREATIVITY-AND-INNOVATION" },
	{ competency: "COMMUNICATION" },
	{ competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
	{ competency: "LIFELONG-LEARNING" },
];

export const ActivitiesDev = (props) => {
	// const { formData } = props;
	// console.log("formdata", formData);
	const { newLessonPlan } = props;
	const dispatchLesson = useDispatch();
	// console.log("new lesson plan in activitiesIntro form", newLessonPlan);
	const [content, setContent] = useState([]);
	const [crossCuttingIssues, setCrossCuttingIssues] = useState("");
	const [competency, setCompetency] = useState("");
	const [issueComment, setIssueComment] = useState("");
	const [competencyComment, setCompetencyComment] = useState("");
	const [otherActivity, setOtherActivity] = useState("");
	const thisFormData = {
		development: {
			content: {
				activities: [
					{
						activity: null,
					},
				],
				otherActivity: "",
			},
			crossCuttingIssues: {
				issues: [
					{
						issue: null,
					},
				],
				omment: null,
			},
			competency: {
				competencies: [
					{
						competency: null,
					},
				],
				comment: null,
			},
		},
		exercises: {},
	};

	const exercises = {
		questions: [],
	};

	const [questionBank, setQuestionBank] = useState(null);
	const [contentData, setContentData] = useState(null);
	const classes = useStyles();
	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const handleChange = (e) => {
		if (e.target.checked) {
			handleAddChange(e);
		} else {
			handleRemoveChange(e);
		}
	};

	const handleAddChange = (e) => {
		if (e.target.name === "content") {
			newLessonPlan.activities.development.content.activities.push({
				activity: e.target.value,
			});
		} else if (e.target.name == "crossCuttingIssues") {
			newLessonPlan.activities.development.crossCuttingIssues.issues.push({
				issue: e.target.value,
			});
		} else if (e.target.name == "competency") {
			newLessonPlan.activities.development.competency.competencies.push({
				competency: e.target.value,
			});
		}
	};

	const handleRemoveChange = (e) => {
		if (e.target.name === "content") {
			var contentIndex =
				newLessonPlan.activities.development.content.activities.indexOf(
					e.target.value
				);
			newLessonPlan.activities.development.content.activities.splice(
				contentIndex,
				1
			);
		} else if (e.target.name == "crossCuttingIssues") {
			var issueIndex =
				newLessonPlan.activities.development.crossCuttingIssues.issues.indexOf(
					e.target.value
				);
			newLessonPlan.activities.development.crossCuttingIssues.issues.splice(
				issueIndex,
				1
			);
		} else if (e.target.name == "competency") {
			var competencyIndex =
				newLessonPlan.activities.development.competency.competencies.indexOf(
					e.target.value
				);
			newLessonPlan.activities.development.competency.competencies.splice(
				competencyIndex,
				1
			);
		}
	};

	const handleQuestionClick = (e) => {
		const quest = questionBank.filter((q) => q._id == e.target.value);
		console.log("clicked question", quest);
		const {
			difficultLevel,
			questionsObjective,
			question,
			questionType,
			possibleAnswer,
			answer,
		} = quest[0];
		if (e.target.checked) {
			newLessonPlan.activities.development.exercises.questions.push({
				difficultLevel,
				questionsObjective,
				question,
				questionType,
				possibleAnswer,
				answer,
			});
			console.log("updated questions", newLessonPlan);
		} else {
			var questionIndex =
				newLessonPlan.activities.development.exercises.questions.indexOf(
					e.target.value
				);
			newLessonPlan.activities.development.exercises.questions.splice(
				questionIndex,
				1
			);
		}
	};

	const handleTextField = (e) => {
		if (e.target.name === "otherActivity") {
			newLessonPlan.activities.development.content.otherActivity =
				e.target.value;
		} else if (e.target.name === "crossCuttingIssues") {
			newLessonPlan.activities.development.crossCuttingIssues.omment =
				e.target.value;
		} else if (e.target.name === "competency") {
			newLessonPlan.activities.development.competency.comment = e.target.value;
		}
	};

	useEffect(() => {
		async function fetchQuestion() {
			if (newLessonPlan.unit) {
				const req = await https
					.get(
						`question-banks/602c349dfd1613203834880d/subject-question-bank`, //should be dynamic
						{
							headers: { Authorization: `Basic ${localStorage.token}` },
						}
					)
					.then((res) => {
						console.log("RESPONSE DATA", res.data);
						const questions = [];
						res.data.forEach((q) => {
							const {
								_id,
								difficultLevel,
								questionsObjective,
								question,
								questionType,
								possibleAnswer,
								answer,
							} = q;
							questions.push({
								_id,
								difficultLevel,
								questionsObjective,
								question,
								questionType,
								possibleAnswer,
								answer,
								points: 10,
							});
						});
						setQuestionBank(questions);
					})
					.catch(function (err) {
						console.log(err);
					});
				return req;
			}
		}
		fetchQuestion();
	}, []);

	useEffect(() => {
		async function fetchUnit() {
			if (newLessonPlan.unit) {
				const req = await https
					.get(`/lessons/units/${newLessonPlan.unit}`, {
						headers: { Authorization: `Basic ${localStorage.token}` },
					})
					.then((res) => {
						setContentData(res.data.activities);
						//setContentDevelopmentData(res.data.activities)
						// console.log("UNITS : ", res.data);
					})
					.catch(function (err) {
						console.log(err);
					});
				return req;
			}
		}
		fetchUnit();
	}, []);

	useEffect(() => {
		console.log("dispatchhhh:");
		dispatchLesson(setNewLessonplan(newLessonPlan));
		console.log("dispached an action", newLessonPlan);

		console.log("dispatch finally", newLessonPlan);
	}, [
		content,
		crossCuttingIssues,
		competency,
		otherActivity,
		issueComment,
		competencyComment,
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
									<h3>Content</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{!contentData
										? ""
										: contentData.map((val) => {
												return (
													<FormControlLabel
														value={val.activity}
														control={
															<Checkbox
																onChange={(e) => {
																	handleChange(e);
																	setContent(e.target.value);
																}}
																color="primary"
																name="content"
															/>
														}
														label={val.activity}
														labelPlacement="start"
													/>
												);
										  })}

									<div className="msg-field">
										<TextField
											id="outlined-basic"
											name="otherActivity"
											variant="outlined"
											label="Other Activities"
											row={2}
											type="text"
											fullWidth
											color="primary"
											multiline={true}
											rowsMax="8"
											onChange={(e) => {
												handleTextField(e);
												setOtherActivity(e.target.value);
											}}
										/>
									</div>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</div>
				<div className={classes.root}>
					<Button block onClick={handleShow}>
						Upload Exercises
					</Button>
				</div>
				<Modal
					show={show}
					onHide={handleClose}
					backdrop="static"
					keyboard={false}
					scrollable
					size="lg"
				>
					<Modal.Header closeButton>
						<Modal.Title>Pick Exercises</Modal.Title>
					</Modal.Header>
					<Modal.Body>
						<h3>Available exercises</h3>
						{!questionBank
							? ""
							: questionBank.map((q) => {
									return (
										<div className="questionWrapper">
											<FormControlLabel
												value={q._id}
												control={
													<Checkbox
														color="primary"
														name="exercises"
														onChange={(e) => {
															handleQuestionClick(e);
														}}
													/>
												}
												label={q.question}
												labelPlacement="start"
												style={{
													display: "flex",
													justifyContent: "space-between",
												}}
											/>
											<div className="questionLabels">
												<div className="labelItem">
													<p>{q.questionType}</p>
												</div>
												<div className="labelItem">
													<p>{q.difficultLevel}</p>
												</div>
											</div>
										</div>
									);
							  })}
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							Done
						</Button>
					</Modal.Footer>
				</Modal>

				<div className="topic">
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Cross Cutting Issues</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{crossCuttingIssuesArrInto.map((val) => {
										return (
											<FormControlLabel
												value={val.issue}
												control={
													<Checkbox
														color="primary"
														name="crossCuttingIssues"
														onChange={(e) => {
															handleChange(e);
															setCrossCuttingIssues(e.target.value);
														}}
													/>
												}
												label={val.issue}
												labelPlacement="start"
											/>
										);
									})}

									<div className="msg-field">
										<TextField
											id="outlined-basic"
											name="crossCuttingIssues"
											variant="outlined"
											label="Comment"
											row={2}
											type="text"
											fullWidth
											color="primary"
											multiline={true}
											rowsMax="8"
											onChange={(e) => {
												handleTextField(e);
												setIssueComment(e.target.value);
											}}
										/>
									</div>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
				</div>
				<div className="topic">
					<Accordion defaultActiveKey="">
						<Card>
							<Accordion.Toggle as={Card.Header} eventKey="0">
								<div className="accordion-title">
									<h3>Competency</h3>
									<h3>
										<MdKeyboardArrowDown />
									</h3>
								</div>
							</Accordion.Toggle>
							<Accordion.Collapse eventKey="0">
								<Card.Body>
									{competenceArrInto.map((val) => {
										return (
											<FormControlLabel
												value={val.competency}
												control={
													<Checkbox
														onChange={(e) => {
															handleChange(e);
															setCompetency(e.target.value);
														}}
														color="primary"
														name="competency"
													/>
												}
												label={val.competency}
												labelPlacement="start"
											/>
										);
									})}

									<div className="msg-field">
										<TextField
											id="outlined-basic"
											name="competency"
											variant="outlined"
											label="Comment"
											row={2}
											type="text"
											fullWidth
											color="primary"
											multiline={true}
											rowsMax="8"
											onChange={(e) => {
												handleTextField(e);
												setCompetencyComment(e.target.value);
											}}
										/>
									</div>
								</Card.Body>
							</Accordion.Collapse>
						</Card>
					</Accordion>
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

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDev);
