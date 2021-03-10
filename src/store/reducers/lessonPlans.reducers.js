import { HANDLE_FETCH_LESSONPLAN_SUCCESS, HANDLE_ADD_LESSONPLAN_SUCCESS} from '../types';

const INITIAL_LESSONPLAN_STATE = {
  list: [],
};

export default (state = INITIAL_LESSONPLAN_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_LESSONPLAN_SUCCESS:
      return {
        ...state,
        list: payload,
      };break;
    default:
      return state;
  }
};
