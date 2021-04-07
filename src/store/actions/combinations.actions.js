
import { HANDLE_FETCH_COMBINATIONS, HANDLE_FETCH_COMBINATIONS_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchCombination = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_COMBINATIONS,
  });
  return https.get(`/combinations`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_COMBINATIONS_SUCCESS,
      payload: res.data,
    });
  });
};
