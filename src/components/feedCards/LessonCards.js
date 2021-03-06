import React, { useEffect, useState } from "react";
import "./FeedCards.css";
import https from "../../helpers/https";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { handleFetchLessonPlanSubject } from "../../store/actions/lessonPlans.actions";
import { handleFetchTeacherData } from "../../store/actions/data/teacher.data.actions";
import { useDispatch } from "react-redux";
import LessonCard from "../feedCard/LessonCard";
import { makeStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import { Button, Dialog, TextField, MenuItem } from "@material-ui/core";
import "bootstrap/dist/css/bootstrap.min.css";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
	root: {
		width: "100%",
		"& > * + *": {
			marginTop: theme.spacing(2),
		},
	},
}));

function LessonCards(props) {
	const classes = useStyles();
	const [open, setOpen] = React.useState(false);
	const [openAlert, setOpenAlert] = React.useState(false);
	const [show, setShow] = useState(false);

	const handleClick = () => {
		setOpenAlert(true);
	};

	const handleCloseAlert = (event, reason) => {
		if (reason === "clickaway") {
			return;
		}

		setOpenAlert(false);
	};

	const [fetchedPlans, setFetchedPlans] = useState(props.lesss);
	const dispatch = useDispatch();
	const [subjects, setSubjects] = React.useState("");
	const [sublist, setSublist] = useState(null);
	let expected = 0;
	let covered = 0;
	const teacher =
		props.state.auth && props.state.auth.user && props.state.auth.user._id;
	const history = useHistory();
	const [DATA, setDATA] = useState(null);
	const [classs, setClasss] = React.useState(null);
	const [unique, setUnique] = React.useState(null);
	const [clas, setClas] = React.useState(null);
	const [subject, setSubject] = React.useState(null);
	const [sub, setSub] = React.useState(null);
	const [topic, setTopic] = React.useState(null);
	const [top, setTop] = React.useState(null);
	const [subTopic, setSubTopic] = React.useState(null);
	const [subTop, setSubTop] = React.useState(null);
	const [unit, setUnit] = useState(null);
	const [uni, setUni] = useState(null);
	const [page, setPage] = useState(null);
	const [SELECTED, setSELECTED] = useState(null);
	const [cover, setCover] = useState(null);

	const initValue = {
		class: "",
		subject: "",
		topic: "",
		subtopic: "",
		unit: "",
	};

	const handleClickOpen = () => {
		setOpen(true);
	};

	const handleCloseFetch = () => {};

	const handleClose = () => {
		props.handleFetchLessonPlanSubject(sub, clas);
		setOpen(false);
	};

	const fetchClasses = async () => {
		const req = await https
			.get(`/class-teachers/${teacher}/teacher-classes`, {
				headers: { Authorization: `Basic ${localStorage.token}` },
			})
			.then((res) => {
				setClasss(res.data);
			})
			.catch(function (err) {
				console.log(err, "***********ERRRORR***********");
			});
		return req;
	};

	const onSubmit = (values) => {
		alert(JSON.stringify(values));
	};

	const handleChange = (e) => {
		if (e.target.name === "class") {
			setClas(e.target.value);
			setSublist(classs.filter((el) => el.class._id === e.target.value));
		}

		if (e.target.name === "subject") {
			setSub(e.target.value);
			// if(sub && clas)
			// props.handleFetchLessonPlanSubject(sub,clas)
		}

		if (e.target.name === "topic") setTop(e.target.value);

		if (e.target.name === "subTopic") setSubTop(e.target.value);

		if (e.target.name === "unit") {
			setUni(e.target.value);
		}
	};

	useEffect(() => {
		async function fetchUnit() {
			const req = await https
				.get(`/lessons/units/${subTop}/subTopic-units`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					setUnit(res.data);
				})
				.catch(function (err) {
					console.log(err);
				});
			return req;
		}
		fetchUnit();
	}, [subTop]);
	useEffect(() => {
		async function fetchSupTop() {
			const req = await https
				.get(`/lessons/subtopics/${top}/topic-subTopics`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					setSubTopic(res.data);
				})
				.catch(function (err) {
					console.log(err);
				});
			return req;
		}
		fetchSupTop();
	}, [top]);
	useEffect(() => {
		async function fetchTopic() {
			const req = await https
				.get(`/lessons/topics/${sub}/subject-topics`, {
					headers: { Authorization: `Basic ${localStorage.token}` },
				})
				.then((res) => {
					setTopic(res.data);
				})
				.catch(function (err) {
					console.log(err);
				});
			return req;
		}
		fetchTopic();
	}, [sub]);
	useEffect(() => {
		classs != null &&
			setUnique(
				classs.reduce((acc, current) => {
					const x = acc.find((item) => item.class._id === current.class._id);
					if (!x) {
						return acc.concat([current]);
					} else {
						return acc;
					}
				}, [])
			);
	}, [classs]);
	useEffect(() => {
		props.handleFetchTeacherData();
		fetchClasses();
		props.handleFetchTeacherData();
	}, []);

	return (
		<div className="cards">
			<div style={{ display: "flex", justifyContent: "center", color: "red" }}>
				<button className="check-btn" onClick={handleClickOpen}>
					Select Subject Topic Sub-topic Unit
				</button>
				<Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
					<DialogTitle>select All</DialogTitle>
					<DialogContent>
						{/* <Formik initialValues={initValue} onSubmit={onSubmit}>
                  {(formik) => ( */}
						<form>
							<div className="form-field">
								<TextField
									label="Class"
									value={clas}
									name="class"
									variant="outlined"
									type="text"
									fullWidth="true"
									onChange={handleChange}
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value={null}>
										<em>None</em>
									</MenuItem>
									{unique &&
										unique.map((item) => (
											<MenuItem key={item.class._id} value={item.class._id}>
												{!item.class.level ? "" : item.class.level.name}&nbsp;
												{!item
													? ""
													: !item.class
													? ""
													: !item.class.combination
													? ""
													: !item.class.combination
													? ""
													: item.class.combination.name}
												&nbsp;
												{!item
													? ""
													: !item.class
													? ""
													: item.class.label
													? item.class.label
													: ""}
											</MenuItem>
										))}
								</TextField>

								<TextField
									label="Subject"
									value={sub}
									name="subject"
									variant="outlined"
									type="text"
									fullWidth="true"
									onChange={handleChange}
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value={null}>
										<em>None</em>
									</MenuItem>
									{sublist &&
										sublist.map((item) => (
											<MenuItem
												key={item.subject && item.subject._id}
												value={item.subject && item.subject._id}
											>
												{item.subject && item.subject.name}
											</MenuItem>
										))}
								</TextField>

								<TextField
									label="Topic"
									variant="outlined"
									type="text"
									value={top}
									name="topic"
									fullWidth="true"
									onChange={handleChange}
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value={null}>
										<em>None</em>
									</MenuItem>

									{topic &&
										topic.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
								</TextField>

								<TextField
									label="Sub-topic"
									variant="outlined"
									type="text"
									name="subTopic"
									fullWidth="true"
									onChange={handleChange}
									minWidth="xl"
									value={subTop}
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value={null}>
										<em>None</em>
									</MenuItem>
									{subTopic &&
										subTopic.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
								</TextField>

								<TextField
									label="Unit"
									variant="outlined"
									type="text"
									fullWidth="true"
									name="unit"
									value={uni}
									minWidth="xl"
									onChange={handleChange}
									select
									InputLabelProps={{
										shrink: true,
									}}
								>
									<MenuItem value={null}>
										<em>None</em>
									</MenuItem>
									{unit &&
										unit.map((item) => (
											<MenuItem key={item._id} value={item._id}>
												{item.name}
											</MenuItem>
										))}
								</TextField>
							</div>
						</form>
						{/* )}
                </Formik> */}
					</DialogContent>
					<DialogActions>
						{/* <Button onClick={handleClose} color="primary">
              Cancel
                </Button> */}
						<Button onClick={handleClose} color="primary">
							Ok
						</Button>
					</DialogActions>
				</Dialog>
			</div>
			{props.lesss
				? props.lesss
						.sort(function (a, b) {
							var timeA = a.time.day; // ignore upper and lowercase
							var timeB = b.time.day; // ignore upper and lowercase
							if (timeA > timeB) {
								return -1;
							}
							if (timeA < timeB) {
								return 1;
							}

							return 0;
						})
						.map((item) => (
							<div className="card">
								<LessonCard
									title={item && item.lessonName}
									details={item && item.keyUnitCompetency}
									tag="Lesson plan"
									link={{ txt: "View More Details", link: "google.com" }}
									size={7}
									covered={item.unit._id}
									time={item.time.day && item.time.day.substring(0, 10)}
									data={item}
								/>
							</div>
						))
				: ""}

			<div className={classes.root}>
				<Snackbar
					open={openAlert}
					autoHideDuration={6000}
					onClose={handleCloseAlert}
				>
					<Alert onClose={handleCloseAlert} severity="info">
						select a 'subject' to get Lesson plans
					</Alert>
				</Snackbar>
			</div>
		</div>
	);
}
function mapStateToProps(state) {
	const lesss = state.lessonPlans.list;
	// const selected = state.teacherstate.teacherData.data ? state.teacherData.data.class : null

	return { lesss, state };
}

const mapDispatchToProps = (dispatch) => ({
	handleFetchTeacherData: () => {
		dispatch(handleFetchTeacherData());
	},
	handleFetchLessonPlanSubject: (sub, classs) => {
		dispatch(handleFetchLessonPlanSubject(sub, classs));
	},
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonCards);
