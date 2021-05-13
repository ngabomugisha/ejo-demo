import { HANDLE_FETCH_LEAVE, HANDLE_FETCH_LEAVE_SUCCESS, HANDLE_FETCH_LEAVE_FAIL, HANDLE_UPDATE_LEAVE, HANDLE_UPDATE_LEAVE_SUCCESS } from '../types';
import https from '../../helpers/https';


export const handleFetchLeave = (school) => async (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LEAVE,
  });
  try {
    const res = await https.get(`/leaves/teacher-leaves/${school}/school-teacher-leaves`, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
    dispatch({
      type: HANDLE_FETCH_LEAVE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HANDLE_FETCH_LEAVE_FAIL,
      payload: error,
    });
  }
}

export const handleUpdateLeave = (id,data) => async (dispatch) => {
  console.log('[[[[[[[[[[[[',id,data,"]]]]]]]]]]]]]]]]]")
  dispatch({
    type: HANDLE_UPDATE_LEAVE,
  });

  console.log('ID : ', id)
  
  try{
  const res = await https.put(`leaves/teacher-leaves/${id}`, data, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
  // console.log('this is res', res);
  dispatch({
    type: HANDLE_UPDATE_LEAVE_SUCCESS,
    payload: res.data
  });
} catch (err) {
  console.log('ERRROOOORRRR:',err)
}
}