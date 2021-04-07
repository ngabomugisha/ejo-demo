import * as actions from '../types';

const INITIAL_ANNOUNCEMENT_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_ANNOUNCEMENT_STATE, { type, payload }) => {
  switch (type) {
    case actions.HANDLE_FETCH_ANNOUNCEMENTS_REC_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
      case actions.HANDLE_FETCH_ANNOUNCEMENTS_REC_FAIL:
        return {
          ...state,
          error: {
            status: true, message: payload
          }
        }

    default:
      return state;
  }
};
