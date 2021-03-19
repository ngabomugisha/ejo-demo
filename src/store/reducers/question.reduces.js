import { HANDLE_FETCH_QUESTION_SUCCESS, HANDLE_FETCH_QUESTION_FAIL } from '../types';

const INITIAL_QUESTION_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_QUESTION_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_QUESTION_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      case HANDLE_FETCH_QUESTION_FAIL:
        return {
          ...state,
          error: {
            status: true, message: payload
          }
        }
      return state;
  }
};
