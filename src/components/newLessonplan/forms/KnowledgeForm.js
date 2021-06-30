import React, { useEffect, useState } from "react";
import _ from "lodash";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import { makeStyles } from "@material-ui/core/styles";
import MenuItem from "@material-ui/core/MenuItem";
import { connect, useDispatch, useSelector } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { v4 as uuidv4 } from "uuid";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import { Checkbox, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";

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

export const KnowledgeForm = (props) => {
	const { newLessonPlan } = useSelector((state) => state);
	const dispatchLesson = useDispatch();
	const classes = useStyles();
	let collected = {};
	const { formData, setForm, knowledgePage, setKnowledgePage } = props;
	const [inputsKnowledge, setInputsKnowledge] = useState([
		{
			id: uuidv4(),
			topic: "",
			bloomTaxonomyLevel: "",
			standardCriteriaPerfomance: 0,
		},
	]);
	const [uploadsKnowledge, setUploadsKnowledge] = useState([
		{
			id: uuidv4(),
			materialType: "",
			items: [],
		},
	]);
	const [units, setUnits] = useState(null);
	const [materialReference, setMaterialReference] = useState("");
	const [choosenMaterial, setChoosenMaterial] = useState(null);
	const [allData, setAllData] = useState({});

	const [file, setFile] = useState({});
	const [isSelected, setIsSelected] = useState(false);
	const [names, setNames] = useState([]);

	const uploadFiles = [];
	const fileNames = [];

	const thisFormData = {
		knowledge: {},
	};

	const assignStatevalues = (newLessonPlan, formData) => {
		newLessonPlan.knowledge = formData.knowledge;
	};

	const handleChange = (e) => {
		if (e.target.name == "materialReference") {
			setMaterialReference(e.target.value);
			setAllData({ ...allData, materialReference: e.target.value });
		}
	};

	//change for knowledge fields
	const handleChangeInputKnowledge = (id, event) => {
		inputsKnowledge.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});
		setAllData({ ...allData, topics: inputsKnowledge });
	};

	// adding and removing additional content and uploads
	const handleChangeUploads = (id, event) => {
		uploadsKnowledge.map((i) => {
			if (id === i.id) {
				if (event.target.name == "materialType") {
					i[event.target.name] = event.target.value;
				} else {
					if (event.target.checked == true) {
						i.items && i.items.push({ item: event.target.name });
					} else {
						i.items &&
							i.items.splice(
								i.items.findIndex((x) => x.item === event.target.name),
								1
							);
					}
				}
			}
			return i;
		});
		setAllData({ ...allData, instructionalMaterial: uploadsKnowledge });
	};

	const handleAddFields = () => {
		setInputsKnowledge([
			...inputsKnowledge,
			{
				id: uuidv4(),
				topic: "",
				bloomTaxonomyLevel: "",
				standardCriteriaPerfomance: "",
			},
		]);
	};

	const handleAddFieldsUpload = () => {
		setUploadsKnowledge([
			...uploadsKnowledge,
			{
				id: uuidv4(),
				instructionalMaterial: "",
				uploadbtn: "",
				items: [],
			},
		]);
	};

	const handleRemoveInput = (id) => {
		const values = [...inputsKnowledge];
		values.splice(
			values.findIndex((value) => value.id === id),
			1
		);
		setInputsKnowledge(values);
		setAllData({ ...allData, topics: inputsKnowledge });
	};

	const handleRemoveInputUpload = (id) => {
		const values = [...uploadsKnowledge];
		values.splice(
			values.findIndex((value) => value.id === id),
			1
		);
		setUploadsKnowledge(values);
		setAllData({ ...allData, instructionalMaterial: uploadsKnowledge });
	};

	const handleFileChange = (e) => {
		setFile(e.target.files[0]);
		_.forEach(e.target.files, (file) => {
			uploadFiles.push(file);
			fileNames.push(file.name);
		});
		setNames(fileNames);
		allData.instructionalMaterial.files = uploadFiles;
		setIsSelected(true);
	};

	useEffect(() => {
		function fetchUnit() {
			const req = https
				.get(`/lessons/unit-plans/${formData.unit}`, {
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

	useEffect(() => {
		thisFormData.knowledge = allData;
		assignStatevalues(newLessonPlan, thisFormData);
		dispatchLesson(setNewLessonplan(newLessonPlan));
	}, [allData]);

	return (
		<>
			<div className="knowledge-container">
				{/* <h5>Instructional Object</h5> */}
				<p></p>
				{inputsKnowledge.map((input) => (
					<>
						<div className="knowledge-container-2">
							<div className="field">
								<TextField
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={inputsKnowledge.topic}
									onChange={(e) => handleChangeInputKnowledge(input.id, e)}
									label="Select Knowledge"
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
													{/* <img src={}/> */}
													{/* <h3>{JSON.stringify(item)}</h3> */}
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
													{/* {img && <img src={`${process.env.REACT_APP_API_NORMAL}/${img.file}`} />} */}
												</div>
											</MenuItem>
										))}
								</TextField>
							</div>
							<div className="field">
								<TextField
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={inputsKnowledge.bloomTaxonomyLevel}
									name="bloomTaxonomyLevel"
									onChange={(e) => handleChangeInputKnowledge(input.id, e)}
									label="Cognitive Domain Level"
									type="text"
									fullWidth
									variant="outlined"
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value="REMEMBERING">Remembering</MenuItem>
									<MenuItem value="UNDERSTANDING">Understanding</MenuItem>
								</TextField>
							</div>
							<div className="field">
								<TextField
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									name="standardCriteriaPerfomance"
									value={
										input.standardCriteriaPerfomance &&
										input.standardCriteriaPerfomance
									}
									onChange={(e) => handleChangeInputKnowledge(input.id, e)}
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
								{/* <LinearProgress variant="determinate" value={input.standardCriteriaPerfomance} /> */}
							</div>
							<ProgressBar
								now={input.standardCriteriaPerfomance}
								label={`${input.standardCriteriaPerfomance}%`}
							/>
							<div className="delete-btn">
								{inputsKnowledge.length > 1 ? (
									<button
										style={{ color: "red" }}
										onClick={() => handleRemoveInput(input.id)}
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
				))}
				{/* END OF KNOWLEDGE */}

				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button onClick={handleAddFields} className="check-btn">
						New Knowledge
					</button>
					{/* 
              <button className="check-btn-2">
                <PlusOneRoundedIcon />
              </button> */}
				</div>

				{uploadsKnowledge.map((input) => (
					<>
						<div className="knowledge-container-3">
							<div className="topic">
								<TextField
									labelId="demo-simple-select-outlined-label"
									id="demo-simple-select-outlined"
									value={input.materialType}
									onChange={(e) => handleChangeUploads(input.id, e)}
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
									<MenuItem value="Prints">Prints</MenuItem>
									<MenuItem value="Audio">Audio</MenuItem>
									<MenuItem value="Visual">Visual</MenuItem>
									<MenuItem value="Audio visuals">Audio visuals</MenuItem>
									<MenuItem value="Electronic Interactives">
										Electronic Interactives
									</MenuItem>
								</TextField>
							</div>
							{input.materialType == "Prints" ? (
								<div>
									<div className="forCheckBox">
										<p>TextBooks</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="TextBooks"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Pamphlets</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Pamphlets"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Handouts</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Handouts"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Study guides</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="StudyGuides"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Manuals</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Manuals"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
								</div>
							) : input.materialType == "Audio" ? (
								<div>
									<div className="forCheckBox">
										<p>CD</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="CD"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>USB</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="USB"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
								</div>
							) : input.materialType == "Visual" ? (
								<div>
									<div className="forCheckBox">
										<p>Charts</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Charts"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Real Objects</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="realOpjects"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Photographs</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Photographs"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Transparencies</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Transparencies"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
								</div>
							) : input.materialType == "Audio visuals" ? (
								<div>
									<div className="forCheckBox">
										<p>Slides</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Slides"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Tapes</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Tapes"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Films</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Films"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Filmstrips</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Filmstrips"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Television</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Television"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Video</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Video"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Multimedia</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Multimedia"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
								</div>
							) : input.materialType == "Electronic Interactives" ? (
								<div>
									<div className="forCheckBox">
										<p>Interactives</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Interactives"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Computers</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Computers"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Calculator</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Calculator"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
									<div className="forCheckBox">
										<p>Tablets</p>
										<Checkbox
											onChange={(e) => handleChangeUploads(input.id, e)}
											name="Tablets"
											color="primary"
											inputProps={{ "aria-label": "secondary checkbox" }}
										/>
									</div>
								</div>
							) : (
								""
							)}
							<input
								className={classes.input}
								id="contained-button-file"
								multiple
								type="file"
								onChange={(e) => {
									handleFileChange(e);
								}}
							/>
							<label htmlFor="contained-button-file">
								<h7>
									<TiUpload />
									&nbsp; Upload Content
								</h7>
							</label>
							{isSelected ? (
								<div>
									{/* <h5>Files</h5> */}
									{/* {names.map((name) => ( */}
									<p>{file.name}</p>
									{/* ))} */}
								</div>
							) : null}

							<div className="delete-btn">
								{uploadsKnowledge.length <= 1 ? (
									""
								) : (
									<button
										style={{ color: "red" }}
										onClick={() => handleRemoveInputUpload(input.id)}
										className="check-btn-3"
									>
										<RiDeleteBin6Line />
									</button>
								)}
							</div>
						</div>
					</>
				))}
				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button onClick={handleAddFieldsUpload} className="check-btn">
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

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(KnowledgeForm);
