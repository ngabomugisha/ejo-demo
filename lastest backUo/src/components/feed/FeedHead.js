import React, { useState, useEffect } from 'react'
import './Feed.css'
import { useHistory } from 'react-router-dom'
import { Link } from 'react-router-dom'
import https from "../../helpers/https"
import { connect } from "react-redux";
import { useDispatch, useSelector } from 'react-redux';
import { Button, Dialog, TextField, MenuItem } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import {
  handleFetchTeacherData, handleSetTeacherData
} from '../../store/actions/data/teacher.data.actions'



function FeedHead(props) {
  const teacher = props.state.auth.user._id;
  const dispatch = useDispatch()
  const history = useHistory();
  let DATA = null
  const [open, setOpen] = React.useState(false);
  const [classs, setClasss] = React.useState(null);
  const [clas, setClas] = React.useState(null)
  const [subject, setSubject] = React.useState(null);
  const [sub, setSub] = React.useState(null);
  const [topic, setTopic] = React.useState(null);
  const [top, setTop] = React.useState(null);
  const [subTopic, setSubTopic] = React.useState(null);
  const [subTop, setSubTop] = React.useState(null);
  const [unit, setUnit] = useState(null)
  const [uni, setUni] = useState(null)
  const {list : SELECTED} = useSelector(state => state.teacherData)
  const initValue = {
    class: "",
    subject: "",
    topic: "",
    subtopic: "",
    unit: "",
  };


  let classSelected = null
  let subjectSelected = null
  let topicSelected = null
  let subTopSelected = null
  let unitSelected = null

  if (SELECTED != undefined) {
    if(SELECTED.data != undefined){
    classSelected = (SELECTED.data.class)
    subjectSelected = (SELECTED.data.subject)
    topicSelected = (SELECTED.data.topic)
    subTopSelected = (SELECTED.data.subtopic)
    unitSelected = (SELECTED.data.unit)
  }
}


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {

    DATA = {
      "class": clas,
      "subject": sub,
      "topic": top,
      "subtopic": subTop,
      "unit": uni}
      
    props.handleSetTeacherData(DATA)
    setOpen(false);
  };

  const fetchClasses = async () => {
    const req = await https.get(`/class-teachers/${teacher}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        setClasss(res.data)
      }).catch(function (err) {
        console.log(err);
      });
    return req
  }
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };

  const [page, setPage] = useState(null);

  const handleChange = (e) => {

    if (e.target.name === "class")
      setClas(e.target.value)

    if (e.target.name === "subject")
      setSub(e.target.value)

    if (e.target.name === "topic")
      setTop(e.target.value)

    if (e.target.name === "subTopic")
      setSubTop(e.target.value)

    if (e.target.name === "unit") {
      setUni(e.target.value)
    console.log("DATA:",DATA)

    }

  }
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
    props.handleFetchTeacherData()
    fetchClasses()
    setSubject()
    setClas(classSelected)
    setSub(subjectSelected)
    setTop(topicSelected)
    setSubTop(subTopSelected)
    setUni(unitSelected)

  },[])
    if (!SELECTED) setOpen(true)

  return (
    <>
      <div className="hd">
        <div className="hd-txt">
          <h2>Overview</h2>
        </div>
        <div className="hd-btn">
          <Link to='/teacher/newAssignment'>
            <Button
              variant="outlined"
              size="medium"
              color="primary">
              New Assignment
                        </Button>
          </Link>
          <Link to='/teacher/newLessonPlan'>
            <Button variant="outlined" size="medium" color="primary">
              New Lesson Plan
                        </Button>
          </Link>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", color: "red" }}>
        <button className="check-btn" onClick={handleClickOpen}>
          Select Subject Topic Sub-topic Unit
            </button>
        <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
          <DialogTitle>select All</DialogTitle>
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {classs &&
                    classs.map(item => (
                      <MenuItem key={item.subject} value={item.subject}>{item.class.level.name}&nbsp;{item.class.combination.name}&nbsp;{item.class.label}</MenuItem>
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>{clas &&
                    <MenuItem key={clas._id} value={clas._id}>{clas.name}</MenuItem>}
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
                  <MenuItem value="">
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
                  <MenuItem value="">
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
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {unit &&
                    unit.map(item => (
                      <MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>
                    ))
                  }
                </TextField>
              </div>
            </form>
            {/* )}
                </Formik> */}
          </DialogContent>
          <DialogActions>
            {/* <Button onClick={handleClose} color="primary">
              Cancel
                </Button> */}
            <Button onClick={handleClose} color="primary">
              Ok
                </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  )
}

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = dispatch => ({
  handleFetchTeacherData : () => {
    dispatch(handleFetchTeacherData())
  },
  handleSetTeacherData : () => {
    dispatch(handleSetTeacherData())
  }
  
  })
export default connect(mapStateToProps, mapDispatchToProps)(FeedHead);
