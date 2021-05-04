import * as actions from '../../types'

export default (state = null, {type, payload}) => {
   
switch (type) {
    case actions.HANDLE_SET_DATA_TEACHER:
      console.log('HANDLE_SET_DATA_TEACHER', payload);
      return {
        ...state,
        data: payload,
      };
      break;
      case actions.HANDLE_GET_DATA_TEACHER:
        console.log('HANDLE_GET_DATA_TEACHER')
        return {
          ...state,
          data: payload
        };
    default:
      return state;
  }
}