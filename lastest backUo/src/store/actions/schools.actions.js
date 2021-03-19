import { HANDLE_FETCH_SCHOOLS, HANDLE_FETCH_SCHOOLS_SUCCESS, HANDLE_ADD_SCHOOL, HANDLE_ADD_SCHOOL_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchSchool = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_SCHOOLS,
  });
  return https.get('/schools',{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_SCHOOLS_SUCCESS,
      payload: res.data,
    });
  });
};

export const handleAddSchool = ({name}) => (dispatch) => {
  dispatch({
    type: HANDLE_ADD_SCHOOL,
  });
  return https.post('/schools', {name}).then((res) => {
    dispatch({
      type: HANDLE_ADD_SCHOOL_SUCCESS,
      payload: res.data,
    });
  });
};
