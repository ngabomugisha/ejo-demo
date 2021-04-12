import { HANDLE_FETCH_COMBINATIONS_SUCCESS } from '../types';

const INITIAL_COMBINATION_STATE = {
  list: [],
};

export default (state = INITIAL_COMBINATION_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_COMBINATIONS_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
