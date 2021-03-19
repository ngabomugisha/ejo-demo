import React from 'react'
import './Index.css'
import Button from '@material-ui/core/Button'
import StickyBox from "react-sticky-box";
import Message from '../messages/Message/Index'
import ReadMessage from '../messages/Message-body/ReadMessage'


function ReadAnnouncement(){
    return(
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
                    <div className="message" >
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
                    <ReadMessage/>
                </div>
            </div>
        </div >
        </>
    );
}

export default ReadAnnouncement;

