import React from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import RemoteData from '../../../components/schoolAdmin/TimeTable'


export const Index = (props) => {
    return (
        <div>
            <PanelLayout selected={4} role={props.state.auth.user.role} >
                <RemoteData/>
            </PanelLayout>
            
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
