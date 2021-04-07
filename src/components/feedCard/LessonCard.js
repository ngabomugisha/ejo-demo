import React from 'react'
import './LessonCard.css'
import {Link} from 'react-router-dom'

function LessonCard({title, tag, details, link, time, size, covered, data}) {
    return (<>
        <div className='card-container'>
            <div className='card-hd'>
                <h4 className='card-title'>{title}</h4>
                <h4 className='card2-tag'>{tag}</h4>
            </div>
            <div className='card2-body'>
                <p className='card2-details'>
                    {details}
                </p>
            </div>
            <div className='card2-ft'>
                <p className='card2-time'>
                    {time}
                </p>
                <p className='card2-size'>
                    Expected: {size}
                </p>
                <p className='card2-covered'>
                    Covered: {covered}
                </p>
                <Link to={{
                    pathname: '/teacher/lessonPlan/details',
                    stat: data
            }} >
                <p className='card2-link'>
                    {link.txt}
                </p>
                </Link>

            </div>
        </div>
        </>
    )
}

export default LessonCard
