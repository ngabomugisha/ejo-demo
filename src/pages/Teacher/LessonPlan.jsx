import React from 'react'
import { connect } from 'react-redux'
import './style.css'

export const LessonPlan = (props) => {
    return (
        <div className="lesson">
            <h1>LessonPlan home</h1>
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlan)
