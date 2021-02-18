import { HANDLE_FETCH_SCHOOLS_SUCCESS } from '../types';

const INITIAL_SCHOOL_STATE = {
  list: [],
};

export default (state = INITIAL_SCHOOL_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_SCHOOLS_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
