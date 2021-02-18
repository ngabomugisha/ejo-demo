import React ,{useState}from 'react'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Announcement from '../../components/announcements/Index'


function Main() {

const [page, setPage] = useState(null)

    return (
        <>
            <PanelLayout selected={1} role="headteacher">
                <Announcement/>
            </PanelLayout>

        </>

    )
}

export default Main
