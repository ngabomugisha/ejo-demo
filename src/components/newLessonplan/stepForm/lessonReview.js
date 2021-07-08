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
	const { newLessonPlan, topics } = useSelector((state) => state);
	const [isLoading, setIsLoading] = useState(true);
	const classes = useStyles();
	const [subject, setSubject] = useState("");
	const [subjects, setSubjects] = useState(null);
	const [openPopup, setOpenPopup] = useState(false);
	const [openPrintPopup, setOpenPrintPopup] = useState(false);
	const [recordForEdit, setRecordForEdit] = useState(null);

	const handleChange = (event) => {
		setSubject(event.target.value);
	};

	// const openInPopup = () => {
	// 	setRecordForEdit(props.data);
	// 	setOpenPopup(true);
	// };

	console.log("Topics", topics);

	useEffect(() => {
		async function fetchSubjects() {
			const req = await https
				.get(`/lessons/subjects`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					setSubjects(res.data);
				})
				.catch(function (err) {
					console.log(err);
				});
			return req;
		}
		fetchSubjects();
	}, []);

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
			<div className="plan-container">
				<div className="titl">
					<h1>Syllabus</h1>
					<div className="titl2">
						<h4>1. Topic Area:</h4>
						<h5>Topic</h5>
					</div>
					<div className="titl2">
						<h4>2. Sub Topic Area:</h4>
						<h5>Sub Topic</h5>
					</div>
					<div className="titl2">
						<h4>3. Unit:</h4>
						<h5>Unit</h5>
					</div>
					<div className="titl2">
						<h4>4. Unit Competency:</h4>
						<h5>Key Unit Competency</h5>
					</div>
					<div className="titl2">
						<h4>5. Lesson Name:</h4>
						<h5>Lesson Name</h5>
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
															? M.files.map((F) => <h6>{F.name}</h6>)
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
															? M.files.map((F) => <h6>{F.name}</h6>)
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
																? M.files.map((F) => <h6>{F.name}</h6>)
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
									<div>
										<h5>Activities</h5>
									</div>
									<div>
										<h5>Other Activities</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>
									<div>
										<h5>Issues</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div>
										<h5>Competencies</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>
									<div>
										<h5>Question</h5>
										<h5>Type</h5>
										<h5>Answer</h5>
									</div>
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
									<div>
										<h5>Activities</h5>
									</div>
									<div>
										<h5>Other Activities</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>
									<div>
										<h5>Issues</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div>
										<h5>Competencies</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>
									<div>
										<h5>Question</h5>
										<h5>Type</h5>
										<h5>Answer</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							1. Conclusion
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content</h4>
									<div>
										<h5>Activities</h5>
									</div>
									<div>
										<h5>Other Activities</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Cross Cutting Issues</h4>
									<div>
										<h5>Issues</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Competency</h4>
									<div>
										<h5>Competencies</h5>
									</div>
									<div>
										<h5>Comment</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Exercices:</h4>
									<div>
										<h5>Question</h5>
										<h5>Type</h5>
										<h5>Answer</h5>
									</div>
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
							1. Introduction: 10 min
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							2. Development: 40 min
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
					<Card>
						<Accordion.Toggle as={Card.Header} eventKey="0">
							3. Conclusion: 10 min
						</Accordion.Toggle>
						<Accordion.Collapse eventKey="0">
							<Card.Body>
								<div className="in-card-title">
									<h4>Content Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Interactive Focus:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Critical Thinking:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Production:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Problem Solving:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Reflection:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
								<div className="in-card-title">
									<h4>Sitting Arrangement:</h4>
									<div>
										<h5>Content</h5>
									</div>
								</div>
							</Card.Body>
						</Accordion.Collapse>
					</Card>
				</Accordion>
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
