import { HANDLE_FETCH_LESSONPLANS, HANDLE_FETCH_LESSONPLANS_SUCCESS, HANDLE_FETCH_LESSONPLANS_FAIL } from '../types';
import https from '../../helpers/https';

export const handleFetchLessonPlanUnit = (unitPlan) => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LESSONPLANS,
  });
  return https.get(`/lessons/plans/${unitPlan}/unit-plan`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_LESSONPLANS_SUCCESS,
      payload: res.data,
    });
  });
};

export const handleFetchLessonPlanTopic = (topic) => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LESSONPLANS,
  });
  return https.get(`/lessons/plans/${topic}/topic-details`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_LESSONPLANS_SUCCESS,
      payload: res.data,
    });
  });
};

export const handleFetchLessonPlanSubject = (subject) => (dispatch) => {
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