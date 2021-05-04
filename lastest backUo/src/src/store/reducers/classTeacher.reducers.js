import { HANDLE_FETCH_CLASS_TEACHER, HANDLE_FETCH_CLASS_TEACHER_SUCCESS } from '../types';

const INITIAL_CLASSES_STATE = {
  list: [],
};

export default (state = INITIAL_CLASSES_STATE, { type, payload }) => {
  switch (type) {
    case HANDLE_FETCH_CLASS_TEACHER_SUCCESS:
      return {
        ...state,
        list: payload,
      };
    default:
      return state;
  }
};
