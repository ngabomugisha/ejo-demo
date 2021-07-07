import { HANDLE_SET_NEW_LESSONPLAN } from "../types";

const initialState = {
	assignedClass: null,
	unit: null,
	unitPlanId: "60473131fe2fc60c449b5f5b",
	subject: null,
	keyUnitCompetency: null,
	lessonNumber: 0,
	lessonName: null,

	knowledge: {},
	skills: {},
	attitudesAndValues: {},

	activities: {
		introduction: {
			content: {
				activities: [],
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
			exercises: {
				questions: [],
			},
		},
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
			exercises: {
				questions: [],
			},
		},
		conclusion: {
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
			duration: 0,
		},
		development: {
			contentFocus: [],
			interactiveFocus: [],
			criticalThinking: [],
			production: [],
			problemSolving: [],
			reflection: [],
			sitingArrangement: [],
			duration: 0,
		},
		conclusion: {
			contentFocus: [],
			interactiveFocus: [],
			criticalThinking: [],
			production: [],
			problemSolving: [],
			reflection: [],
			sitingArrangement: [],
			duration: 0,
		},
	},
	time: {
		day: new Date(),
		slotOnTimetable: "603159c6191af33cdc989ff0",
	},
};

const newLessonPlanReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case HANDLE_SET_NEW_LESSONPLAN:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
};

export default newLessonPlanReducer;
