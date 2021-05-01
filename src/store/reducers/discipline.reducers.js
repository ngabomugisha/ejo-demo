import { HANDLE_FETCH_DISCIPLINE_SUCCESS, HANDLE_UPDATE_DISCIPLINE_SUCCESS } from '../types';

const INITIAL_DISCIPLINE_STATE = {
  list: [],
};

export default (state = INITIAL_DISCIPLINE_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_DISCIPLINE_SUCCESS:
      console.log('HANDLE_FETCH_DISCIPLINE_SUCCESS', payload);
      return {
        ...state,
        list: payload,
      };
      break;
      case HANDLE_UPDATE_DISCIPLINE_SUCCESS:
        console.log('HANDLE_UPDATE_SUCCESS', payload)
        return {
          ...state,
          list: payload,
        };
    default:
      return state;
  }
};
