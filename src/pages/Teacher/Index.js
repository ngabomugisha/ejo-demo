import React ,{useState}from 'react'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import Feed from '../../components/feed/Feed'


function Main() {

const [page, setPage] = useState(null)

    return (
        <>
            <PanelLayout selected={1} role="teacher">
                <Feed/>
            </PanelLayout>

        </>

    )
}

export default Main
