import * as actions from '../types';
import https from '../../helpers/https';
export const handleFetchTopic = (subject) => (dispatch) => {
    console.log("SUBJECT SENT IN ACTION:",subject)
  dispatch({
    type: actions.HANDLE_FETCH_TOPIC,
  });
  return https.get(`/lessons/topics/${subject}/subject-topics`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_TOPIC_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_TOPIC_FAIL,
      payload: error,
    });
  })
}

