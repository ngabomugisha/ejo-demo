import { HANDLE_FETCH_STUDENTS_SUCCESS } from '../types';

const INITIAL_STUDENTS_STATE = {
  list: [],
};

export default (state = INITIAL_STUDENTS_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
