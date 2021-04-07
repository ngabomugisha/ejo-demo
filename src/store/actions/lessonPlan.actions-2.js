import { HANDLE_FETCH_LESSONPLANS, HANDLE_FETCH_LESSONPLANS_SUCCESS, HANDLE_ADD_LESSONPLAN, HANDLE_ADD_LESSONPLAN_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchLessonPlan = (subject) => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LESSONPLANS,
  });
  return https.get(`/lessons/plans/${subject}/subject-plan`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_LESSONPLANS_SUCCESS,
      payload: res.data,
    });
  });
};

export const handleAddLessonPlan = ({name}) => (dispatch) => {
  dispatch({
    type: HANDLE_ADD_LESSONPLAN,
  });
  return https.post('/lessons/plans',{ headers: {'Authorization' : `Basic ${localStorage.token}` } }, {name}).then((res) => {
    dispatch({
      type: HANDLE_ADD_LESSONPLAN_SUCCESS,
      payload: res.data,
    });
  });
};
