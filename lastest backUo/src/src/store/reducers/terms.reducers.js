import { HANDLE_FETCH_TERM_SUCCESS, HANDLE_UPDATE_TERM_SUCCESS } from '../types';

const INITIAL_TERM_STATE = {
  list: [],
};

export default (state = INITIAL_TERM_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_TERM_SUCCESS:
      console.log('HANDLE_FETCH_TERM_SUCCESS', payload);
      return {
        ...state,
        list: payload,
      };
      break;
      case HANDLE_UPDATE_TERM_SUCCESS:
        console.log('HANDLE_UPDATE_SUCCESS', payload)
        return {
          ...state,
          list: payload,
        };
    default:
      return state;
  }
};
