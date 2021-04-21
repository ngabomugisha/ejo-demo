import React, { useEffect, useState } from 'react'
import './FeedCards.css'
import { connect } from 'react-redux'
import { handleFetchLessonPlanSubject } from '../../store/actions/lessonPlans.actions'
import {handleFetchTeacherData} from '../../store/actions/data/teacher.data.actions'
import { useDispatch } from 'react-redux';
import LessonCard from '../feedCard/LessonCard'
import { makeStyles } from '@material-ui/core/styles';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

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

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [SELECTED, setSELECTED] = useState(props.selected)
  console.log('SELECTED DATA',props.selected, '**************')
  const [fetchedPlans, setFetchedPlans] = useState(props.lesss)
  console.log("FETCHED DATA", fetchedPlans, "**********")
  const dispatch = useDispatch();
  const [subject, setSubject] = React.useState(!SELECTED ? '' :SELECTED.data? SELECTED.data.subject:'');
  const [subjects, setSubjects] = React.useState('');
  const [plans, setPlans] = useState(null)
  let expected = 0
  let covered = 0



  console.log("SUBJECTTTTT:", subject)
  useEffect(() => {
    props.handleFetchTeacherData()
    if((JSON.parse(localStorage.getItem('DATA')))){
      if((JSON.parse(localStorage.getItem('DATA'))).subject !== null)
    {props.handleFetchLessonPlan((JSON.parse(localStorage.getItem('DATA'))).subject)}
    else{
      handleClick()
    }
  }
  }, [])


  return (
    <div className='cards'>
      {
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
 <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          please select the unit first
        </Alert>
      </Snackbar>
      </div>
    </div>
  )
}
function mapStateToProps(state) {
  const lesss = state.lessonPlans
  const selected = state.teacherData.data ? state.teacherData.data.class : null

  return {lesss,selected,state}
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
