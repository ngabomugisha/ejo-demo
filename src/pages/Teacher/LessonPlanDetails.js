import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import LessonPlanDetailsComponent from '../../components/newLessonplan/lessonPlanDetailsComponent/index'

export const LessonPlanDetails = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    return (
        <div>
        <PanelLayout selected={3} role={role}>
                <LessonPlanDetailsComponent data={props.location.stat}/>
            </PanelLayout>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state : state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlanDetails)
