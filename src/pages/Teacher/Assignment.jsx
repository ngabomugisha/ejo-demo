import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Feed from '../../components/feed/Feed'
import FeedCards from '../../components/feedCards/FeedCards';

function Assignment(props) {
    return (
        <PanelLayout selected={2} role={props.state.auth.user.role}>
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
