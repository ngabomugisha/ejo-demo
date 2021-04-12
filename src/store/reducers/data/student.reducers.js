import { HANDLE_FETCH_STUDENT_SUCCESS, HANDLE_FETCH_STUDENT_FAIL } from '../../types';

const INITIAL_STUDENT_STATE = {
  list: [], error: { status: false,loading: true, message: 'One student fetched' }, loading:true
};

export default (state = INITIAL_STUDENT_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_STUDENT_SUCCESS:
      return {
        ...state,
        list: payload,
        loading: false
      };
    default:
      return state;
  }
};
