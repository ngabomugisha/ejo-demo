import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'

function Assignment(props) {
    return (
        <PanelLayout selected={2} role={props.state.auth.user.role}>
            <div className="assignment-container">
                <h1>assignmetn scree</h1>
            </div>
        </PanelLayout>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Assignment)
