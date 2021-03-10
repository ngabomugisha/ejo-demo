import { HANDLE_FETCH_ASSIGNMENT, HANDLE_FETCH_ASSIGNMENT_SUCCESS, HANDLE_ADD_ASSIGNMENT, HANDLE_ADD_ASSIGNMENT_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchLessonPlan = (subject) => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_ASSIGNMENT,
  });
  return https.get(`/lessons/plans/${subject}/subject-plan`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  });
};

export const handleAddAssignment = ({name}) => (dispatch) => {
  dispatch({
    type: HANDLE_ADD_ASSIGNMENT,
  });
  return https.post('/lessons/plans',{ headers: {'Authorization' : `Basic ${localStorage.token}` } }, {name}).then((res) => {
    dispatch({
      type: HANDLE_ADD_ASSIGNMENT_SUCCESS,
      payload: res.data,
    });
  });
};
//NOT FINISHED