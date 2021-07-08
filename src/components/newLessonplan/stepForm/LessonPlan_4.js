import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { TechniquesIntro } from "../forms/TechniquesIntro";
import { TechniquesDev } from "../forms/TechniquesDev";
import { TechniquesConc } from "../forms/TechniquesConc";
import { useSelector, useDispatch } from "react-redux";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";
import Alert from "@material-ui/lab/Alert";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import CloseIcon from "@material-ui/icons/Close";

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

export const LessonPlan_4 = ({ formData, setForm, navigation }) => {
	const { newLessonPlan } = useSelector((state) => state);
	console.log("LAST STEP DATA:", newLessonPlan);
	const dispatchLesson = useDispatch();
	const [key, setKey] = React.useState("techniquesIntro");
  const [open, setOpen] = useState(false);
	const classes = useStyles();
	const introDuration = newLessonPlan.teachingTechniques.introduction.duration;
	const devDuration = newLessonPlan.teachingTechniques.development.duration;
	const concDuration = newLessonPlan.teachingTechniques.conclusion.duration;

	const moveToNext = () => {
		if (key === "techniquesIntro") setKey("techniquesDev");
		else if (key === "techniquesDev") setKey("techniquesConc");
	};

	const validateIntro = () => {
		if (introDuration === 0) {
			setOpen(true);
			return;
		} else {
			moveToNext();
		}
	};

	const validateDev = () => {
		if (devDuration.duration === 0) {
			setOpen(true);
			return;
		} else {
			moveToNext();
		}
	};

	const validateConc = () => {
		if (concDuration === 0) {
			setOpen(true);
			return;
		} else {
			navigation.next();
		}
	};

	return (
		<Container maxWidth="xs">
			<div className="slide3-container">
				<h5>Teaching Techniques</h5>
				<Tabs
					fill={true}
					id="controlled-tab-example"
					activeKey={key}
					onSelect={(k) => setKey(k)}
				>
					<Tab eventKey="techniquesIntro" title="Introduction" fill={true}>
						<TechniquesIntro newLessonPlan={newLessonPlan} />
              <Button block onClick={validateIntro}>
							Next
						</Button>
						<div className={classes.root}>
							<Collapse in={open}>
								<Alert
									severity="error"
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
									Enter Introduction Duration
								</Alert>
							</Collapse>
						</div>
					</Tab>
					<Tab eventKey="techniquesDev" title="Development" fill={true}>
						<TechniquesDev newLessonPlan={newLessonPlan} />
						<Button block onClick={validateDev}>
							Next
						</Button>
						<div className={classes.root}>
							<Collapse in={open}>
								<Alert
									severity="error"
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
									Enter Development Duration
								</Alert>
							</Collapse>
						</div>
					</Tab>
					<Tab eventKey="techniquesConc" title="Conclusion" fill={true}>
						<TechniquesConc newLessonPlan={newLessonPlan} />
					</Tab>
				</Tabs>
			</div>
			<div style={{ marginTop: "1rem" }}>
				{key === "techniquesConc" ? (
           <>
						<Button block onClick={validateConc}>
							Next
						</Button>
						<div className={classes.root}>
							<Collapse in={open}>
								<Alert
									severity="error"
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
									Enter Conclusion Duration
								</Alert>
							</Collapse>
						</div>
					</>
				) : (
					""
				)}
			</div>
		</Container>
	);
};
