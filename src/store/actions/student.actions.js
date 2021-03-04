import { HANDLE_FETCH_STUDENTS, HANDLE_FETCH_STUDENTS_SUCCESS } from '../types';
import https from '../../helpers/https';
export const handleFetchStudent = () => (dispatch) => {
  dispatch({
    type: HANDLE_FETCH_STUDENTS,
  });
  return https.get('/students/602c1e8feeb9ae2820b62120/school-students',{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_STUDENTS_SUCCESS,
      payload: res.data,
    });
  });
};
