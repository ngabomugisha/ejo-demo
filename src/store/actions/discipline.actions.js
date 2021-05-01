import { HANDLE_FETCH_DISCIPLINE, HANDLE_FETCH_DISCIPLINE_SUCCESS, HANDLE_FETCH_DISCIPLINE_FAIL, HANDLE_UPDATE_DISCIPLINE, HANDLE_UPDATE_DISCIPLINE_SUCCESS } from '../types';
import https from '../../helpers/https';


export const handleFetchDisciplines = () => async (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_DISCIPLINE,
  });
  try {
    const res = await https.get(`/school-discipline`, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
    dispatch({
      type: HANDLE_FETCH_DISCIPLINE_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: HANDLE_FETCH_DISCIPLINE_FAIL,
      payload: error,
    });
  }
}

export const handleUpdateDiscipline = (id,data) => async (dispatch) => {
  dispatch({
    type: HANDLE_UPDATE_DISCIPLINE,
  });

  console.log('ID : ', id)
  
  try{
  const res = await https.put(`/school-discipline/${id}`, data, { headers: { 'Authorization': `Basic ${localStorage.token}` } });
  console.log('this is res', res);
  dispatch({
    type: HANDLE_UPDATE_DISCIPLINE_SUCCESS,
    payload: res.data
  });
} catch (err) {
  console.log('ERRROOOORRRR:',err)
}
}