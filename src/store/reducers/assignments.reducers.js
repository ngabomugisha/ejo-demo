import { HANDLE_FETCH_ASSIGNMENT, HANDLE_FETCH_ASSIGNMENT_SUCCESS } from '../types';

const INITIAL_ASSIGNMENT_STATE = {
  list: [],
};

export default (state = INITIAL_ASSIGNMENT_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_ASSIGNMENT:
      console.log('HANDLE_FETCH_ASSIGNMENT', payload);
      return {
        ...state,
        list: payload,
      };
      break;
      case HANDLE_FETCH_ASSIGNMENT_SUCCESS:
        console.log('HANDLE_ASSIGNMENT_SUCCESS', payload)
        return {
          ...state,
          list: payload,
        };
    default:
      return state;
  }
};
