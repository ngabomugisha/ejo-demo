import React, { useState, useEffect } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect, useSelector } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'
import { Link, useHistory } from 'react-router-dom'
import moment from "moment";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import { handleFetchStudent } from '../../../store/actions/student.actions'
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdKeyboardArrowDown } from "react-icons/md";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },

    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    marginTop: '-5px',
    width: 200,

  },
  formControl: {
    margin: theme.spacing(0),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(0),
  },
}));



const Index = (props) => {
  const history = useHistory()
  const school = props.state.auth.user.school;
  const classes = useStyles()
  const [key, setKey] = useState('guest');
  const [alertMsg, setAlertMsg] = useState('')
  const [student, setStudent] = useState(null)
  const { list: students } = useSelector((state) => state.students);
  const [data, setData] = useState({
    firstName: null,
    lastName: null,
    reason: null,
    checkin: null
  })

  const [studentCheck, setStudentCheck] = useState({
    student: null,
    reason: null,
    checkout: null,
    provisionalCheckin: null,
    leavingWithWho: {
      firstName: null,
      lastName: null,
      identificationNumber: null,
      relationship: null
    }

  })

  const [open, setOpen] = React.useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = e => {
    if (e.target.name === 'fname') setData({
      ...data,
      'firstName': e.target.value
    })

    if (e.target.name === 'lname') setData({
      ...data,
      'lastName': e.target.value
    })

    if (e.target.name === 'reason') setData({
      ...data,
      'reason': e.target.value
    })

    if (e.target.name === 'date') setData({
      ...data,
      'checkin': e.target.value
    })
  }

  const handleChangeStudent = e => {
    console.log("*********************", studentCheck)

    if (e.target.name === "student") {
      setStudentCheck({
        ...studentCheck,
        'student': e.target.value
      })
    }
    if (e.target.name === "studentReason") {
      setStudentCheck({
        ...studentCheck,
        'reason': e.target.value
      })
    }
    if (e.target.name === "studentCheckOut") {
      setStudentCheck({
        ...studentCheck,
        'checkout': e.target.value
      })
    }
    if (e.target.name === "studentCheckIn") {
      setStudentCheck({
        ...studentCheck,
        'provisionalCheckin': e.target.value
      })
    }
    if (e.target.name === "withwhofname") {
      setStudentCheck({
        ...studentCheck,
        'leavingWithWho': { 'firstName' :e.target.value}
      })
    }
    if (e.target.name === "withwholname") {
      setStudentCheck({
        ...studentCheck,
        'leavingWithWho': { 'LastName' :e.target.value}
      })
    }
    if (e.target.name === "phone") {
      setStudentCheck({
        ...studentCheck,
        'leavingWithWho': { 'phone' :e.target.value}
      })
    }
    if (e.target.name === "id") {
      setStudentCheck({
        ...studentCheck,
        'leavingWithWho': { 'identificationNumber' :e.target.value}
      })
    }
    if (e.target.name === "relationship") {
      setStudentCheck({
        ...studentCheck,
        'leavingWithWho': { 'relationship' :e.target.value}
      })
    }


  }

  const onSubmit = async () => {
    if (data.lastName && data.firstName && data.checkin && data.reason) {
      await https.post('/guests/', data, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
        if (res.status == 200) {
          setAlertMsg("check In Confirmed")
          setOpen(true);
        }
        else
          return alert("something went wrong")
      })
    }
    else {
      alert("there is missing information, please double check")
    }
  }

  const onSubmitStudent = async () => {
    if (studentCheck.student && studentCheck.checkout && studentCheck.provisionalCheckin && studentCheck.reason) {
      await https.post('/leaves/student-leaves/', studentCheck, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
        if (res.status == 200) {
          setAlertMsg('Check Out Confirmed')
          setOpen(true);
          setStudentCheck({
            student: null,
            reason: null,
            checkout: null,
            provisionalCheckin: null,
            leavingWithWho: {
              firstName: null,
              lastName: null,
              identificationNumber: null,
              relationship: null
            }})
          history.replace("/headStudy")
        }
        else
          return alert("something went wrong")
      })
    }
    else {
      alert("there is missing information, please double check")
    }
  }
  useEffect(() => {
    props.handleFetchStudent(school)
  }, [])

  return (
    <div>
      <PanelLayout selected={2} role={props.state.auth.user.role}>
        <div className="checkio-hd"><h3>Check In/Out</h3></div>
        <div className="checkio-container">
          <div className="checkio-tabs">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="guest" title="Guest">
                <div className="guest-form">

                  <div className="question-field">
                    <TextField id="outlined-basic" label="Guest First Name" onChange={handleChange} name="fname" variant="outlined" placeholder="First Name" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" label="Guest Last Name" onChange={handleChange} name='lname' variant="outlined" placeholder="Last Name" />
                  </div>
                  <div className="question-field">
                    <TextField
                      id="datetime-local"
                      label="Chech In Time"
                      name="date"
                      onChange={handleChange}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      type="datetime-local"
                    />
                  </div>
                  <div className="question-field">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label="Reason"
                      type="text"
                      placeholder="Enter Reason"
                      onChange={handleChange}
                      name="reason"
                      color="primary"
                      multiline={true}
                      rowsMax="5"
                    />  </div>
                  <div className='send-btn'><Button color='primary' className="btn-next" size="large"
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#1f75c6",
                      padding: "7px 15px",
                      fontSize: "15px",
                      color: "#fff",
                      width: '200px',
                      textTransform: 'capitalize'
                    }}
                    onClick={() => onSubmit(data)}
                  >
                    CHECK IN
                </Button></div>
                </div>
              </Tab>
              <Tab eventKey="student" title="Student">

                <div className="guest-form">

                  <div className="question-field">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select student"
                      name="student"
                      value={studentCheck.student}
                      onChange={handleChangeStudent}
                      helperText="Please select student"
                      variant="outlined"
                    >
                      {
                        students && students.map(student => (
                          <MenuItem key={student._id} value={student._id}>{student.firstName}{" "}{student.lastName}</MenuItem>
                        ))
                      }
                    </TextField>
                  </div>
                  <div className="question-field">
                    <TextField
                      id="outlined-select-currency"
                      select
                      label="Select Reason"
                      name="studentReason"
                      value={studentCheck.reason}
                      onChange={handleChangeStudent}
                      helperText="Please select Reason"
                      variant="outlined"
                    >
                      <MenuItem value="STUDY">STUDY</MenuItem>
                      <MenuItem value="HOLIDAY">HOLIDAY</MenuItem>
                      <MenuItem value="SICK">SICK</MenuItem>
                      <MenuItem value="FAMILY">FAMILY</MenuItem>
                    </TextField>
                  </div>
                  <div className="question-field">
                    <TextField
                      id="datetime-local"
                      label="Chech Out Time"
                      name="studentCheckOut"
                      value = {studentCheck.checkout}
                      onChange={handleChangeStudent}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      type="datetime-local"
                    />
                  </div>
                  <div className="question-field">
                    <TextField
                      id="datetime-local"
                      label="Provisional Chech In Time"
                      name="studentCheckIn"
                      value = {studentCheck.provisionalCheckin}
                      onChange={handleChangeStudent}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      variant="outlined"
                      type="datetime-local"
                    />
                  </div>

                <Accordion defaultActiveKey="">
                  <Card>
                    <Accordion.Toggle as={Card.Header} eventKey="0">
                      <div className="accordion-title">
                        <h3>leaving With Who</h3>
                        <h3>
                          <MdKeyboardArrowDown />
                        </h3>
                      </div>
                    </Accordion.Toggle>
                    <Accordion.Collapse eventKey="0">
                      <Card.Body>
                  <div className="question-field">
                    <TextField id="outlined-basic" value={studentCheck.leavingWithWho.firstName} label="First Name" onChange={handleChangeStudent} name='withwhofname' variant="outlined" placeholder="First Name" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" value={studentCheck.leavingWithWho.lastName} label="Last Name" onChange={handleChangeStudent} name='withwholname' variant="outlined" placeholder="Last Name" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" value={studentCheck.leavingWithWho.phone} label="Phone" onChange={handleChangeStudent} name='phone' variant="outlined" placeholder="Phone" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" value={studentCheck.leavingWithWho.identificationNumber} label="Identification number" onChange={handleChangeStudent} name='id' variant="outlined" placeholder="ID" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" value={studentCheck.leavingWithWho.relationship} label="Relationaship" onChange={handleChangeStudent} name='relationaship' variant="outlined" placeholder="Relationaship" />
                  </div>
               
                    </Card.Body>
                    </Accordion.Collapse>
                    </Card>
                    </Accordion>
                    
                  <div className='send-btn'><Button color='primary' className="btn-next" size="large"
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#1f75c6",
                      padding: "7px 15px",
                      fontSize: "15px",
                      color: "#fff",
                      width: '200px',
                      textTransform: 'capitalize'
                    }}
                    onClick={() => onSubmitStudent(data)}
                  >
                    CHECK IN
</Button></div>
                </div>
              </Tab>
            </Tabs>
          </div>
        </div>
      </PanelLayout>

      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          {alertMsg}
                                    </Alert>
      </Snackbar>
    </div >
  )
}

const mapStateToProps = (state) => ({
  state: state
})

const mapDispatchToProps = dispatch => ({
  handleFetchStudent: (school) => {
    dispatch(handleFetchStudent(school))

  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
