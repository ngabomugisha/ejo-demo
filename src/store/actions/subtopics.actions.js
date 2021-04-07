import * as actions from '../types';
import https from '../../helpers/https';
export const handleFetchSubtopic = (topic) => (dispatch) => {
    console.log("TOPIC SENT IN ACTION:",topic)
  dispatch({
    type: actions.HANDLE_FETCH_SUBTOPIC,
  });
  return https.get(`/lessons/subtopics/${topic}/topic-subTopics`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_SUBTOPIC_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_SUBTOPIC_FAIL,
      payload: error,
    });
  })
}

