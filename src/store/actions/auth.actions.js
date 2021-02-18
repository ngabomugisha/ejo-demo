import https from '../../helpers/https';
import { HANDLE_LOGIN, HANDLE_LOGIN_SUCCESS } from '../types';

export const handleLogin = ({ email, password }) => (dispatch) => {
  dispatch({
    type: HANDLE_LOGIN,
  });
  return https.post('/auth/signin', {email, password}).then((res) => {
    localStorage.setItem('token', res.data?.token);
    dispatch({
      type: HANDLE_LOGIN_SUCCESS,
      payload: res.data,
    });
    return res.data;
  });
};
