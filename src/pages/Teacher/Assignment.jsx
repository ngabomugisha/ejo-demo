import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Feed from '../../components/feed/Feed'
import FeedCards from '../../components/feedCards/FeedCards';

function Assignment(props) {
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    return (
        <PanelLayout selected={2} role={role}>
            <div className="assignment-container">
                    <Feed>
                        <FeedCards/>
                        </Feed>
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
