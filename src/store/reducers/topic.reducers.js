import * as actions from '../types';

const INITIAL_TOPIC_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_TOPIC_STATE, { type, payload }) => {
  switch (type) {
    case actions.HANDLE_FETCH_TOPIC_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      case actions.HANDLE_FETCH_TOPIC_FAIL:
        return {
          ...state,
          error: {
            status: true, message: payload
          }
        }
      return state;
  }
};
