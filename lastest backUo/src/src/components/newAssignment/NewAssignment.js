import React, { useState } from 'react'
import './NewAssignment.css'
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import PanelLayout from '../Layouts/PanelLayout/Index'
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';
import Slide2 from './assignmentSlide/Slide2'
import Slide1 from './assignmentSlide/Slide1'
import Slide3 from './assignmentSlide/Slide3';
import Slide4 from './assignmentSlide/Slide4';
import Slide5 from './assignmentSlide/Slide5';

const useStyles = makeStyles({
  root: {
    width: '100%',
  },
});



function NewAssignment() {

  const history = useHistory()
  const assignment = {
    date: null,
    topic: null,
    assType: null,
    testDuration: null,
    assKind: null,
    numQuestions: null,
    ansFormat: null,
    hintQuestion: null,
    totalMarks: null,
    questionLibary: null,
    newQuestion: null,
    ansquestion: null
  }



  const classes = useStyles();
  const [newAssignment, setNewAssignment] = React.useState({})
  const [progress, setProgress] = React.useState(20);

  function renderSwitch(progress) {
    switch (progress) {
      case 20:
        return <Slide1 />
        break;
      case 40:
        return <Slide2 />
        break;
      case 60:
        return <Slide3 />
        break;
      case 80:
        return <Slide4 />
        break;
      case 100:
        return <Slide5 />
        break;

      default:
        return setProgress(20)
        break;
    }
  }
  return (
    <>
      <PanelLayout selected={2} role="teacher">
        <div className="new-ass-container">
          <div className={classes.root}>
            <LinearProgress variant="determinate" value={progress} />
          </div>
          <div className='assignment-field'>
            {renderSwitch(progress)}
          </div>
          <div className='ft-btn'>
            {

              progress < 100 ? <Button color='primary' className="btn-next" size="large"
                style={{
                  borderRadius: 5,
                  backgroundColor: "#1f75c6",
                  padding: "7px 15px",
                  fontSize: "15px",
                  color: "#fff",
                  width: '200px',
                  textTransform: 'capitalize'
                }}
                onClick={() => setProgress(progress + 20)}
              >
                Next
                </Button> : <Button color='primary' className="btn-next" size="large"
                  style={{
                    borderRadius: 5,
                    backgroundColor: "#1f75c6",
                    padding: "7px 15px",
                    fontSize: "15px",
                    color: "#fff",
                    width: '200px',
                    textTransform: 'capitalize'
                  }}
                  onClick={() => history.replace("/teacher")}
                >
                  Submit
                </Button>
            }

          </div>
        </div>
      </PanelLayout>
    </>
  )
}

export default NewAssignment;
