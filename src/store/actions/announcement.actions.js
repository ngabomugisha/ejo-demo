import * as actions from '../types';
import https from '../../helpers/https';


export const handleFetchanouncementsRec = () => (dispatch) => {
  dispatch({
    type: actions.HANDLE_FETCH_ANNOUNCEMENTS_REC,
  });
  return https.get(`/announcements/received`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
    dispatch({
      type: actions.HANDLE_FETCH_ANNOUNCEMENTS_REC_SUCCESS,
      payload: res.data,
    })
  }).catch( (error) => {
    dispatch({
      type: actions.HANDLE_FETCH_ANNOUNCEMENTS_REC_FAIL,
      payload: error,
    });
  })
};

export const handleFetchanouncementsSent = () => (dispatch) => {
    dispatch({
      type: actions.HANDLE_FETCH_ANNOUNCEMENTS_SENT,
    });
    return https.get(`/announcements/sent`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } }).then((res) => {
      dispatch({
        type: actions.HANDLE_FETCH_ANNOUNCEMENTS_SENT_SUCCESS,
        payload: res.data,
      })
    }).catch( (error) => {
      dispatch({
        type: actions.HANDLE_FETCH_ANNOUNCEMENTS_SENT_FAIL,
        payload: error,
      });
    })
  };