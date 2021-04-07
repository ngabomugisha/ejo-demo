import * as actions from '../types';
import https from '../../helpers/https';

export const handleFetchTeachers = (school) => (dispatch) => {
  console.log("school in teacher action", school)
  dispatch({
    type: actions.HANDLE_FETCH_TEACHERS,
  });
  
  return https.get(`/auth/${school}/school-employees`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_TEACHERS_SUCCESS,
      payload: res.data,
    });
  });
};


export const handleAddTeacher = data => async dispatch => {
  console.log("DATA TO REGISTER :", data)
  dispatch({
    type: actions.HANDLE_ADD_CLASSES,
  });
  return https.post('/auth/signup', data , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_ADD_CLASSES_SUCCESS,
    payload: res.data,
  });
});
} 


