import * as actions from '../types';
import https from '../../helpers/https';

export const handleFetchClasses = (school) => (dispatch) => {
  dispatch({
    type: actions.HANDLE_FETCH_CLASSES,
  });
  return https.get(`/classes/${school}/school-classes`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_CLASSES_SUCCESS,
      payload: res.data,
    });
  });
};




export const handleAddClass = classes => async dispatch => {
  dispatch({
    type: actions.HANDLE_ADD_CLASSES,
  });
  return https.post('/classes', classes , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_ADD_CLASSES_SUCCESS,
    payload: res.data,
  });
});
}

export const handleUpdateClass = argument => async dispatch => {
  dispatch({
    type: actions.HANDLE_UPDATE_CLASSES,
  });
  return https.put(`/classes/${argument.id}`, argument.data , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_UPDATE_CLASSES_SUCCESS,
    payload: res.data,
  });
});
}



export const handleDeleteClass = id => async dispatch => {
  console.log("ID TO DELETE:", id)
  dispatch({
    type: actions.HANDLE_DELETE_CLASSES,
  });
  return https.delete(`/classes/${id}` , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
  dispatch({
    type: actions.HANDLE_DELETE_CLASSES_SUCCESS,
    payload: res.data,
  });
});
}
