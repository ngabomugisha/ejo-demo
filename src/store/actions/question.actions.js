import { HANDLE_FETCH_QUESTION, HANDLE_FETCH_QUESTION_SUCCESS, HANDLE_FETCH_QUESTION_FAIL } from '../types';
import https from '../../helpers/https';
export const handleFetchQuestion = (subject) => (dispatch) => {
  console.log("subject recevied : ", subject)
  dispatch({
    type: HANDLE_FETCH_QUESTION,
  });
  return https.get(`/question-banks/${subject}/subject-question-bank`,{ headers: {'content-type' : 'application/json' , 'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: HANDLE_FETCH_QUESTION_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    // alert('what on earth')
    dispatch({
      type: HANDLE_FETCH_QUESTION_FAIL,
      payload: error,
    });
  })
}

