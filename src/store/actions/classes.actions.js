import { HANDLE_FETCH_CLASSES, HANDLE_FETCH_CLASSES_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchClasses = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_CLASSES,
  });
  return https.get('/classes/602c1e8feeb9ae2820b62120/school-classes',{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_CLASSES_SUCCESS,
      payload: res.data,
    });
  });
};
