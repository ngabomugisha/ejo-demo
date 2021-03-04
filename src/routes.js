import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//Authantication
import  LoginPage from './pages/Auth/Login';
import  HomePage from './pages/Home';
import  ForgetPasswordPage from './pages/Auth/ForgetPassword';

//Teacher
import  TeacherDashboard from './pages/Teacher/Index';
import  AssignmentPage from './pages/Teacher/Assignment'
import  LessonPlanPage from './pages/Teacher/LessonPlan'
import  NewAssignmentPage from './components/newAssignment/NewAssignment'
import  NewLessonPlanPage from './components/newLessonplan/NewLessonPlan'

//HeadTeacher
import  HeadTeacherDashboard from './pages/HeadTeacher/Index';
import  ReadAnnouncement from './pages/HeadTeacher/announcement/Announcement'
import  ReportPage from './pages/HeadTeacher/report/Index'
import  CheckInOutPage from './pages/HeadTeacher/checkInOut/Index'

//School-Admin
import  schoolAdminDaschbord from './pages/SCHOOL-ADMIN/index'
import  studentsPage from './pages/SCHOOL-ADMIN/student/index'
import  teachersPage from './pages/SCHOOL-ADMIN/teacher/index'

//Super-Admin
import superAdminDashboard from './pages/SUPER-ADMIN/index'
import schoolsPage from './pages/SUPER-ADMIN/schools/index'
import coursesPage from './pages/SUPER-ADMIN/courses/index'

export default () => {
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
          <Route exact path="/teacher/lessonPlan" component={LessonPlanPage}/>
          <Route exact path="/teacher/newLessonPlan" component={NewLessonPlanPage}/>
          <Route exact path="/teacher/assignment" component={AssignmentPage}/>
          <Route exact path="/teacher/newAssignment" component={NewAssignmentPage}/>
          <Route exact path="/teacher" component={TeacherDashboard} />


          {/* headTeacher routes */}
          <Route exact path="/headTeacher" component={HeadTeacherDashboard} />
          <Route exact path="/headTeacher/announcement" component={ReadAnnouncement} />
          <Route exact path="/headTeacher/report" component={ReportPage} />
          <Route exact path="/headTeacher/checkio" component={CheckInOutPage} />


          {/* schoolAdmin routes */}
          <Route exact path="/schoolAdmin" component={schoolAdminDaschbord}/>
          <Route exact path="/schoolAdmin/students" component={studentsPage}/>
          <Route exact path="/schoolAdmin/teachers" component={teachersPage}/>

          {/* superAdmin */}
          <Route exact path="/admin" component={superAdminDashboard}/>
          <Route exact path="/admin/schools" component={schoolsPage}/>
          <Route exact path="/admin/courses" component={coursesPage}/>




          {/* home */}
          <Route exact paht="/" component={HomePage} />
        </Switch>
      </Router>
    </Suspense>
  );
};
