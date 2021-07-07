import React, { useEffect, useState } from "react";
import _ from "lodash";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import { Checkbox, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";
import { FormControlLabel } from "@material-ui/core";
import { Modal } from "react-bootstrap";
import { Button } from "react-bootstrap";

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
	select: {
		backgroundColor: "#ff0",
	},
}));

const inputs = {
	Prints: ["Textbooks", "Pamphlets", "Handouts", "Study guides", "Manuals"],
	Audio: ["CD", "USB"],
	Visual: ["Charts", "Real Objects", "Photographs", "Transparencies"],
	"Audio-Visual": [
		"Slides",
		"Tapes",
		"Films",
		"Filmstrips",
		"Television",
		"Video",
		"Multimedia",
	],
	"Electronic Interactives": [
		"Interactives",
		"Computers",
		"Calculator",
		"Tablets",
	],
};

export const AttitudeForm = () => {
	const { newLessonPlan } = useSelector((state) => state); // get data from the store
	const dispatchLesson = useDispatch();
	const classes = useStyles();

	const [units, setUnits] = useState(null);
	const [materialReference, setMaterialReference] = useState("");
	const [allData, setAllData] = useState({});

	/**----------------------needed data will be stored here-------------------------- */
	const thisFormData = {
		attitudesAndValues: {},
	};

	const assignStatevalues = (newLessonPlan, thisformData) => {
		newLessonPlan.attitudesAndValues = thisformData.attitudesAndValues;
	};

	/**----------------------CREATE TOPICS-------------------------------------- */
	const [topics, setTopics] = useState([
		{
			id: uuidv4(),
			topic: "",
			bloomTaxonomyLevel: "",
			standardCriteriaPerfomance: "",
			custom: false,
		},
	]); // array of topics

	const [topic, setTopic] = useState("");
	const handleSaveTopic = (id, e) => {
		const { name, value } = e.target;
		setTopic(value);
		topics.map((input) => {
			if (input.id === id) {
				input[name] = value;
				return input;
			}
		});
	};

	const handleAddTopic = () => {
		setTopics([
			...topics,
			{
				id: uuidv4(),
				topic: "",
				bloomTaxonomyLevel: "",
				standardCriteriaPerfomance: "",
				custom: false,
			},
		]);
	};

	const handleDeleteTopic = (id) => {
		const newTopics = topics.filter((t) => t.id !== id);
		setTopics(newTopics);
	};

	/**---------------------CUSTOM KNOWLEDGE-------------------------------------- */
	const [newTopic, setnewTopic] = useState("");
	const [newBloomTaxonomy, setnewBloomTaxonomy] = useState("");
	const [newStandardCriteria, setnewStandardCriteria] = useState(0);

	const [show, setShow] = useState(false);

	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	const addNewAttitude = () => {
		setTopics([
			...topics,
			{
				id: uuidv4(),
				topic: newTopic,
				bloomTaxonomyLevel: newBloomTaxonomy,
				standardCriteriaPerfomance: newStandardCriteria,
				custom: true,
			},
		]);

		handleClose();
	};

	/**-------------------CREATE INSTRUCTIONAL MATERIAL---------------------------- */
	const [instructionalMaterial, setInstructionalMaterial] = useState([
		{
			id: uuidv4(),
			materialType: "",
			items: [],
			files: [],
		},
	]);
	const [materialType, setMaterialType] = useState("");
	const [items, setItems] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);

	const handleItems = (id, e) => {
		instructionalMaterial.map((input) => {
			if (input.id === id) {
				if (e.target.checked) {
					input.items = [...input.items, { item: e.target.value }];
				} else {
					input.items = input.items.filter((i) => i.item !== e.target.value);
					//setItems(newItems);
				}

				return input;
			}
		});
	};

	const handleFileChange = (id, e) => {
		const file = e.target.files[0];
		setUploadFiles([...uploadFiles, file]);
		console.log("SPECIAL TEST", id);
		console.log("SPECIAL TEST", instructionalMaterial);

		instructionalMaterial.map((input) => {
			if (input.id === id) {
				input.files = [...input.files, file];
				return input;
			}
		});
	};

	const handleDeleteFile = (id, name) => {
		instructionalMaterial.map((material) => {
			if (material.id === id) {
				material.files = material.files.filter((f) => f.name !== name);
				setUploadFiles(material.files);
				return material.files;
			}
		});
	};

	const handleSaveInstructionalMaterial = (id, e) => {
		const { name, value } = e.target;
		setMaterialType(value);
		instructionalMaterial.map((material) => {
			if (material.id === id) {
				material[name] = value;
				return material;
			}
		});
	};

	const addInstructionalMaterial = () => {
		setInstructionalMaterial([
			...instructionalMaterial,
			{
				id: uuidv4(),
				materialType: "",
				items: [],
				files: [],
			},
		]);

		setMaterialType("");
		setItems([]);
		setUploadFiles([]);
	};

	const handleDeleteMaterials = (id) => {
		const newMaterials = instructionalMaterial.filter((m) => m.id !== id);
		setInstructionalMaterial(newMaterials);
	};

	/**----------------------CREATE MATERIAL REFERENCE---------------------------------- */

	const handleChange = (e) => {
		setMaterialReference(e.target.value);
	};

	/**-----------------USE EFFECTS-------------------------- */

	//set data
	useEffect(() => {
		setAllData({ topics, instructionalMaterial, materialReference });
	}, [topics, instructionalMaterial, materialReference]);

	// //set instructional material
	// useEffect(() => {
	// 	setAllData({ ...allData, instructionalMaterial });
	// }, [instructionalMaterial]);

	// //set material reference
	// useEffect(() => {
	// 	setAllData({ ...allData, otherMaterialsAndReferences: materialReference });
	// }, [materialReference]);

	// fetch units
	useEffect(() => {
		function fetchUnit() {
			const req = https
				.get(`/lessons/unit-plans/${newLessonPlan.unit}`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					setUnits(res.data.content.knowledgeAndUnderstanding);
				})
				.catch(function (err) {
					console.log(err);
				});
			return req;
		}
		fetchUnit();
	}, []);

	// assign values and dispatch to store
	useEffect(() => {
		thisFormData.attitudesAndValues = allData;
		assignStatevalues(newLessonPlan, thisFormData);
		dispatchLesson(setNewLessonplan(newLessonPlan));
	}, [allData]);

	return (
		<>
			<div className="knowledge-container">
				{topics
					? topics.map((input) => (
							<>
								<div className="knowledge-container-2">
									{input.custom ? (
										<div className="field">
											<TextField
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={input.topic}
												onChange={(e) => {
													handleSaveTopic(input.id, e);
												}}
												label="Select Attitude"
												color="primary"
												name="topic"
												type="text"
												fullWidth
												variant="outlined"
												InputLabelProps={{
													shrink: true,
												}}
											></TextField>
										</div>
									) : (
										<div className="field">
											<TextField
												labelId="demo-simple-select-outlined-label"
												id="demo-simple-select-outlined"
												value={input.topic}
												onChange={(e) => {
													handleSaveTopic(input.id, e);
												}}
												label="Select Attitude"
												color="primary"
												name="topic"
												type="text"
												fullWidth
												variant="outlined"
												select
												InputLabelProps={{
													shrink: true,
												}}
											>
												<MenuItem value="">
													<em>None</em>
												</MenuItem>
												{units &&
													units.map((item) => (
														<MenuItem key={item._id} value={item.topic}>
															<div className="menu-option">
																<h3>{item.topic}</h3>
																<p>
																	<i>
																		{item.bloomTaxonomy &&
																			`Bloom Taxonomy :${item.bloomTaxonomy}`}
																	</i>
																</p>
																<p>
																	<i>
																		{item.standardCriteriaPerfomance &&
																			`Standard Criteria Perfomance :${item.standardCriteriaPerfomance}`}
																	</i>
																</p>
																<p>
																	<i>
																		{item.numberOftimesTaught >= 0 &&
																			`Number of times taught :${item.numberOftimesTaught}`}
																	</i>
																</p>
																{item.files.length > 0 &&
																	item.files.map((im) => {
																		let imgurl = {
																			uri: `https://ejo-education.herokuapp.com\\${im.file}`,
																		};
																		return (
																			<img
																				className="knowledge-img"
																				src={imgurl.uri}
																			/>
																		);
																	})}
															</div>
														</MenuItem>
													))}
											</TextField>
										</div>
									)}

									<div className="field">
										<TextField
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={input.bloomTaxonomyLevel}
											name="bloomTaxonomyLevel"
											onChange={(e) => {
												handleSaveTopic(input.id, e);
											}}
											label="Cognitive Domain Level"
											type="text"
											fullWidth
											variant="outlined"
											select
											InputLabelProps={{
												shrink: true,
											}}
										>
											<MenuItem value="ANALYZING">Analyzing</MenuItem>
											<MenuItem value="EVALUATING">Evaluating</MenuItem>
											<MenuItem value="CREATING">Creating</MenuItem>
										</TextField>
									</div>
									<div className="field">
										<TextField
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											name="standardCriteriaPerfomance"
											value={input.standardCriteriaPerfomance}
											onChange={(e) => {
												handleSaveTopic(input.id, e);
											}}
											label="Standard Criteria Performance"
											type="text"
											fullWidth
											variant="outlined"
											select
											InputLabelProps={{
												shrink: true,
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											<MenuItem value={10}>10</MenuItem>
											<MenuItem value={20}>20</MenuItem>
											<MenuItem value={30}>30</MenuItem>
											<MenuItem value={40}>40</MenuItem>
											<MenuItem value={50}>50</MenuItem>
											<MenuItem value={60}>60</MenuItem>
											<MenuItem value={70}>70</MenuItem>
											<MenuItem value={80}>80</MenuItem>
											<MenuItem value={90}>90</MenuItem>
											<MenuItem value={100}>100</MenuItem>
										</TextField>
									</div>
									<ProgressBar
										now={input.standardCriteriaPerfomance}
										label={`${input.standardCriteriaPerfomance}%`}
									/>
									<div className="delete-btn">
										{topics.length > 1 ? (
											<button
												style={{ color: "red" }}
												onClick={() => handleDeleteTopic(input.id)}
												className="check-btn-3"
											>
												<RiDeleteBin6Line />
											</button>
										) : (
											""
										)}
									</div>
								</div>
							</>
					  ))
					: ""}

				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button onClick={handleShow} className="check-btn">
						Add Attitude
					</button>
					<Modal
						show={show}
						backdrop="static"
						keyboard={false}
						scrollable
						size="lg"
					>
						<Modal.Header>
							<Modal.Title id="contained-modal-title-vcenter">
								Add Custom Attitude
							</Modal.Title>
						</Modal.Header>
						<Modal.Body>
							<div className="knowledge-container-2">
								<div className="field">
									<TextField
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value={newTopic}
										onChange={(e) => setnewTopic(e.target.value)}
										label="Select Attitude"
										color="primary"
										name="topic"
										type="text"
										fullWidth
										variant="outlined"
										InputLabelProps={{
											shrink: true,
										}}
									></TextField>
								</div>

								<div className="field">
									<TextField
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										value={newBloomTaxonomy}
										name="bloomTaxonomyLevel"
										onChange={(e) => setnewBloomTaxonomy(e.target.value)}
										label="Cognitive Domain Level"
										type="text"
										fullWidth
										variant="outlined"
										select
										InputLabelProps={{
											shrink: true,
										}}
									>
										<MenuItem value="ANALYZING">Analyzing</MenuItem>
										<MenuItem value="EVALUATING">Evaluating</MenuItem>
										<MenuItem value="CREATING">Creating</MenuItem>
									</TextField>
								</div>

								<div className="field">
									<TextField
										labelId="demo-simple-select-outlined-label"
										id="demo-simple-select-outlined"
										name="standardCriteriaPerfomance"
										value={newStandardCriteria}
										onChange={(e) => setnewStandardCriteria(e.target.value)}
										label="Standard Criteria Performance"
										type="text"
										fullWidth
										variant="outlined"
										select
										InputLabelProps={{
											shrink: true,
										}}
									>
										<MenuItem value="">
											<em>None</em>
										</MenuItem>
										<MenuItem value={10}>10</MenuItem>
										<MenuItem value={20}>20</MenuItem>
										<MenuItem value={30}>30</MenuItem>
										<MenuItem value={40}>40</MenuItem>
										<MenuItem value={50}>50</MenuItem>
										<MenuItem value={60}>60</MenuItem>
										<MenuItem value={70}>70</MenuItem>
										<MenuItem value={80}>80</MenuItem>
										<MenuItem value={90}>90</MenuItem>
										<MenuItem value={100}>100</MenuItem>
									</TextField>
								</div>
								<ProgressBar
									now={newStandardCriteria}
									label={`${newStandardCriteria}%`}
								/>
							</div>
						</Modal.Body>
						<Modal.Footer>
							<Button onClick={addNewAttitude}>Add</Button>
							<Button onClick={handleClose}>Cancel</Button>
						</Modal.Footer>
					</Modal>
					<button onClick={handleAddTopic} className="check-btn">
						Select Attitude
					</button>
				</div>

				{instructionalMaterial
					? instructionalMaterial.map((material) => (
							<>
								<div className="knowledge-container-3">
									<div className="topic">
										<TextField
											labelId="demo-simple-select-outlined-label"
											id="demo-simple-select-outlined"
											value={material.materialType}
											onChange={(e) =>
												handleSaveInstructionalMaterial(material.id, e)
											}
											label="Instruction Material Type"
											name="materialType"
											type="text"
											fullWidth
											variant="outlined"
											select
											InputLabelProps={{
												shrink: true,
											}}
										>
											<MenuItem value="">
												<em>None</em>
											</MenuItem>
											{Object.keys(inputs).map((input) => {
												return <MenuItem value={input}>{input}</MenuItem>;
											})}
										</TextField>
									</div>
									{material.materialType
										? inputs[material.materialType].map((input) => {
												return (
													<div className="forCheckBox">
														<FormControlLabel
															value={input}
															control={
																<Checkbox
																	color="primary"
																	name="exercises"
																	onChange={(e) => handleItems(material.id, e)}
																/>
															}
															label={input}
															labelPlacement="start"
															style={{
																display: "flex",
																justifyContent: "space-between",
															}}
														/>
													</div>
												);
										  })
										: null}
									<div>
										<input
											className={classes.input}
											id={`contained-button-file${material.id}`}
											onChange={(e) => {
												console.log("si ngiyi", material.id);
												handleFileChange(material.id, e);
											}}
											type="file"
										/>
										<label htmlFor={`contained-button-file${material.id}`}>
											<h7>
												<TiUpload />
												&nbsp; Upload Content
											</h7>
										</label>
									</div>

									{material.files ? (
										<div>
											{console.log("we got some files", material.files)}
											{material.files.map((file) => (
												<div className="itemList">
													<div className="fileItem">
														<p>{file.name}</p>
													</div>
													<div>
														<button
															className="deleteFileBtn"
															onClick={() =>
																handleDeleteFile(material.id, file.name)
															}
														>
															<RiDeleteBin6Line />
														</button>
													</div>
												</div>
											))}
										</div>
									) : null}
									<div className="delete-btn">
										{instructionalMaterial.length > 1 ? (
											<button
												style={{ color: "red" }}
												onClick={() => handleDeleteMaterials(material.id)}
												className="check-btn-3"
											>
												<RiDeleteBin6Line />
											</button>
										) : (
											""
										)}
									</div>
								</div>
							</>
					  ))
					: null}

				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button onClick={addInstructionalMaterial} className="check-btn">
						Add Instructional Material
					</button>
				</div>
				<div className="topic">
					<TextField
						variant="outlined"
						name="materialReference"
						onChange={handleChange}
						labelId="demo-simple-select-outlined-label"
						id="demo-simple-select-outlined"
						label="Other Materials and References"
						color="primary"
					/>
				</div>
			</div>
		</>
	);
};

export default AttitudeForm;
