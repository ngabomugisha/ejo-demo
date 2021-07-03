import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { v4 as uuidv4 } from "uuid";
import img from "../../../assets/img/home.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Checkbox, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import { KnowledgeForm } from "../forms/KnowledgeForm";
import { SkillsForm } from "../forms/SkillsForm";
import { AttitudeForm } from "../forms/AttitudeAndValuesForm";

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

export const LessonPlan_2 = ({ formData, setForm, navigation }) => {
	const classes = useStyles();
	const [choosenMaterial, setChoosenMaterial] = useState(null);
	const [img, setImg] = useState(null);
	const [knowledgePage, setKnowledgePage] = useState({});
	const datagetter = { knowledgePage, setKnowledgePage };

	const [key, setKey] = useState("knowledge");
	const [units, setUnits] = useState(null);
	const [term, setTerm] = React.useState("");
	const [checked, setChecked] = React.useState(true);
	const { knowledge, topics, instructionalMaterial, otherMaterialsReferences } =
		formData;

	const imgSetter = (ob) => {
		setImg(ob);
	};

	const moveToNext = () => {
		if (key === "knowledge") setKey("skills");
		else if (key === "skills") setKey("attitudeAndValue");
	};

	useEffect(() => {
		async function fetchUnit() {
			const req = await https
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
		console.log("[[[[[[[[[[[[", formData, "]]]]]]]]]]]]]");
	}, [formData]);
	return (
		<Container maxWidth="xs">
			<h5>Instructional Objectives</h5>
			<Tabs
				fill={true}
				id="controlled-tab-example"
				activeKey={key}
				onSelect={(k) => setKey(k)}
			>
				<Tab eventKey="knowledge" title="Knowledge" fill={true}>
					<KnowledgeForm />
					<Button block onClick={moveToNext}>
						Next
					</Button>
				</Tab>
				<Tab eventKey="skills" title="Skills" fill={true}>
					<div className="knowledge-container">
						<SkillsForm
							formData={formData}
							setForm={setForm}
							navigation={navigation}
							{...datagetter}
						/>
						<Button block onClick={moveToNext}>
							Next
						</Button>
					</div>
				</Tab>
				<Tab eventKey="attitudeAndValue" title="Attitude and Value" fill={true}>
					<div className="knowledge-container">
						<AttitudeForm
							formData={formData}
							setForm={setForm}
							navigation={navigation}
							{...datagetter}
						/>
					</div>
				</Tab>
			</Tabs>
			<div style={{ marginTop: "1rem" }}>
				{/* <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button> */}
				{key == "attitudeAndValue" ? (
					<Button block onClick={() => navigation.next()}>
						Next
					</Button>
				) : (
					""
				)}
			</div>
		</Container>
	);
};
