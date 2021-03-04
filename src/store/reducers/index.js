import { combineReducers } from 'redux';
import auth from './auth.reducers';
import schools from './schools.reducers';
import students from './students.reducers';
import classes from './classes.reducers'

const reducers = combineReducers({
  auth,
  schools,
  students,
  classes,
});

export default reducers;
