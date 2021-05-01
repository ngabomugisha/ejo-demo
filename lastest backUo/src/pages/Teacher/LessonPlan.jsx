import React, { useEffect, useState } from 'react'
import { connect , useDispatch, useSelector} from 'react-redux'
import './style.css'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Feed from '../../components/feed/Feed'
import LessonCards from '../../components/feedCards/LessonCards';
import { handleFetchLessonPlanSubject } from '../../store/actions/lessonPlans.actions'

export const LessonPlan = (props) => {
    const dataSelected = JSON.parse(localStorage.getItem('DATA'))
    const dispatch = useDispatch()
    const SELECTED = useSelector(state => state.teacherData)
          const fetchLessonPlan = async (subject) => {
            console.log("TRY TO FETCH DATA")
            try {
                await dispatch(handleFetchLessonPlanSubject(subject));
            } catch (error) {
                alert(error)
            } 
        };
  useEffect(() => {
    if(dataSelected != null && dataSelected.subject != "" && dataSelected.subject){
        fetchLessonPlan(dataSelected.subject)
    }
  }, [])


    return (
        <PanelLayout selected={3} role={props.state.auth.user.role}>
        <div className="assignment-container">
                <Feed>
                    <LessonCards/>
                    </Feed>
        </div>
        </PanelLayout>
    )
}

const mapStateToProps = (state) => ({
    state : state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlan)
