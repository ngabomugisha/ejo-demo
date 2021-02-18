import React from 'react'
import './RightSide.css'
import ReminderCard from '../remCard/ReminderCard'

function RightSide() {
    return (
        <div className='right-side-container'>
            <div className='right-side-hd'>
                <h3>Reminders</h3>
                <p className='time'>
                12:03pm 26th May, 2020
                </p>
            </div>
            <div className='right-cards'>
                <div className='right-card'>
                    <ReminderCard
                        bgcolor='#eef6ff'
                        title='Submit your lesson plan'
                        details='Your lesson plan is due for submission'
                        time='9:30 AM 26th May, 2020'
                        fcolor='#3194f6'
                    />
                </div>

                <div className='right-card'>
                    <ReminderCard
                        bgcolor='#F6F4FF'
                        title='Your next class'
                        details='You have Grade 3B next'
                        time='10:30 AM 26th May, 2020'
                        fcolor='#8B73F4'
                    />
                </div>

                <div className='right-card'>
                    <ReminderCard
                        bgcolor='#FFECE7'
                        title='Your Leave'
                        details='Your leave starts'
                        time='10:30 AM 26th May, 2020'
                        fcolor='#EC795B'
                    />
                </div>

                <div className='right-card'>
                    <ReminderCard
                        bgcolor='#FFFBF1'
                        title='Your Leave'
                        details='Your leave starts'
                        time='10:30 AM 26th May, 2020'
                        fcolor='#E6A90F'
                    />
                </div>
            </div>
        </div>
    )
}

export default RightSide
