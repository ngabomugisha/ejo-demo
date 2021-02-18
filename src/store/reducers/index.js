import { combineReducers } from 'redux';
import auth from './auth.reducers';
import school from './schools.reducers';

const reducers = combineReducers({
  auth,
  school,
});

export default reducers;
