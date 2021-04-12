import React from 'react'
import './Index.css'

function Index({announcement, sender ,starter, time}) {
    return (
        <div className="msg-container">
            <div className="card-hd">
                <h3>{starter && starter.toUpperCase()}</h3>
            </div>
            <div className="card-body">
                <h3>{sender && sender}</h3>
                <p>{announcement && announcement}</p>
                <div className="time">
                    <span>{time && time.substring(11,16)}</span>
                    <span>{time && time.substring(0,10)}</span>
                </div>
            </div>
        </div>
    )
}

export default Index
