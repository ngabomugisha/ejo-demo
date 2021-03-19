import React from 'react'
import './ReminderCard.css'
import { BsClock } from "react-icons/bs";

function ReminderCard({title, details, time ,bgcolor, fcolor}) {
    return (
        <div className='reminder-container' style={{backgroundColor: bgcolor, color: fcolor}}>
            <h4>{title}</h4>
            <p>{details}</p>
            <p><BsClock style={{color:fcolor,marginTop: '12px',paddingRight:'10px'}}/>{time}</p>
        </div>
    )
}

export default ReminderCard
