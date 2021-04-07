import * as actions from '../types';
import https from '../../helpers/https';


export const handleFetchStudent = (school) => (dispatch) => {
  dispatch({
    type: actions.HANDLE_FETCH_STUDENTS,
  });
  return https.get(`/students/${school}/school-students`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_STUDENTS_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_STUDENTS_FAIL,
      payload: error,
    });
  })
}


export const handleAddStudent = data => async dispatch => {
  console.log("Student TO REGISTER :", data)
  dispatch({
    type: actions.HANDLE_ADD_STUDENTS,
  });
  return https.post('/students/', data , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_ADD_STUDENTS_SUCCESS,
    payload: res.data,
  });
});
} 
