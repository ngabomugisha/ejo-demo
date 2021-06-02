import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.css'
import https from '../../helpers/https'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import AttendanceReports from '../../components/report/AttendanceReports'
import StudentsMarks from '../../components/teacher/StudentsMarks'
import { Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card } from 'react-bootstrap'
import { handleFetchLessonPlanSubject } from '../../store/actions/lessonPlans.actions'
import { handleFetchTeacherData } from '../../store/actions/data/teacher.data.actions'


export const Index = (props) => {
    let school = null
    let role = null
    let teacherId = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { teacherId = props.state.auth.user.school; role = props.state.auth.user._id } }
   
// DECLARATION

    const [classs, setClasss] = React.useState(null);
    const [unique, setUnique] = React.useState(null);
    const [clas, setClas] = React.useState(null)
    const [subject, setSubject] = React.useState(null);
    const [sub, setSub] = React.useState(null);
    const [subjects, setSubjects] = React.useState('');
    const [ sublist, setSublist] = useState(null)


// METHODES

    const fetchClasses = async () => {
        const req = await https.get(`/class-teachers/${teacherId}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
          .then((res) => {
            setClasss(res.data)
          }).catch(function (err) {
            console.log(err, '***********ERRRORR***********');
          });
        return req
      }
      
  const handleChange = (e) => {

    if (e.target.name === "class") {
      setClas(e.target.value)
      setSublist(classs.filter(el => el.class._id === e.target.value));
    }

    if (e.target.name === "subject"){
      setSub(e.target.value)
    }
  }
  

//USEEFFECTS

  useEffect(() => {
    classs != null &&
      setUnique(classs.reduce((acc, current) => {
        const x = acc.find(item => item.class._id === current.class._id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []))
  }, [classs])

  useEffect(() => {
      fetchClasses()
  }, [])
    return (
        <div>

            <PanelLayout selected={5} role={role}>
                <div className="report-container">
                    <div className="report-hd">
                        {/* <h3>Report</h3> */}
                    </div>
                    <div className="report-details">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Assignment's Marks
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div>
                                            <StudentsMarks />
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Attendance
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>
                                        <AttendanceReports />
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>

                </div>
            </PanelLayout>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
