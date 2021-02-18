import { HANDLE_LOGIN_SUCCESS } from '../types';

const INITITAL_AUTH_STATE = {
  token: null,
  user: {},
};

export default (state = INITITAL_AUTH_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_LOGIN_SUCCESS:
      return {
        ...state,
        ...payload,
      };
    default:
      return state;
  }
};
