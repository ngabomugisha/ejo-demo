import React, { useState, useEffect } from "react";
import "./NewLessonPlan.css";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import PanelLayout from "../Layouts/PanelLayout/Index";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import Slide2 from "./lessonPlanSlide/Slide2";
import Slide1 from "./lessonPlanSlide/Slide1";
import Slide3 from "./lessonPlanSlide/Slide3";
import { useForm, useStep } from "react-hooks-helper";
import { LessonPlan_start } from "./stepForm/LessonPlan_start";
import { LessonPlan_2 } from "./stepForm/LessonPlan_2";
import { LessonPlan_3 } from "./stepForm/LessonPlan_3";
import { LessonPlan_4 } from "./stepForm/LessonPlan_4";
import { Review } from "./stepForm/Review";
import { Submit } from "./stepForm/Submit";
import LessonReview from "./stepForm/lessonReview";

const useStyles = makeStyles({
	root: {
		width: "100%",
	},
});

const defaultData = {
	assignedClass: null,
	unit: null,
	unitPlanId: "60473131fe2fc60c449b5f5b",
	subject: null,
	keyUnitCompetency: null,
	lessonNumber: 0,
	lessonName: null,
	knowledge: {
		topics: [],
		instructionalMaterial: [],
		otherMaterialsAndReferences: null,
	},
	skills: {
		topics: [
			{
				topic: null,
				bloomTaxonomy: null,
				standardCriteriaPerfomance: 0,
			},
		],
		instructionalMaterial: [
			{
				materialType: null,
				items: [
					{
						item: null,
					},
				],
				uploads: [{ file1: null }],
			},
		],
		otherMaterialsAndReferences: null,
	},
	attitudesAndValues: {
		topics: [
			{
				topic: null,
				bloomTaxonomy: null,
				standardCriteriaPerfomance: 80,
			},
		],
		instructionalMaterial: [
			{
				materialType: null,
				items: [
					{
						item: null,
					},
				],
				uploads: [{ file1: null }],
			},
		],
		otherMaterialsAndReferences: null,
	},

	activities: {
		introduction: {
			content: {
				activities: [],
				otherActivity: null,
			},
			crossCuttingIssues: {
				issues: [],
				omment: null,
			},
			competency: {
				competencies: [],
				comment: null,
			},
			exercises: {
				questions: [],
			},
		},
		development: {
			content: {
				activities: [],
				otherActivity: null,
			},
			crossCuttingIssues: {
				issues: [],
				omment: null,
			},
			competency: {
				competencies: [],
				comment: null,
			},
			exercises: {
				questions: [],
			},
		},
		conclusion: {
			content: {
				activities: [],
				otherActivity: null,
			},
			crossCuttingIssues: {
				issues: [],
				omment: null,
			},
			competency: {
				competencies: [],
				comment: null,
			},
			exercises: {
				questions: [],
			},
		},
	},
	teachingTechniques: {
		introduction: {
			contentFocus: [],
			interactiveFocus: [],
			criticalThinking: [],
			production: [],
			problemSolving: [],
			reflection: [],
			sitingArrangement: [],
			duration: 10,
		},
		development: {
			contentFocus: [],
			interactiveFocus: [],
			criticalThinking: [],
			production: [],
			problemSolving: [],
			reflection: [],
			sitingArrangement: [],
			duration: 10,
		},
		conclusion: {
			contentFocus: [],
			interactiveFocus: [],
			criticalThinking: [],
			production: [],
			problemSolving: [],
			reflection: [],
			sitingArrangement: [],
			duration: 10,
		},
	},
	time: {
		day: new Date(),
		slotOnTimetable: "603159c6191af33cdc989ff0",
	},
};

const defaultData2 = {
	firstName: "",
	lastName: "",
	nickName: "",
	address: "",
	city: "",
	state: "",
	zip: "",
	phone: "",
	email: "",
};

const steps = [
	{ id: "names" },
	{ id: "LessonPlan_2" },
	{ id: "LessonPlan_3" },
	{ id: "LessonPlan_4" },
	{ id: "review" },
	{ id: "final" },
	{ id: "submit" },
];

function NewLessonPlan() {
	// const { newLessonPlan } = useSelector((state) => state);
	const [formData, setForm] = useForm(defaultData);
	const { step, navigation } = useStep({
		steps,
		initialStep: 0,
	});

	const props = { formData, setForm, navigation };

	const renderswitch = (id) => {
		switch (id) {
			case "names":
				return <LessonPlan_start {...props} />;
			case "LessonPlan_2":
				return <LessonPlan_2 {...props} />;
			case "LessonPlan_3":
				return <LessonPlan_3 {...props} />;
			case "LessonPlan_4":
				return <LessonPlan_4 {...props} />;
			case "review":
				return <Review {...props} />;
			case "final":
				return <LessonReview {...props} />;
			case "submit":
				return <Submit {...props} />;
		}
	};
	return (
		<>
			<PanelLayout selected={4} role="TEACHER">
				<div className="new-lesson-container">{renderswitch(step.id)}</div>
			</PanelLayout>
		</>
	);
}

const mapStateToProps = (state) => ({
	state: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(NewLessonPlan);
