import { HANDLE_FETCH_STUDENTS, HANDLE_FETCH_STUDENTS_SUCCESS, HANDLE_FETCH_STUDENTS_FAIL } from '../types';
import https from '../../helpers/https';
export const handleFetchStudent = (school) => (dispatch) => {
  console.log("school in student action", school)
  dispatch({
    type: HANDLE_FETCH_STUDENTS,
  });
  return https.get(`/students/${school}/school-students`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_STUDENTS_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: HANDLE_FETCH_STUDENTS_FAIL,
      payload: error,
    });
  })
}

