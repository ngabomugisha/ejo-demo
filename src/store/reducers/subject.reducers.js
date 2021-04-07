import * as actions from '../types';

const INITIAL_SUBJECT_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_SUBJECT_STATE, { type, payload }) => {
  switch (type) {
    case actions.HANDLE_FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      case actions.HANDLE_FETCH_SUBJECT_FAIL:
        return {
          ...state,
          error: {
            status: true, message: payload
          }
        }
      return state;
  }
};
