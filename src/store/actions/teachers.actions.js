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
    type: actions.HANDLE_ADD_TEACHERS,
  });
  return https.post('/auth/signup', data , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_ADD_TEACHERS_SUCCESS,
    payload: res.data,
  });
})
.catch(function(erro){
  dispatch({
    type: actions.HANDLE_ADD_TEACHERS_FAIL,
    payload: erro,
  });
})
} 


export const handleDeleteTeacher = id => async dispatch => {
  console.log("ID TO DELETE:", id)
  dispatch({
    type: actions.HANDLE_DELETE_TEACHERS,
  });
  return https.delete(`/auth/${id}` , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_DELETE_TEACHERS_SUCCESS,
    payload: res.data,
  });
});
}

