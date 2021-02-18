import React from 'react'
import './Index.css'
import Button from '@material-ui/core/Button'
import StickyBox from "react-sticky-box";
import Message from '../messages/Message/Index'
import { useHistory } from 'react-router-dom'
import MessageBody from '../messages/Message-body/Index'


function Index() {
    const history = useHistory()
    return (
        <>
        <div className="announcement-container">
            <StickyBox>
                <div className="head">
                    <div className="head-btn">
                        <button id='unread'>Unread 60</button>
                        <button id='sent'>Sent</button>
                    </div>
                    <Button color="primary" variant="outlined" size="medium">New Message</Button>
                </div>
            </StickyBox>
            <div className="msgs-container" style={{ height: "100vh", overflow: 'auto' }}>
                <div className="msgs">
                    <div className="message" onClick={() => { history.push('headteacher/announcement') }} >
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                    <div className="message">
                        <Message />
                    </div>
                </div>
                <div className="msg-body">
                    <MessageBody />
                </div>
            </div>
        </div >
        </>

    )
}

export default Index
