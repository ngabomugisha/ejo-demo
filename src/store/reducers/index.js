import { combineReducers } from "redux";
import auth from "./auth.reducers";
import schools from "./schools.reducers";
import students from "./students.reducers";
import student from "./data/student.reducers";
import discipline from "./discipline.reducers";
import classes from "./classes.reducers";
import combinations from "./combinations.reducers";
import levels from "./levels.reducers";
import teachers from "./teachers.reducers";
import leaves from "./leaves.reducers";
import terms from "./terms.reducers";
import questions from "./question.reduces";
import lessonPlans from "./lessonPlans.reducers";
import teacherData from "./data/teacher.data.reducer";
import classTeacher from "./classTeacher.reducers";
import subjects from "./subject.reducers";
import subtopics from "./subtopic.reducers";
import topics from "./topic.reducers";
import units from "./units.reducers";
import announcementRec from "./announcementRec.reducers";
import announcementSent from "./announcementSent.reducers";
import provinces from "./address/provinces.reducers";
import districts from "./address/districts.reducers";
import sectors from "./address/sectors.reducers";
import cells from "./address/cells.reducers";
import villages from "./address/villages.reducers";
import assignments from "./assignments.reducers";
import newLessonPlanReducer from "./newLessonPlan.reducer";

const reducers = combineReducers({
  auth,
  schools,
  students,
  student,
  classes,
  combinations,
  levels,
  classTeacher,
  discipline,
  teachers,
  terms,
  questions,
  lessonPlans,
  teacherData,
  subjects,
  leaves,
  assignments,
  topics,
  subtopics,
  units,
  announcementRec,
  announcementSent,
  provinces,
  districts,
  sectors,
  cells,
  villages,
  newLessonPlan: newLessonPlanReducer,
});

export default reducers;
