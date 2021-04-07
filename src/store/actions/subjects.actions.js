import * as actions from '../types';
import https from '../../helpers/https';
export const handleFetchSubject = () => (dispatch) => {
  dispatch({
    type: actions.HANDLE_FETCH_SUBJECT,
  });
  return https.get(`/lessons/subjects`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_SUBJECT_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_SUBJECT_FAIL,
      payload: error,
    });
  })
}

