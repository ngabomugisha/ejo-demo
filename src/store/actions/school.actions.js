import { HANDLE_FETCH_SCHOOLS, HANDLE_FETCH_SCHOOLS_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchSchool = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_SCHOOLS,
  });
  return https.get('/schools').then((res) => {
    dispatch({
      type: HANDLE_FETCH_SCHOOLS_SUCCESS,
      payload: res.data,
    });
  });
};
