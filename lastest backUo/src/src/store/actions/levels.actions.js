
import { HANDLE_FETCH_LEVELS, HANDLE_FETCH_LEVELS_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchLevels = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_LEVELS,
  });
  return https.get(`/levels`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_LEVELS_SUCCESS,
      payload: res.data,
    });
  });
};
