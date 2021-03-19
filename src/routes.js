import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useSelector } from 'react-redux'

//Authantication
import LoginPage from './pages/Auth/Login';
import HomePage from './pages/Home';
import ForgetPasswordPage from './pages/Auth/ForgetPassword';

//Teacher
import TeacherDashboard from './pages/Teacher/Index';
import AssignmentPage from './pages/Teacher/Assignment'
import LessonPlanPage from './pages/Teacher/LessonPlan'
import NewAssignmentPage from './components/newAssignment/NewAssignment'
import NewLessonPlanPage from './components/newLessonplan/NewLessonPlan'
import LessonPlanDetailsPage from './pages/Teacher/LessonPlanDetails'

//HeadTeacher
import HeadTeacherDashboard from './pages/HeadTeacher/Index';
import ReadAnnouncement from './pages/HeadTeacher/announcement/Announcement'
import ReportPage from './pages/HeadTeacher/report/Index'
import CheckInOutPage from './pages/HeadTeacher/checkInOut/Index'

//School-Admin
import schoolAdminDaschbord from './pages/SCHOOL-ADMIN/index'
import studentsPage from './pages/SCHOOL-ADMIN/student/index'
import TeachersPage from './pages/SCHOOL-ADMIN/teacher/index'
import timeTablePage from './pages/SCHOOL-ADMIN/timeTable/index'
import disciplinePage from './pages/SCHOOL-ADMIN/discipline/index'
import termPage from './pages/SCHOOL-ADMIN/term/index'
import questionsPage from './pages/SCHOOL-ADMIN/questions/index'
import reportPage from './pages/SCHOOL-ADMIN/report/index'

//Super-Admin
import superAdminDashboard from './pages/SUPER-ADMIN/index'
import schoolsPage from './pages/SUPER-ADMIN/schools/index'
import coursesPage from './pages/SUPER-ADMIN/courses/index'

export default () => {
  const userData = useSelector((state) => state.auth.user)
  console.log(userData)
  return (
    <Suspense
      fallback={
        <div className="loading">
          <p>Loading.......</p>
        </div>
      }
    >
      <Router>
        <Switch>
          {/* Authantication routes */}
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/passwords" component={ForgetPasswordPage} />


          {/* Teacher routes */}
          <Route exact path="/teacher/lessonPlan" component={LessonPlanPage} />
          <Route exact path="/teacher/lessonPlan/details" component={LessonPlanDetailsPage} />
          <Route exact path="/teacher/newLessonPlan" component={NewLessonPlanPage} />
          <Route exact path="/teacher/assignment" component={AssignmentPage} />
          <Route exact path="/teacher/newAssignment" component={NewAssignmentPage} />
          <Route exact path="/teacher" component={TeacherDashboard} />


          {/* headTeacher routes */}
          <Route exact path="/headTeacher" component={HeadTeacherDashboard} />
          <Route exact path="/headTeacher/announcement" component={ReadAnnouncement} />
          <Route exact path="/headTeacher/report" component={ReportPage} />
          <Route exact path="/headTeacher/checkio" component={CheckInOutPage} />


          {/* schoolAdmin routes */}
          <Route exact path="/schoolAdmin" component={schoolAdminDaschbord} />
          <Route exact path="/schoolAdmin/students" component={studentsPage} />
          <Route exact path="/schoolAdmin/term" component={termPage} />
          <Route exact path="/schoolAdmin/discipline" component={disciplinePage} />
          <Route exact path="/schoolAdmin/questions" component={questionsPage} />
          <Route exact path="/schoolAdmin/report" component={reportPage} />
          
          <Route exact path="/schoolAdmin/teachers">
            <TeachersPage userData={userData} />
          </Route>
          {/* <Route exact path="/props-through-render" render={(props) => <PropsPage {...props} title={`Props through render`} />} /> */}
          {/* <Route exact path="/schoolAdmin/teachers" userData={userData} component={teachersPage}/> */}
          <Route exact path="/schoolAdmin/timeTable" component={timeTablePage} />

          {/* superAdmin */}
          <Route exact path="/admin" component={superAdminDashboard} />
          <Route exact path="/admin/schools" component={schoolsPage} />
          <Route exact path="/admin/courses" component={coursesPage} />




          {/* home */}
          <Route exact paht="/" component={HomePage} />
        </Switch>
      </Router>
    </Suspense>
  );
};


const mapStateToProps = (state) => ({
  state: state
})