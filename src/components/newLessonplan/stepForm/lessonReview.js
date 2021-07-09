import React, { useState, useEffect } from "react";
import { connect, useSelector } from "react-redux";
import "./style.css";
import https from "../../../helpers/https";
import { Accordion, Card } from "react-bootstrap";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import "bootstrap/dist/css/bootstrap.min.css";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import InputBase from "@material-ui/core/InputBase";
import { AiFillPrinter } from "react-icons/ai";
import Popup from "../../popup/index";
import Button from "react-bootstrap/Button";


const useStyles = makeStyles((theme) => ({
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	selectEmpty: {
		marginTop: theme.spacing(2),
	},
}));

export const LessonReview = (props) => {

	const { go } = props.navigation;
	const { newLessonPlan } = useSelector((state) => state);
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();
	const [subject, setSubject] = useState(newLessonPlan.subject);

	const [subjects, setSubjects] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);
	const [openPrintPopup, setOpenPrintPopup] = useState(false);
	const [recordForEdit, setRecordForEdit] = useState(null);
	const [topic, setTopic] = useState();
	const [subTopic, setSubTopic] = useState();
	const [unit, setUnit] = useState();
	const [topicId, setTopicId] = useState("");
	const [subTopicId, setSubTopicId] = useState("");


	const handleChange = (event) => {
		setSubject(event.target.value);
	};

	// const openInPopup = () => {
	// 	setRecordForEdit(props.data);
	// 	setOpenPopup(true);
	// };

	async function fetchUnit() {
		const req = await https
			.get(`/lessons/units/${newLessonPlan.unit}`, {
				headers: { Authorization: `Basic ${localStorage.token}` },
			})
			.then((res) => {
				setUnit(res.data);
				setTopicId(res.data.topic);
				setSubTopicId(res.data.subTopic);
				return res.data;
			})
			.catch(function (err) {
				console.log(err);
				return;
			});
		return req;
	}

	useEffect(() => {
		fetchUnit();
	}, [newLessonPlan]);

	useEffect(() => {
		// console.log("test sub topic:", subTopicId);
		// console.log("test topic:", topicId);

		async function fetchTopic() {
			const req = await https
				.get(`/lessons/topics/${topicId}`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					console.log("test topic:", res.data);
					setTopic(res.data);
					return res.data;
				})
				.catch(function (err) {
					console.log(err);
					return;
				});
			return req;
		}

		async function fetchSubTopic() {
			const req = await https
				.get(`/lessons/subtopics/${subTopicId}`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					console.log("test sub topic:", res.data);
					return res.data;
				})
				.catch(function (err) {
					console.log(err);
					return;
				});
			return req;
		}
		fetchTopic();
		fetchSubTopic();
	}, [unit]);
	return (
		<>
			<div className="select-subject">
				<button
					//onClick={() => openInPopup(subject)}
					style={{ maxWidth: "250px" }}
					className="check-btn-2"
				>
					{" "}
					<AiFillPrinter /> &nbsp;Print Lesson Plan
				</button>
			</div>
			<button
				className="backButton"
				onClick={() => {
					go("review");
				}}
			>
				Back
			</button>
			<div className="plan-container-lesson">

				<div className="titl">
					<h1>Syllabus</h1>
					<div className="titl2">
						<h4>1. Topic Area:</h4>
						<h5>{topic ? topic.name : "Topic"}</h5>
					</div>
					<div className="titl2">
						<h4>2. Sub Topic Area:</h4>
						<h5>{subTopic ? subTopic.name : "Sub Topic"}</h5>
					</div>
					<div className="titl2">
						<h4>3. Unit:</h4>
						<h5>{unit ? unit.name : "Unit"}</h5>
					</div>
					<div className="titl2">
						<h4>4. Unit Competency:</h4>
						<h5>{newLessonPlan.keyUnitCompetency}</h5>
					</div>
					<div className="titl2">
						<h4>5. Lesson Name:</h4>
						<h5>{newLessonPlan.lessonName}</h5>
					</div>
				</div>
				<div className="titl">
					<h1>Instructional Objectives</h1>
				</div>
				<Accordion defaultActiveKey="0">
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							1. Knowledge
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Topics:</h4>
									{newLessonPlan.knowledge.topics
										? newLessonPlan.knowledge.topics.map((T) => (
												<div className="itemCard">
													<h5>Topic:</h5> <h6>{T.topic}</h6>
													<h5>Bloom Taxonomy Level:</h5>{" "}
													<h6>{T.bloomTaxonomyLevel}</h6>
													<h5>Standard Criteria Performance:</h5>
													<h6>{T.standardCriteriaPerfomance}</h6>
												</div>
										  ))
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Instructional Material:</h4>
									{newLessonPlan.knowledge.instructionalMaterial
										? newLessonPlan.knowledge.instructionalMaterial.map((M) => (
												<div className="itemCard">
													<h5>Material Type</h5>
													<h6>{M.materialType}</h6>
													<div>
														<h5>Items</h5>
														{M.items
															? M.items.map((I) => <h6>{I.item}</h6>)
															: ""}
													</div>
													<div>
														<h5>Files</h5>
														{M.items
															? M.files.map((F) => (
																	<div className="imgDiv">
																		<img
																			src={F.file}
																			height="200"
																			width="200"
																		/>
																		<h6>{F.name}</h6>
																	</div>
															  ))

															: ""}
													</div>
												</div>
										  ))
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Reference:</h4>
									<div className="itemCard">
										<h5>{newLessonPlan.knowledge.materialReference}</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							2. Skills
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Topics:</h4>
									{newLessonPlan.skills.topics
										? newLessonPlan.skills.topics.map((T) => (
												<div className="itemCard">
													<h5>Topic:</h5> <h6>{T.topic}</h6>
													<h5>Bloom Taxonomy Level:</h5>{" "}
													<h6>{T.bloomTaxonomyLevel}</h6>
													<h5>Standard Criteria Performance:</h5>
													<h6>{T.standardCriteriaPerfomance}</h6>
												</div>
										  ))
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Instructional Material:</h4>
									{newLessonPlan.skills.instructionalMaterial
										? newLessonPlan.skills.instructionalMaterial.map((M) => (
												<div className="itemCard">
													<h5>Material Type</h5>
													<h6>{M.materialType}</h6>
													<div>
														<h5>Items</h5>
														{M.items
															? M.items.map((I) => <h6>{I.item}</h6>)
															: ""}
													</div>
													<div>
														<h5>Files</h5>
														{M.items
															? M.files.map((F) => (
																	<div className="imgDiv">
																		<img
																			src={F.file}
																			height="200"
																			width="200"
																		/>
																		<h6>{F.name}</h6>
																	</div>
															  ))

															: ""}
													</div>
												</div>
										  ))
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Reference:</h4>
									<div className="itemCard">
										<h5>{newLessonPlan.skills.materialReference}</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							3. Attitudes And Values
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Topics:</h4>
									{newLessonPlan.attitudesAndValues.topics
										? newLessonPlan.attitudesAndValues.topics.map((T) => (
												<div className="itemCard">
													<h5>Topic:</h5> <h6>{T.topic}</h6>
													<h5>Bloom Taxonomy Level:</h5>{" "}
													<h6>{T.bloomTaxonomyLevel}</h6>
													<h5>Standard Criteria Performance:</h5>
													<h6>{T.standardCriteriaPerfomance}</h6>
												</div>
										  ))
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Instructional Material:</h4>
									{newLessonPlan.attitudesAndValues.instructionalMaterial
										? newLessonPlan.attitudesAndValues.instructionalMaterial.map(
												(M) => (
													<div className="itemCard">
														<h5>Material Type</h5>
														<h6>{M.materialType}</h6>
														<div>
															<h5>Items</h5>
															{M.items
																? M.items.map((I) => <h6>{I.item}</h6>)
																: ""}
														</div>
														<div>
															<h5>Files</h5>
															{M.items
																? M.files.map((F) => (
																		<div className="imgDiv">
																			<img
																				src={F.file}
																				height="200"
																				width="200"
																			/>
																			<h6>{F.name}</h6>
																		</div>
																  ))

																: ""}
														</div>
													</div>
												)
										  )
										: ""}
								</div>
								<div className="in-card-title">
									<h4>Reference:</h4>
									<div className="itemCard">
										<h5>
											{newLessonPlan.attitudesAndValues.materialReference}
										</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				<div className="titl">
					<h1>Learning Activities</h1>
				</div>
				<Accordion defaultActiveKey="0">
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							1. Introduction
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content</h4>
									<div className="itemCard">
										<h5>Activities</h5>
										{newLessonPlan.activities.introduction.content.activities
											? newLessonPlan.activities.introduction.content.activities.map(
													(C) => (
														<div>
															<h5>activity:</h5>
															<h6>{C.activity}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Other Activities</h5>
										{newLessonPlan.activities.introduction.content
											.otherActivity ? (
											<>
												<h5>activity:</h5>
												<h6>
													{
														newLessonPlan.activities.introduction.content
															.otherActivity
													}
												</h6>
											</>
										) : (
											""
										)}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>

									<div className="itemCard">
										<h5>Issues</h5>
										{newLessonPlan.activities.introduction.crossCuttingIssues
											.issues
											? newLessonPlan.activities.introduction.crossCuttingIssues.issues.map(
													(I) => (
														<div>
															<h5>issue:</h5>
															<h6>{I.issue}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.introduction.crossCuttingIssues
											.omment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.introduction
															.crossCuttingIssues.omment
													}
												</h6>
											</>
										) : (
											""
										)}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div className="itemCard">
										<h5>Competencies</h5>
										{newLessonPlan.activities.introduction.competency
											.competencies
											? newLessonPlan.activities.introduction.competency.competencies.map(
													(C) => (
														<div>
															<h5>competency:</h5>
															<h6>{C.competency}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.introduction.competency
											.comment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.introduction.competency
															.comment
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>

									{newLessonPlan.activities.introduction.exercises.questions
										? newLessonPlan.activities.introduction.exercises.questions.map(
												(Q) => (
													<div className="itemCard">
														<h5>Question</h5>
														<h6>{Q.question}</h6>
														<h5>Type</h5>
														<h6>{Q.questionType}</h6>
														{Q.answer
															? Q.answer.map((A) => (
																	<>
																		<h5>Answer</h5>
																		<h6>{A.answer}</h6>
																	</>
															  ))
															: ""}
													</div>
												)
										  )
										: ""}
									<div></div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							2. Development
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content</h4>
									<div className="itemCard">
										<h5>Activities</h5>
										{newLessonPlan.activities.development.content.activities
											? newLessonPlan.activities.development.content.activities.map(
													(C) => (
														<div>
															<h5>activity:</h5>
															<h6>{C.activity}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Other Activities</h5>
										{newLessonPlan.activities.development.content
											.otherActivity ? (
											<>
												<h5>activity:</h5>
												<h6>
													{
														newLessonPlan.activities.development.content
															.otherActivity
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>
									<div className="itemCard">
										<h5>Issues</h5>
										{newLessonPlan.activities.development.crossCuttingIssues
											.issues
											? newLessonPlan.activities.development.crossCuttingIssues.issues.map(
													(I) => (
														<div>
															<h5>issue:</h5>
															<h6>{I.issue}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.development.crossCuttingIssues
											.omment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.development
															.crossCuttingIssues.omment
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div className="itemCard">
										<h5>Competencies</h5>
										{newLessonPlan.activities.development.competency
											.competencies
											? newLessonPlan.activities.development.competency.competencies.map(
													(C) => (
														<div>
															<h5>competency:</h5>
															<h6>{C.competency}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.development.competency.comment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.development.competency
															.comment
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>
									{newLessonPlan.activities.development.exercises.questions
										? newLessonPlan.activities.development.exercises.questions.map(
												(Q) => (
													<div className="itemCard">
														<h5>Question</h5>
														<h6>{Q.question}</h6>
														<h5>Type</h5>
														<h6>{Q.questionType}</h6>
														{Q.answer
															? Q.answer.map((A) => (
																	<>
																		<h5>Answer</h5>
																		<h6>{A.answer}</h6>
																	</>
															  ))
															: ""}
													</div>
												)
										  )
										: ""}
									<div></div>n
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							3. Conclusion
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content</h4>
									<div className="itemCard">
										<h5>Activities</h5>
										{newLessonPlan.activities.conclusion.content.activities
											? newLessonPlan.activities.conclusion.content.activities.map(
													(C) => (
														<div>
															<h5>activity:</h5>
															<h6>{C.activity}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Other Activities</h5>
										{newLessonPlan.activities.conclusion.content
											.otherActivity ? (
											<>
												<h5>activity:</h5>
												<h6>
													{
														newLessonPlan.activities.conclusion.content
															.otherActivity
													}
												</h6>
											</>
										) : (
											""
										)}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>
									<div className="itemCard">
										<h5>Issues</h5>
										{newLessonPlan.activities.conclusion.crossCuttingIssues
											.issues
											? newLessonPlan.activities.conclusion.crossCuttingIssues.issues.map(
													(I) => (
														<div>
															<h5>issue:</h5>
															<h6>{I.issue}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.conclusion.crossCuttingIssues
											.omment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.conclusion
															.crossCuttingIssues.omment
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div className="itemCard">
										<h5>Competencies</h5>
										{newLessonPlan.activities.conclusion.competency.competencies
											? newLessonPlan.activities.conclusion.competency.competencies.map(
													(C) => (
														<div>
															<h5>competency:</h5>
															<h6>{C.competency}</h6>
														</div>
													)
											  )
											: ""}
									</div>
									<div className="itemCard">
										<h5>Comment</h5>
										{newLessonPlan.activities.conclusion.competency.comment ? (
											<>
												<h6>
													{
														newLessonPlan.activities.conclusion.competency
															.comment
													}
												</h6>
											</>
										) : (
											""
										)}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>
									{newLessonPlan.activities.conclusion.exercises.questions
										? newLessonPlan.activities.conclusion.exercises.questions.map(
												(Q) => (
													<div className="itemCard">
														<h5>Question</h5>
														<h6>{Q.question}</h6>
														<h5>Type</h5>
														<h6>{Q.questionType}</h6>
														{Q.answer
															? Q.answer.map((A) => (
																	<>
																		<h5>Answer</h5>
																		<h6>{A.answer}</h6>
																	</>
															  ))
															: ""}
													</div>
												)
										  )
										: ""}
									<div></div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
				<div className="titl">
					<h1>Teaching Techniques</h1>
				</div>
				<Accordion defaultActiveKey="0">
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							1. Introduction:{" "}
							{newLessonPlan.teachingTechniques.introduction.duration} min

						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction.contentFocus
											? newLessonPlan.teachingTechniques.introduction.contentFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction
											.interactiveFocus
											? newLessonPlan.teachingTechniques.introduction.interactiveFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>

									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction
											.criticalThinking
											? newLessonPlan.teachingTechniques.introduction.criticalThinking.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction.production
											? newLessonPlan.teachingTechniques.introduction.production.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>

									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction
											.problemSolving
											? newLessonPlan.teachingTechniques.introduction.problemSolving.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}

									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction.reflection
											? newLessonPlan.teachingTechniques.introduction.reflection.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.introduction
											.sittingArrangement
											? newLessonPlan.teachingTechniques.introduction.sittingArrangement.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							2. Development:{" "}
							{newLessonPlan.teachingTechniques.development.duration} min
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development.contentFocus
											? newLessonPlan.teachingTechniques.development.contentFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development
											.interactiveFocus
											? newLessonPlan.teachingTechniques.development.interactiveFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development
											.criticalThinking
											? newLessonPlan.teachingTechniques.development.criticalThinking.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development.production
											? newLessonPlan.teachingTechniques.development.production.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development.problemSolving
											? newLessonPlan.teachingTechniques.development.problemSolving.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development.reflection
											? newLessonPlan.teachingTechniques.development.reflection.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.development
											.sittingArrangement
											? newLessonPlan.teachingTechniques.development.sittingArrangement.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							3. Conlusion:{" "}
							{newLessonPlan.teachingTechniques.conclusion.duration} min
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion.contentFocus
											? newLessonPlan.teachingTechniques.conclusion.contentFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion
											.interactiveFocus
											? newLessonPlan.teachingTechniques.conclusion.interactiveFocus.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion
											.criticalThinking
											? newLessonPlan.teachingTechniques.conclusion.criticalThinking.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion.production
											? newLessonPlan.teachingTechniques.conclusion.production.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion.problemSolving
											? newLessonPlan.teachingTechniques.conclusion.problemSolving.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion.reflection
											? newLessonPlan.teachingTechniques.conclusion.reflection.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div className="itemCard">
										<h5>Content</h5>
										{newLessonPlan.teachingTechniques.conclusion
											.sittingArrangement
											? newLessonPlan.teachingTechniques.conclusion.sittingArrangement.map(
													(cf) => <h6>{cf.item}</h6>
											  )
											: ""}
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>

				<button
					className="backButton"
					onClick={() => {
						go("review");
					}}
				>
					Back
				</button>
			</div>

			<Popup
				title="Lesson Plan"
				print={true}
				//openPopup={openPopup}
				//setOpenPopup={setOpenPopup}
			>
				popup
				{/* <PrintlessonPlan recordForEdit={recordForEdit} /> */}
			</Popup>
		</>
	);
};

export default LessonReview;
