import React from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import {useHistory} from 'react-router-dom'

export const Index = (props) => {
    const history = useHistory()
    return (
        <>
        {!props.state.auth.user ? history.replace('/'):
            <PanelLayout selected={1} role={props.state.auth.user.role}>
                <h3>super admin</h3>
                {/* <p>{props.state.auth.user}</p> */}
            </PanelLayout>
}
        </>
    )
}

const mapStateToProps = (state) => ({
    state : state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
