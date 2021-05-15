import React, { useState, useEffect } from 'react'
import './style.css'
import { connect } from 'react-redux'
import https from '../../helpers/https'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import LessonPlanDetailsComponent from '../../components/newLessonplan/lessonPlanDetailsComponent/index'
import { handleFetchUnits } from '../../store/actions/units.actions'
import { handleFetchSubject } from '../../store/actions/subjects.actions'

import { Table, Button } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'

import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import { Dialog, TextField, Snackbar, MenuItem } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));



export const Scheme_of_work = (props) => {
  const classes = useStyles();
  let school = null
  let role = null
  if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
  let count = 1


  const teacher = props.state.auth && props.state.auth.user && props.state.auth.user._id;
  const [classs, setClasss] = React.useState(null);
  const [clas, setClas] = React.useState(null)
  const [subject, setSubject] = React.useState(null);
  const [sub, setSub] = React.useState(null);
  const [unit, setUnit] = useState(null)
  const [uni, setUni] = useState(null)
  const [unitPlans, setUnitPlans] = useState([])


  const [topic, setTopic] = React.useState(null);
  const [top, setTop] = React.useState(null);
  const [subTopic, setSubTopic] = React.useState(null);
  const [subTop, setSubTop] = React.useState(null);

  const [subjects, setSubjects] = React.useState('');
  const [sublist, setSublist] = useState(null)
  const [timeStart, setTimeStart] = useState(null)
  const [timeEnd, setTimeEnd] = useState(null)

  const [create_start_time, setCreate_start_time] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())
  const [create_end_time, setCreate_end_time] = useState(new Date().getFullYear() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getDate())

  const [msg, setMsg] = useState(null)
  const [type, setType] = useState(null)
  const [openMsg, setOpenMsg] = useState(false)

  const [open, setOpen] = useState(false)

  const handleClose = () => { setOpen(false) }
  const handleOpen = () => { setOpen(true) }

  const handleCloseMsg = () => {
    setOpenMsg(false)
  }
  const handleOpenMsg = (ty, msg) => {
    setMsg(msg)
    setType(ty)
    setOpenMsg(true)
  }

  const handleChange = (e) => {

    if (e.target.name === "class") {
      setClas(e.target.value)
      setSublist(classs.filter(el => el.class._id === e.target.value));
    }

    if (e.target.name === "subject") {
      setSub(e.target.value)
      console.log("{{{{{{{{{{{{", e.target.value, "&&&&&", clas, "}}}}}}}}}}}}}}}}}}}")
      // if(sub)
      fetchUnitPlans(e.target.value)
    }

    if (e.target.name === "topic")
      setTop(e.target.value)

    if (e.target.name === "subTopic")
      setSubTop(e.target.value)


    if (e.target.name === "unit") {
      setUni(e.target.value)

    }

    if (e.target.name === 'create_end_time') setCreate_end_time(e.target.value)
    if (e.target.name === 'create_start_time') setCreate_start_time(e.target.value)

  }

  const onChange_start = (e) => {
    if (e.target.name === 'start_time') {
      setTimeStart(e.target.value)
      console.log('date of start', timeStart)
    }
  }

  const onChange_end = (e) => {
    if (e.target.name === 'end_time') {
      setTimeEnd(e.target.value)
      console.log('date of end', timeEnd)
    }
  }

  const fetchClasses = () => {
    const req = https.get(`/class-teachers/${teacher}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        setClasss(res.data)
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
      });
    return req
  }

  const fetchUnitPlans = (subj) => {
    console.log("TRYING TO FETCH UNIT PLAN WITH : ", subj)
    const req = https.get(`/lessons/unit-plans/${subj}/subject-unit-plans`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        setUnitPlans(res.data)
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
      });
    return req
  }
  let data = {}
  const handleUpdate = (item) => {
    if (timeStart != null && timeEnd == null) {
      console.log("condition passed: start not null")
      data = {
        ...item,
        time: {
          ...item.time,
          start: timeStart
        }
      }
    }
    else if (timeEnd != null && timeStart == null) {
      console.log("condition passed: end not null")
      data = {
        ...item,
        time: {
          ...item.time,
          end: timeEnd
        }
      }
    }
    else if (timeEnd != null && timeStart != null) {
      console.log("condition passed: start not null and end not null")
      data = {
        ...item,
        time: {
          ...item.time,
          end: timeEnd,
          start: timeStart

        }
      }
    }
    else {
      console.log("you have not change anydate")
      handleOpenMsg('warning', `You changed nothing`)
      return 0
    }
    if (data != null) {
      console.log("READY TO SUBMIT :", data)
      https.put(`/lessons/unit-plans/${data._id}`, data, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
          handleOpenMsg('success', `Date changed successfully`)
          console.log('DATA UPDATED BRO')
        }).catch(function (err) {
          console.log(err, '***********ERRRORR***********');
          handleOpenMsg('warning', err)
        });
    }
  }
  const handleSubmit = () => {
    console.log("subject", sub, "unit", uni, "end", create_end_time, "start", create_start_time)
    let data_to_submit = {
      time: {
        start: create_start_time,
        end: create_end_time
      },
      subject: sub,
      unit: uni
    }
    https.post(`lessons/unit-plans`, data_to_submit, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        handleOpenMsg('success', `unit plan created successfully`)
        handleClose()
        console.log('DATA UPDATED BRO')
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
        handleOpenMsg('warning', err)
      });
  }

  useEffect(() => {
    // setSublist(classs.filter(el => el.class._id === e.target.value));
  }, [clas])

  useEffect(() => {

    async function fetchUnit() {
      const req = await https.get(`/lessons/units/${subTop}/subTopic-units`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
          setUnit(res.data)
        }).catch(function (err) {
          console.log(err);
        });
      return req
    }
    fetchUnit()
  }, [subTop])
  useEffect(() => {

    async function fetchSupTop() {
      const req = await https.get(`/lessons/subtopics/${top}/topic-subTopics`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
          setSubTopic(res.data)
        }).catch(function (err) {
          console.log(err);
        });
      return req
    }
    fetchSupTop()
  }, [top])
  useEffect(() => {

    async function fetchTopic() {
      const req = await https.get(`/lessons/topics/${sub}/subject-topics`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
          setTopic(res.data)
        }).catch(function (err) {
          console.log(err);
        });
      return req
    }
    fetchTopic()

  }, [sub])


  useEffect(() => {
    props.handleFetchSubject()
    fetchClasses()
  }, [])
  return (
    <div>
      <PanelLayout selected={3} role={role}>
        <div className="scheme-container">
          <div>
            <div style={{ padding: "5px" }}>
              <TextField
                label="Class"
                value={clas}
                name="class"
                variant="outlined"
                type="text"
                fullWidth="true"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {classs &&
                  classs.map(item => (
                    <MenuItem key={item.class._id} value={item.class._id}>{!item ? '' : !item.class != null && !item.class == undefined ? '' : !item.class.level ? '' : item.class.level.name}&nbsp;{!item ? '' : !item.class ? '' : !item.class.combination ? '' : !item.class.combination ? '' : item.class.combination.name}&nbsp;{!item ? "" : !item.class ? "" : item.class.label ? item.class.label : ''}</MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div style={{ padding: "5px" }}>


              <TextField
                label="Subject"
                value={sub}
                name="subject"
                variant="outlined"
                type="text"
                fullWidth="true"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {sublist
                  &&
                  sublist.map(item => (
                    <MenuItem key={item.subject && item.subject._id} value={item.subject && item.subject._id}>{item.subject && item.subject.name}</MenuItem>
                  ))
                }
              </TextField>
            </div>
            <div style={{ padding: "5px" }}>
              <Button style={{ padding: "5px", margin: "0 auto" }} onClick={handleOpen}> Create a new Unit Plan Time</Button>
            </div>
          </div>
          {/* <p>{unitPlans && JSON.stringify(unitPlans.length)}</p> */}
          <div>
            <Table striped bordered hover responsive size="lg">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Subject</th>
                  <th>Unit</th>
                  <th>Starts</th>
                  <th>Ends</th>
                  <th>Expected</th>
                  <th>covered</th>
                  {/* </th> */}
                </tr>
              </thead>
              <tbody>
                {
                  unitPlans && unitPlans.map(i => (
                    <tr key={i._id}>
                      <td>{count++}</td>
                      <td style={{ minWidth: "250px" }}>{props.subjectList.reduce(function (fit, condition) {
                        if (condition._id == i.subject) {
                          let keyUnit = condition.name;
                          fit = keyUnit;
                        }
                        return fit;
                      }, "")}</td>
                      <td style={{ minWidth: "250px" }}>{i.name}</td>
                      <td style={{ minWidth: "250px" }}>
                        <TextField
                          id="date"
                          fullWidth
                          name="start_time"
                          onChange={onChange_start}
                          type="date"
                          defaultValue={(i.time.start).substring(0, 10)}
                          className={classes.textField}
                        />
                      </td>
                      <td style={{ minWidth: "250px" }}>
                        <TextField
                          id="date"
                          fullWidth
                          name="end_time"
                          onChange={onChange_end}
                          type="date"
                          defaultValue={(i.time.end).substring(0, 10)}
                          className={classes.textField}
                        />
                      </td>
                      <td>7</td>
                      <td>0</td>
                      <td><Button variant="info" onClick={() => handleUpdate(i)}>change Time</Button></td>
                    </tr>
                  ))
                }
              </tbody>
            </Table>
          </div>
        </div>
      </PanelLayout>



      <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
        <DialogTitle>Create a unit plan</DialogTitle>
        <DialogContent>
          {/* <Formik initialValues={initValue} onSubmit={onSubmit}>
                  {(formik) => ( */}
          <form>
            <div className="form-field">
              <TextField
                label="Class"
                value={clas}
                name="class"
                variant="outlined"
                type="text"
                fullWidth="true"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {classs &&
                  classs.map(item => (
                    <MenuItem key={item.class._id} value={item.class._id}>{!item ? '' : !item.class != null && !item.class != undefined ? '' : !item.class.level ? '' : item.class.level.name}&nbsp;{!item ? '' : !item.class ? '' : !item.class.combination ? '' : !item.class.combination ? '' : item.class.combination.name}&nbsp;{!item ? "" : !item.class ? "" : item.class.label ? item.class.label : ''}</MenuItem>
                  ))
                }
              </TextField>


              <TextField
                label="Subject"
                value={sub}
                name="subject"
                variant="outlined"
                type="text"
                fullWidth="true"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {sublist
                  &&
                  sublist.map(item => (
                    <MenuItem key={item.subject && item.subject._id} value={item.subject && item.subject._id}>{item.subject && item.subject.name}</MenuItem>
                  ))
                }
              </TextField>




              <TextField
                label="Topic"
                variant="outlined"
                type="text"
                value={top}
                name="topic"
                fullWidth="true"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>

                {topic &&
                  topic.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  ))
                }
              </TextField>




              <TextField
                label="Sub-topic"
                variant="outlined"
                type="text"
                name="subTopic"
                fullWidth="true"
                onChange={handleChange}
                minWidth="xl"
                value={subTop}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {subTopic &&
                  subTopic.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  ))
                }
              </TextField>




              <TextField
                label="Unit"
                variant="outlined"
                type="text"
                fullWidth="true"
                name="unit"
                value={uni}
                minWidth="xl"
                onChange={handleChange}
                select
                InputLabelProps={{
                  shrink: true,
                }}
              >
                <MenuItem value={null}>
                  <em>None</em>
                </MenuItem>
                {unit &&
                  unit.map(item => (
                    <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                  ))
                }
              </TextField>


            </div>
            <div>
              <TextField
                id="date"
                fullWidth
                variant="outlined"
                name="create_start_time"
                label="Set date to start"
                onChange={handleChange}
                type="date"
                color="primary"
                value={create_start_time}
                className={classes.textField}
              />
              <TextField
                id="date"
                fullWidth
                variant="outlined"
                name="create_end_time"
                label="Set date to end"
                onChange={handleChange}
                color="primary"
                type="date"
                value={create_end_time}
                className={classes.textField}
              />
            </div>
          </form>
          {/* )}
                </Formik> */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="default">
            Cancel
                </Button>
          <Button onClick={handleSubmit} color="primary">
            Ok
                </Button>
        </DialogActions>
      </Dialog>


      <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleCloseMsg}>
        <Alert onClose={handleCloseMsg} severity={type}>
          {msg}
        </Alert>
      </Snackbar>
    </div>
  )
}

function mapStateToProps(state) {
  const { subjects } = state
  const subjectList = subjects.list
  // const selected = state.teacherstate.teacherData.data ? state.teacherData.data.class : null

  return { subjectList, state }
}

const mapDispatchToProps = dispatch => ({
  handleFetchSubject: () => {
    dispatch(handleFetchSubject())
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Scheme_of_work)
