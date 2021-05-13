import { HANDLE_FETCH_LEAVE_SUCCESS, HANDLE_UPDATE_LEAVE_SUCCESS } from '../types';

const INITIAL_LEAVE_STATE = {
  list: [],
};

export default (state = INITIAL_LEAVE_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_LEAVE_SUCCESS:
      console.log('HANDLE_FETCH_LEAVE_SUCCESS', payload);
      return {
        ...state,
        list: payload,
      };
      break;
      case HANDLE_UPDATE_LEAVE_SUCCESS:
        console.log('HANDLE_UPDATE_SUCCESS', payload)
        return {
          ...state,
          list: payload,
        };
    default:
      return state;
  }
};
