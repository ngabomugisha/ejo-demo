import { combineReducers } from 'redux';
import auth from './auth.reducers';
import schools from './schools.reducers';
import students from './students.reducers';
import classes from './classes.reducers'
import combinations from './combinations.reducers'
import levels from './levels.reducers'
import teachers from './teachers.reducers'
import terms from './terms.reducers'
import questions from './question.reduces'
import lessonPlans from './lessonPlans.reducers'
import teacherData from './data/teacher.data.reducer'
import subjects from './subject.reducers'
import subtopics from './subtopic.reducers'
import topics from './topic.reducers'
import units from './units.reducers'
import announcementRec from './announcementRec.reducers'
import announcementSent from './announcementSent.reducers'

const reducers = combineReducers({
  auth,
  schools,
  students,
  classes,
  combinations,
  levels,
  teachers,
  terms,
  questions,
  lessonPlans,
  teacherData,
  subjects,
  topics,
  subtopics,
  units,
  announcementRec,
  announcementSent,
});

export default reducers;
