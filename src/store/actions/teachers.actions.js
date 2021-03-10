import { HANDLE_FETCH_TEACHERS, HANDLE_FETCH_TEACHERS_SUCCESS, HANDLE_ADD_TEACHERS, HANDLE_ADD_TEACHERS_SUCCESS} from '../types';
import https from '../../helpers/https';

export const handleFetchTeachers = (school) => (dispatch) => {
  console.log("school in teacher action", school)
  dispatch({
    type: HANDLE_FETCH_TEACHERS,
  });
  
  return https.get(`/auth/${school}/school-employees`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_TEACHERS_SUCCESS,
      payload: res.data,
    });
  });
};


export const handleAddingTeacher = (data) => (dispatch) => {
    dispatch({
      type: HANDLE_ADD_TEACHERS,
    });
    return https.get('/schools').then((res) => {
      dispatch({
        type: HANDLE_ADD_TEACHERS_SUCCESS,
        payload: res.data,
      });
    });
  };
  