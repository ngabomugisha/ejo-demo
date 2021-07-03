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

export const KnowledgeForm = () => {
	const { newLessonPlan } = useSelector((state) => state); // get from the store
	const dispatchLesson = useDispatch();
	const classes = useStyles();

	const [units, setUnits] = useState(null);
	const [materialReference, setMaterialReference] = useState("");
	const [allData, setAllData] = useState({});

	/**----------------------needed data will be stored here-------------------------- */
	const thisFormData = {
		knowledge: {},
	};

	const assignStatevalues = (newLessonPlan, thisformData) => {
		newLessonPlan.knowledge = thisformData.knowledge;
	};

	/**----------------------CREATE TOPICS-------------------------------------- */
	const [topics, setTopics] = useState([]); // array of topics
	const [topic, setTopic] = useState("");
	const [bloomTaxonomyLevel, setBloomTaxonomyLevel] = useState("");
	const [standardCriteriaPerfomance, setStandardCriteriaPerfomance] =
		useState(0);
	const [selection, setSelection] = useState(false);

	const toggleSelection = () => {
		setSelection(!selection);
		setTopic("");
	};

	const handleAddTopics = () => {
		if (topic == "" || null) {
			window.alert("enter knowledge first");
			return;
		}
		const topicObject = {
			id: uuidv4(),
			topic: topic,
			bloomTaxonomy: bloomTaxonomyLevel,
			standardCriteriaPerfomance: standardCriteriaPerfomance,
		};
		setTopic("");
		setBloomTaxonomyLevel("");
		setStandardCriteriaPerfomance(0);

		setTopics([...topics, topicObject]);
	};

	const handleDeleteTopic = (id) => {
		const newTopics = topics.filter((t) => t.id !== id);
		setTopics(newTopics);
	};

	/**-------------------CREATE INSTRUCTIONAL MATERIAL---------------------------- */
	const [instructionalMaterial, setInstructionalMaterial] = useState([]);
	const [materialType, setMaterialType] = useState("");
	const [items, setItems] = useState([]);
	const [uploadFiles, setUploadFiles] = useState([]);

	const handleItems = (e) => {
		if (e.target.checked) {
			setItems([...items, { item: e.target.value }]);
		} else {
			const newItems = items.filter((i) => i.item !== e.target.value);
			setItems(newItems);
		}
	};

	const handleFileChange = (e) => {
		_.forEach(e.target.files, (file) => {
			setUploadFiles([...uploadFiles, file]);
		});
	};

	const handleDeleteFile = (name) => {
		const newFiles = uploadFiles.filter((f) => f.name !== name);
		setUploadFiles(newFiles);
	};

	const addInstructionalMaterial = () => {
		const instructionalMaterialObject = {
			id: uuidv4(),
			materialType: materialType,
			items: items,
			files: uploadFiles,
		};

		setMaterialType("");
		setItems([]);
		setUploadFiles([]);

		setInstructionalMaterial([
			...instructionalMaterial,
			instructionalMaterialObject,
		]);
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

	//set topics
	useEffect(() => {
		setAllData({ ...allData, topics });
	}, [topics]);

	//set instructional material
	useEffect(() => {
		setAllData({ ...allData, instructionalMaterial });
	}, [instructionalMaterial]);

	//set material reference
	useEffect(() => {
		setAllData({ ...allData, otherMaterialsAndReferences: materialReference });
	}, [materialReference]);

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
		thisFormData.knowledge = allData;
		assignStatevalues(newLessonPlan, thisFormData);
		dispatchLesson(setNewLessonplan(newLessonPlan));
	}, [allData]);

	return (
		<>
			<div className="knowledge-container">
				<div className="knowledge-container-2">
					{selection == false ? (
						<div className="field">
							<TextField
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={topic}
								onChange={(e) => {
									setTopic(e.target.value);
								}}
								label="Add Custom Knowledge"
								color="primary"
								name="topic"
								type="text"
								fullWidth
								variant="outlined"
								InputLabelProps={{
									shrink: true,
								}}
							/>
							<div className="toggleSelection" onClick={toggleSelection}>
								Or select from existing objects
							</div>
						</div>
					) : (
						<div className="field">
							<TextField
								labelId="demo-simple-select-outlined-label"
								id="demo-simple-select-outlined"
								value={topic}
								onChange={(e) => {
									setTopic(e.target.value);
								}}
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
												{item.files.length > 0 &&
													item.files.map((im) => {
														let imgurl = {
															uri: `https://ejo-education.herokuapp.com\\${im.file}`,
														};
														return (
															<img className="knowledge-img" src={imgurl.uri} />
														);
													})}
											</div>
										</MenuItem>
									))}
							</TextField>
							<div className="toggleSelection" onClick={toggleSelection}>
								Or add custom object
							</div>
						</div>
					)}
					<div className="field">
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={bloomTaxonomyLevel}
							name="bloomTaxonomyLevel"
							onChange={(e) => setBloomTaxonomyLevel(e.target.value)}
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
							value={standardCriteriaPerfomance}
							onChange={(e) => setStandardCriteriaPerfomance(e.target.value)}
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
						now={standardCriteriaPerfomance}
						label={`${standardCriteriaPerfomance}%`}
					/>
				</div>
				{topics
					? topics.map((topic) => {
							return (
								<div className="itemList">
									<div className="itemContent">{topic.topic}</div>
									<div>
										<button
											className="deleteBtn"
											onClick={() => handleDeleteTopic(topic.id)}
										>
											<RiDeleteBin6Line />
										</button>
									</div>
								</div>
							);
					  })
					: null}
				<div style={{ display: "flex", justifyContent: "space-evenly" }}>
					<button onClick={handleAddTopics} className="check-btn">
						Add Knowledge
					</button>
				</div>

				<div className="knowledge-container-3">
					<div className="topic">
						<TextField
							labelId="demo-simple-select-outlined-label"
							id="demo-simple-select-outlined"
							value={materialType}
							onChange={(e) => setMaterialType(e.target.value)}
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
					{materialType
						? inputs[materialType].map((input) => {
								return (
									<div className="forCheckBox">
										<FormControlLabel
											value={input}
											control={
												<Checkbox
													color="primary"
													name="exercises"
													onChange={handleItems}
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
					{uploadFiles ? (
						<div>
							{uploadFiles.map((file) => (
								<div className="itemList">
									<div className="fileItem">
										<p>{file.name}</p>
									</div>
									<div>
										<button
											className="deleteFileBtn"
											onClick={() => handleDeleteFile(file.name)}
										>
											<RiDeleteBin6Line />
										</button>
									</div>
								</div>
							))}
						</div>
					) : null}
				</div>
				{instructionalMaterial ? (
					<div>
						{instructionalMaterial.map((material) => (
							<div className="itemList">
								<div className="itemContent">
									<p>{material.materialType}</p>
									{material.items
										? material.items.map((i) => {
												return <p className="subParagraph">{i.item}</p>;
										  })
										: null}
									{material.files
										? material.files.map((f) => {
												return <p className="subParagraph">{f.name}</p>;
										  })
										: null}
								</div>
								<div>
									<button
										onClick={() => handleDeleteMaterials(material.id)}
										className="deleteBtn"
									>
										<RiDeleteBin6Line />
									</button>
								</div>
							</div>
						))}
					</div>
				) : null}

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

export default KnowledgeForm;
