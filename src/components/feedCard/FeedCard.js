import React from 'react'
import './FeedCard.css'

function FeedCard({title, tag, details, link, time, size, covered}) {
    return (
        <div className='card-container'>
            <div className='card-hd'>
                <h4 className='card-title'>{title}</h4>
                <h4 className='card-tag'>{tag}</h4>
            </div>
            <div className='card-body'>
                <p className='card-details'>
                    {details}
                </p>
            </div>
            <div className='card-ft'>
                <p className='card-time'>
                    {time}
                </p>
                <p className='card-size'>
                    Expected: {size}
                </p>
                <p className='card-covered'>
                    Cover: {covered}
                </p>
                <p className='card-link'>
                    {link.txt}
                </p>

            </div>
        </div>
    )
}

export default FeedCard
