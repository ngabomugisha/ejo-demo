import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import LessonPlanDetailsComponent from '../../components/newLessonplan/lessonPlanDetailsComponent/index'

export const LessonPlanDetails = (props) => {
    return (
        <div>
        <PanelLayout selected={3} role={props.state.auth.user.role}>
                <LessonPlanDetailsComponent/>
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
