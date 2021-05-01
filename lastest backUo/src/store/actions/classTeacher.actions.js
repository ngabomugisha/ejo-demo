import * as actions from '../types';
import https from '../../helpers/https';

export const handleFetchClassTeacher = (id) => (dispatch) => {
console.log("HANDLE_FETCH CLASS TEACHER")
  dispatch({
    type: actions.HANDLE_FETCH_CLASS_TEACHER,
  });
  return https.get(`/class-teachers/${id}/teacher-classes`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_CLASS_TEACHER_SUCCESS,
      payload: res.data,
    });
  });
};