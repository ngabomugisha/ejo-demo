import * as actions from '../types';
import https from '../../helpers/https';
export const handleFetchUnits = (subtopic) => (dispatch) => {
    console.log("SUB-TOPIC SENT IN ACTION:",subtopic)
  dispatch({
    type: actions.HANDLE_FETCH_UNIT,
  });
  return https.get(`/lessons/units/${subtopic}/subTopic-units`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_UNIT_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_UNIT_FAIL,
      payload: error,
    });
  })
}

