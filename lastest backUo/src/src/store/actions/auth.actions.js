import https from '../../helpers/https';
import { HANDLE_LOGIN, HANDLE_LOGOUT, HANDLE_LOGIN_SUCCESS, HANDLE_LOGOUT_SUCCESS } from '../types';

export const handleLogin = ({ email, password }) => (dispatch) => {
  dispatch({
    type: HANDLE_LOGIN,
  });
  return https.post('/auth/signin', {email, password}).then((res) => {
    localStorage.setItem('token', res.data?.token);
    sessionStorage.setItem('isloggedin',true)
    dispatch({
      type: HANDLE_LOGIN_SUCCESS,
      payload: res.data,
    });
    console.log("THIS PERSON LOGGED IN:", res.data)
    return res.data;
  });
};

export const handleLogout = () => (dispatch) => {
  dispatch({
    type: HANDLE_LOGOUT,
    payload: null
  });
  return null
}