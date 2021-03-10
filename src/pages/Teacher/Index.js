import React, { useState } from 'react'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Feed from '../../components/feed/Feed'
import { useHistory } from 'react-router-dom'
import Mixed from '../../components/feedCards/Mixed';


function Main(props) {
    const history = useHistory()
    const [page, setPage] = useState(null)

    return (
        <>
            {sessionStorage.getItem('isloggedin') ?
                <PanelLayout selected={1} role={props.state.auth.user.role}>
                    <Feed>
                        <Mixed/>
                        </Feed>
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

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
