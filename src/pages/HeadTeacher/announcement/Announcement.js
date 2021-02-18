import React from 'react'
import './Announcement.css'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { useHistory } from 'react-router-dom'
import ReadAnouncement from '../../../components/announcements/ReadAnnouncement'



function Announcement() {
    const history = useHistory()
    return (
        <>
            <PanelLayout selected={1} role="headteacher">
                <ReadAnouncement/>
            </PanelLayout>
        </>
    )
}

export default Announcement
