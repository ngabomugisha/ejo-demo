import React, { useEffect, useState } from 'react'
import './FeedCards.css'
import https from '../../helpers/https'
import { connect } from 'react-redux'
import {useHistory} from 'react-router-dom'
import { handleFetchLessonPlanSubject } from '../../store/actions/lessonPlans.actions'
import {handleFetchTeacherData} from '../../store/actions/data/teacher.data.actions'
import { useDispatch } from 'react-redux';
import LessonCard from '../feedCard/LessonCard'
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { Button, Dialog, TextField, MenuItem } from "@material-ui/core";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function LessonCards(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [openAlert, setOpenAlert] = React.useState(false);

  const handleClick = () => {
    setOpenAlert(true);
  };

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
  console.log('SELECTED DATA',props.selected, '**************')
  const [fetchedPlans, setFetchedPlans] = useState(props.lesss)
  console.log("FETCHED DATA", fetchedPlans, "**********")
  const dispatch = useDispatch();
  const [subjects, setSubjects] = React.useState('');
  const [plans, setPlans] = useState(null)
  let expected = 0
  let covered = 0



  // console.log("SUBJECTTTTT:", subject)
  useEffect(() => {
    props.handleFetchTeacherData()
    if((JSON.parse(localStorage.getItem('DATA')))){
      if((JSON.parse(localStorage.getItem('DATA'))).subject !== null)
    {setSubject((JSON.parse(localStorage.getItem('DATA'))).subject)
      props.handleFetchLessonPlan(subject)}
    else{
      handleClick()
    }
  }
  }, [])

  const teacher = props.state.auth.user._id;
  const history = useHistory();
  const [DATA, setDATA] = useState(null)
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
  const [page, setPage] = useState(null);
  const [SELECTED, setSELECTED] = useState(null)
  const initValue = {
    class: "",
    subject: "",
    topic: "",
    subtopic: "",
    unit: "",
  };


    // let classSelected = (SELECTED.data.class)
    // let subjectSelected = (SELECTED.data.subject)
    // let topicSelected = (SELECTED.data.topic)
    // let subTopSelected = (SELECTED.data.subtopic)
    // let unitSelected = (SELECTED.data.unit)

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    const done = {
      "class": clas,
      "subject": sub,
      "topic": top,
      "subtopic": subTop,
      "unit": uni}
    localStorage.setItem('DATA', JSON.stringify(done))
    //   if(DATA.class && DATA.subject)   
    // props.handleSetTeacherData(DATA)
    // setOpen(false);
    console.log("UPDATED DATA", JSON.parse(localStorage.getItem('DATA')))
    setOpen(false)
  };

  const fetchClasses = async () => {
    console.log(teacher)
    const req = await https.get(`/class-teachers/${teacher}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        setClasss(res.data)
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
      });
    return req
  }
  const onSubmit = (values) => {
    alert(JSON.stringify(values));
  };


  const handleChange = (e) => {

    if (e.target.name === "class"){
      setClas(e.target.value)
    }

    if (e.target.name === "subject")
      setSub(e.target.value)

    if (e.target.name === "topic")
      setTop(e.target.value)

    if (e.target.name === "subTopic")
      setSubTop(e.target.value)

    if (e.target.name === "unit") {
      setUni(e.target.value)

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
   
    // if(props.teacherData != null){
    //   setSELECTED(props.teacherData.data)
    // }
    if (JSON.parse(localStorage.getItem('data')) === undefined) {

      // props.handleFetchTeacherData()
        setOpen(true)
      }
setClas((JSON.parse(localStorage.getItem('DATA'))) ? (JSON.parse(localStorage.getItem('DATA'))).class : null)
setSub((JSON.parse(localStorage.getItem('DATA'))) ? (JSON.parse(localStorage.getItem('DATA'))).subject : null)
setTop((JSON.parse(localStorage.getItem('DATA'))) ? (JSON.parse(localStorage.getItem('DATA'))).topic : null)
setSubTop((JSON.parse(localStorage.getItem('DATA'))) ? (JSON.parse(localStorage.getItem('DATA'))).subtopic : null)
setUni((JSON.parse(localStorage.getItem('DATA'))) ? (JSON.parse(localStorage.getItem('DATA'))).unit : null)


  },[])
  return (
    <div className='cards'>
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
                  <MenuItem value={null}>
                    <em>None</em>
                  </MenuItem>
                  {classs &&
                    classs.map(item => (
                      <MenuItem key={item.subject} value={item.subject}>{!item ? '' : !item.class!=null && !item.class!=undefined ? '' : !item.class.level ? '' :item.class.level.name}&nbsp;{!item ? '' : !item.class ? '' : !item.class.combination ? '' : !item.class.combination ? '' : item.class.combination.name}&nbsp;{!item? "" : !item.class ? "" : item.class.label ? item.class.label : ''}</MenuItem>
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
      {JSON.parse(localStorage.getItem('DATA')) && JSON.parse(localStorage.getItem('DATA')).subject !== null && JSON.parse(localStorage.getItem('DATA')) && sub &&
        fetchedPlans.list &&
        fetchedPlans.list.map(
          item => (
            <div className='card'>
              <LessonCard
                title={item.lessonName}
                details={item.keyUnitCompetency}
                tag='Lesson plan'
                link={{ txt: 'View More Details', link: 'google.com' }}
                size={7}
                covered={4}
                time={(item.time.day).substring(0, 10)}
                data={item}
              />
            </div>
          )
        )
      }

    <div className={classes.root}>
 <Snackbar open={openAlert} autoHideDuration={6000} onClose={handleCloseAlert}>
        <Alert onClose={handleCloseAlert} severity="info">
           select a 'subject' to get Lesson plans
        </Alert>
      </Snackbar>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  const lesss = state.lessonPlans
  // const selected = state.teacherstate.teacherData.data ? state.teacherData.data.class : null

  return {lesss,state}
}

const mapDispatchToProps = dispatch =>({
  handleFetchTeacherData : () => {
    dispatch(handleFetchTeacherData())
  },
  handleFetchLessonPlan: (data) => {
    dispatch(handleFetchLessonPlanSubject(data))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(LessonCards)
