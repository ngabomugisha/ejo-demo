import { HANDLE_FETCH_TEACHERS_SUCCESS, HANDLE_ADD_TEACHERS_FAIL  } from '../types';

const INITIAL_TEACHERS_STATE = {
  list: [],
};

export default (state = INITIAL_TEACHERS_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_TEACHERS_SUCCESS:
      console.log('HANDLE_FETCH_TEACHERS_SUCCESS', payload);
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
