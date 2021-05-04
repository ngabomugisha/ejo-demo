import { HANDLE_FETCH_LEVELS_SUCCESS } from '../types';

const INITIAL_LEVEL_STATE = {
  list: [],
};

export default (state = INITIAL_LEVEL_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_LEVELS_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
