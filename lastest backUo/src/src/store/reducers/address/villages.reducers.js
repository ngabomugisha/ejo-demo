import * as actions from '../../types';

const INITIAL_SUBTOPIC_STATE = {
  list: [], error: { status: false,loading: true, message: '' }, loading:true
};

export default (state = INITIAL_SUBTOPIC_STATE, { type, payload }) => {
  switch (type) {
    case actions.HANDLE_FETCH_VILLAGES_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      return state;
  }
};
