import React, { useState } from 'react'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Announcement from '../../components/announcements/Index'
import { useHistory } from 'react-router-dom'


function Main() {
    const history = useHistory()

    const [page, setPage] = useState(null)

    return (
        <>
            {
                sessionStorage.getItem('isloggedin') ?
                    <PanelLayout selected={1} role="headteacher">
                        <Announcement />
                    </PanelLayout>
                    :
                    history.replace('/')
            }
        </>

    )
}

export default Main
