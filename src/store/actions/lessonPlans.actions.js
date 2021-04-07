import { HANDLE_FETCH_LESSONPLANS, HANDLE_FETCH_LESSONPLANS_SUCCESS, HANDLE_FETCH_LESSONPLANS_FAIL } from '../types';
import https from '../../helpers/https';

export const handleFetchLessonPlan = (subject) => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LESSONPLANS,
  });
  return https.get(`/lessons/unit-plans/${subject}/subject-unit-plans`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_LESSONPLANS_SUCCESS,
      payload: res.data,
    });
  });
};