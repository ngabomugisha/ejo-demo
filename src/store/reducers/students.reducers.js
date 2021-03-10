import { HANDLE_FETCH_STUDENTS_SUCCESS, HANDLE_FETCH_STUDENTS_FAIL } from '../types';

const INITIAL_STUDENTS_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_STUDENTS_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      case HANDLE_FETCH_STUDENTS_FAIL:
        return {
          ...state,
          error: {
            status: true, message: payload
          }
        }
      return state;
  }
};
