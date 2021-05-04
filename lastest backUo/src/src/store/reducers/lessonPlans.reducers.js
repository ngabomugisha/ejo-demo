

import { HANDLE_FETCH_LESSONPLANS_SUCCESS, HANDLE_FETCH_LESSONPLANS_FAIL } from '../types';

const INITIAL_LESSONPLAN_STATE = {
  list: [],
};

export default (state = INITIAL_LESSONPLAN_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_LESSONPLANS_SUCCESS:
      console.log('HANDLE_FETCH_LESSONPLANS_SUCCESS', payload);
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
