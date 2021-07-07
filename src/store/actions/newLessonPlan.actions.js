import { HANDLE_SET_NEW_LESSONPLAN } from "../types";

export const setNewLessonplan = (lessonPlan) => {
	return {
		type: HANDLE_SET_NEW_LESSONPLAN,
		payload: lessonPlan,
	};
};
