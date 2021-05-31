import React, {useState, useEffect} from 'react'
import './LessonCard.css'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import PrintDetail from '../../components/newLessonplan/lessonPlanDetailsComponent/PrintLessonPlan'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import https  from '../../helpers/https'
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import { handleFetchSubject} from '../../store/actions/subjects.actions'
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
    const [subjects, setSubjects] = useState([])
    const [covered, setCovered] = useState(null)
    const [expected, setExpected] = useState(null)
    const handleClickOpen = () => {
      if(props.data)
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };


    const countExpected  = (value)=>{
      let knowledge = value.content.knowledgeAndUnderstanding.length
      let skills = value.content.skills.length
      let attitude = value.content.attitudesAndValues.length
      return knowledge + skills + attitude
  }
  
  const countCovered = (value)=>{
      let knowledge = value.content.knowledgeAndUnderstanding.filter(val=>{
          return val.numberOftimesTaught !== 0
      })
  
      let skills = value.content.skills.filter(val=>{
          return val.numberOftimesTaught !== 0
      })
  
      let attitude = value.content.attitudesAndValues.filter(val=>{
          return val.numberOftimesTaught !== 0
      })
      // setCover(knowledge.length+skills.length+attitude.length)
      return 12
  }
   
    const fetchUintPlan = unitPlanId => {
      https.get(`/lessons/unit-plans/${unitPlanId}`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
      .then((res) => {
        console.log("---------", res.data, "-----------")
        setCovered(countCovered(res.data))
        setExpected(countExpected(res.data))
      }).catch(function (err) {
        console.log(err, '***********ERRRORR***********');
      });
    }
    



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
                <p className='card2-size'>
                    Expected: {expected}
                </p>
                <p className='card2-covered'>
                    Covered: {covered}
                </p>
                {/* <Link to={{
                    pathname: '/teacher/lessonPlan/details',
                    state: {data: data}
            }} > */}
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
       <PrintDetail lessonPlan = {props.data} subjects={subjects}/>
      </Dialog>

        </>
    )
}

const mapStateToProps = (state) => {
    const {subjects} = state
    // const list = subjects.list
  return{
    state,
  }
}

const mapDispatchToProps = dispatch => ({
  handleFetchSubject: async () => {
      await dispatch(handleFetchSubject())
  },

})

export default connect(mapStateToProps, mapDispatchToProps)(LessonCard)
