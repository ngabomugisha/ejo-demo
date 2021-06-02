import React, { useState, useEffect } from 'react'
import './LessonCard.css'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'
import PrintDetail from '../../components/newLessonplan/lessonPlanDetailsComponent/PrintLessonPlan'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import https from '../../helpers/https'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import ModalFooter from 'react-bootstrap/ModalFooter'
import ModalBody from 'react-bootstrap/ModalBody'
import ModalTitle from 'react-bootstrap/ModalTitle'
import ModalHeader from 'react-bootstrap/ModalHeader'
import ModalDialog from 'react-bootstrap/ModalDialog'
import Modal from 'react-bootstrap/Modal'



import { handleFetchSubject } from '../../store/actions/subjects.actions'
const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

function LessonCard(props) {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [show, setShow] = useState(false)
  const [subjects, setSubjects] = useState([])
  const [covered, setCovered] = useState(null)
  const [expected, setExpected] = useState(null)
  const [unitData, setUnitData] = useState(null)
  const [ title, setTitle] = useState("")
  const [knowledge, setKnowledge] = useState([])
  const [skills, setSkills] = useState([])
  const [attitude, setAttitude] = useState([])


  const displayExpected = () => {
    setTitle("Expected Units")

    setKnowledge(unitData.content.knowledgeAndUnderstanding)

    setSkills(unitData.content.skills)

    setAttitude(unitData.content.attitudesAndValues)

    handleShow()
  }

  const displayCovered = () => {
    setTitle("Covered Units")

    setKnowledge(unitData.content.knowledgeAndUnderstanding.filter(val => {
      return val.numberOftimesTaught !== 0
    })) 

    setSkills(unitData.content.skills.filter(val => {
      return val.numberOftimesTaught !== 0
    })) 

    setAttitude(unitData.content.attitudesAndValues.filter(val => {
      return val.numberOftimesTaught !== 0
    }))

    handleShow()
  }

  const handleClickOpen = () => {
    if (props.data)
      setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClose2 = () => setShow(false);
  const handleShow = () => setShow(true);


  const countExpected = (value) => {
    // console.log("EXPECTED FCK DATA", knowledge,",",skills,",",attitude)
    let knowledge = value.content.knowledgeAndUnderstanding.length
    let skills = value.content.skills.length
    let attitude = value.content.attitudesAndValues.length
    return knowledge + skills + attitude
  }

  const countCovered = (value) => {
    let knowledge = value.content.knowledgeAndUnderstanding.filter(val => {
      return val.numberOftimesTaught !== 0
    })
    let skills = value.content.skills.filter(val => {
      return val.numberOftimesTaught !== 0
    })
    let attitude = value.content.attitudesAndValues.filter(val => {
      return val.numberOftimesTaught !== 0
    })
    return knowledge.length + skills.length + attitude.length
  }

  const fetchUintPlan = unitPlanId => {
    https.get(`/lessons/unit-plans/${unitPlanId}`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        // console.log("---------", res.data, "-----------")
        setCovered(countCovered(res.data))
        setExpected(countExpected(res.data))
        setUnitData(res.data)
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
      });
  }

// console.log("KNOWLEDGE :",knowledge , "skills", skills, "Attitude", attitude)

  useEffect(() => {
    fetchUintPlan(props.covered)
  }, [])
  return (<>
    <div className='card-container'>
      <div className='card-hd'>
        <h4 className='card-title'>{props.title}</h4>
        <h4 className='card2-tag'>{props.tag}</h4>
      </div>
      <div className='card2-body'>
        <p className='card2-details'>
          {props.details}
        </p>
      </div>
      <div className='card2-ft'>
        <p className='card2-time'>
          {props.time}
        </p>
        <p className='card2-size' onClick={displayExpected}  style={{ cursor: "pointer" }}>
          Expected: {expected}
        </p>
        <p onClick={displayCovered} className='card2-covered' style={{ cursor: "pointer" }}>
          Covered: {covered}
        </p>
        <p className='card2-link' onClick={handleClickOpen}>
          {props.link.txt}
        </p>
        {/* </Link> */}

      </div>
    </div>

    <Dialog fullScreen open={open} onClose={handleClose} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
            <CloseIcon />
          </IconButton>
          <Typography variant="h7" className={classes.title}>
            Lesson Plan Details
            </Typography>
          <Button autoFocus color="inherit" onClick={handleClose}>
            Quit
            </Button>
        </Toolbar>
      </AppBar>
      <PrintDetail lessonPlan={props.data} subjects={subjects} />
    </Dialog>


    <Modal show={show} onHide={handleClose2} animation backdrop size="xl">
      <Modal.Header closeButton>
        <Modal.Title><span style={{color: "#1F72C6"}}>{title}</span></Modal.Title>
      </Modal.Header>
      <Modal.Body>
<div style={{padding:"20px"}}>
        <h3 style={{color: "#0c393c"}}>Knowledge: Topics</h3>
            {
              knowledge &&
              knowledge.map(item => (
                <li>
                  <span>{item.topic}</span>
                </li>
              ))
            } 
<hr/>
        <h3 style={{color: "#0c393c"}}>Skills: Topics</h3>
            {
              skills &&
              skills.map(item => (
                <li>
                  <span>{item.topic}</span>
                </li>
              ))
            } 
<hr/>
        <h3 style={{color: "#0c393c"}}>Attitude and values: Topics</h3>
            {
              attitude &&
              attitude.map(item => (
                <li>
                  <span>{item.topic}</span>
                </li>
              ))
            } 
</div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose2}>
          Close
          </Button>
        {/* <Button variant="primary" onClick={handleClose2}>
            Save Changes
          </Button> */}
      </Modal.Footer>
    </Modal>


  </>
  )
}

const mapStateToProps = (state) => {
  const { subjects } = state
  // const list = subjects.list
  return {
    state,
  }
}
const mapDispatchToProps = dispatch => ({
  handleFetchSubject: async () => {
    await dispatch(handleFetchSubject())
  },

})
export default connect(mapStateToProps, mapDispatchToProps)(LessonCard)
