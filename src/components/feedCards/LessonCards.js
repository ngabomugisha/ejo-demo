import React from 'react'
import './FeedCards.css'
import LessonCard from '../feedCard/LessonCard'

function LessonCards() {
    return ( 
        <div className='cards'>
            <div className='card'>
                <LessonCard
                    title='Topic: Importance of Biology'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Lesson plan'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    size={5}
                    covered={4}
                    time='12:03pm 26th May, 2020'
                />
            </div>
            <div className='card'>
                <LessonCard
                    title='Topic: Importance of Biology'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Lesson plan'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    size={5}
                    covered={4}
                    time='12:03pm &nbsp;&nbsp;&nbsp; 26th May, 2020'
                />
            </div>

            <div className='card'>
                <LessonCard
                    title='Topic: Importance of Biology'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Lesson plan'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    size={5}
                    covered={4}
                    time='12:03pm &nbsp;&nbsp;&nbsp; 26th May, 2020'
                />
            </div>

            <div className='card'>
                <LessonCard
                    title='Topic: Importance of Biology'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Lesson plan'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    size={5}
                    covered={4}
                    time='12:03pm &nbsp;&nbsp;&nbsp; 26th May, 2020'
                />
            </div>

            <div className='card'>
                <LessonCard
                    title='Topic: Importance of Biology'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Lesson plan'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    size={5}
                    covered={4}
                    time='12:03pm &nbsp;&nbsp;&nbsp; 26th May, 2020'
                />
            </div>
    </div>
        )}

export default LessonCards