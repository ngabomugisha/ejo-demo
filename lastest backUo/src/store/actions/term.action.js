import { HANDLE_FETCH_TERM, HANDLE_FETCH_TERM_SUCCESS, HANDLE_FETCH_TERM_FAIL, HANDLE_UPDATE_TERM, HANDLE_UPDATE_TERM_SUCCESS } from '../types';
import https from '../../helpers/https';


export const handleFetchTerms = () => async (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_TERM,
  });
  try {
    const res = await https.get(`/terms`, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
    dispatch({
      type: HANDLE_FETCH_TERM_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HANDLE_FETCH_TERM_FAIL,
      payload: error,
    });
  }
}

export const handleUpdateTerm = (id,data) => async (dispatch) => {
  dispatch({
    type: HANDLE_UPDATE_TERM,
  });

  console.log('ID : ', id)
  
  try{
  const res = await https.put(`/terms/${id}`, data, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
  console.log('this is res', res);
  dispatch({
    type: HANDLE_UPDATE_TERM_SUCCESS,
    payload: res.data
  });
} catch (err) {
  console.log('ERRROOOORRRR:',err)
}
}