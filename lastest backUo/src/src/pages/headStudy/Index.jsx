
import React, { useState } from 'react'
import {connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Announcement from '../../components/announcements/Index'
import { useHistory } from 'react-router-dom'


function Index(props) {
    const history = useHistory()

    const [page, setPage] = useState(null)

    return (
        <>
            {
                sessionStorage.getItem('isloggedin') ?
                    <PanelLayout selected={1} role={props.state.auth.user.role}>
                        <Announcement />
                    </PanelLayout>
                    :
                    history.replace('/')
            }
        </>

    )
}
const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Index)