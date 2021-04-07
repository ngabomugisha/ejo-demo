import { combineReducers } from 'redux';
import auth from './auth.reducers';
import schools from './schools.reducers';
import students from './students.reducers';
import classes from './classes.reducers'
import teachers from './teachers.reducers'
import terms from './terms.reducers'
import questions from './question.reduces'

const reducers = combineReducers({
  auth,
  schools,
  students,
  classes,
  teachers,
  terms,
  questions
});

export default reducers;
