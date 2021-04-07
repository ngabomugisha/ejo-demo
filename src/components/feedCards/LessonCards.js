import React, { useEffect, useState } from 'react'
import './FeedCards.css'
import { connect } from 'react-redux'
import https from '../../helpers/https'
import { handleFetchLessonPlan } from '../../store/actions/lessonPlans.actions'
import { useDispatch, useSelector } from 'react-redux';
import LessonCard from '../feedCard/LessonCard'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import PlacesSmokingRooms from 'material-ui/svg-icons/places/smoking-rooms';


function LessonCards(props) {
  const SELECTED = useSelector(state => state.teacherData)
  const fetchedPlans = useSelector(state => state.lessonPlans)
  console.log("FETCHED DATA", fetchedPlans, "**********")
  const dispatch = useDispatch();
  const [subject, setSubject] = React.useState(SELECTED.data.subject);
  const [subjects, setSubjects] = React.useState('');
  const [plans, setPlans] = useState(null)
  let expected = 0
  let covered = 0


  //get lesson plan from selected unit
  const fetchLessonPlan = async (subject) => {
    try {
      await dispatch(handleFetchLessonPlan(subject));
    } catch (error) {
      alert(error)
    }
  };


  useEffect(() => {

    fetchLessonPlan(subject)

  }, [])


  return (
    <div className='cards'>



      {
        fetchedPlans.list &&
        fetchedPlans.list.map(
          item => (

            <div className='card'>
              <LessonCard
                title={item.name}
                details={item.keyCompetency}
                tag='Lesson plan'
                link={{ txt: 'View More Details', link: 'google.com' }}
                size={7}
                covered={4}
                time={(item.time.start).substring(0, 10)}
                data={item}
              />
            </div>
          )
        )
      }

    </div>
  )
}

function mapStateToProps(state) {
  const lesss = state.lessonPlans
  return (lesss)
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(LessonCards)
