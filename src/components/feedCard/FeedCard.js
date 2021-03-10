import React from 'react'
import './FeedCard.css'
import {Grid} from '@material-ui/core'

function FeedCard({title, tag, details, link, time, size, covered}) {
    return (
        <div className='card-container'>
            <div className='card-hd'>
                <h4 className='card-title'>{title}</h4>
                <h4 className='card-tag'>{tag}</h4>
            </div>
            <div className='card-body'>
                <p className='card-details'>
                    <div>
                            <p>Practice Group Work</p>
                    </div>
                    <div className="row1">
                        <div>
                            <p>Question 1:</p>
                        </div>
                        <div>
                            <p>40 Marks</p>
                        </div>
                        <div>
                            <p>Remembraning</p>
                        </div>
                    </div>
                    <div className="row1">
                        <div>
                            <p>Question 2:</p>
                        </div>
                        <div>
                            <p>20 Marks</p>
                        </div>
                        <div>
                            <p>Remembraning</p>
                        </div>
                    </div>
                    <div className="row1">
                        <div>
                            <p style={{fontWeight: 800}}>Total:</p>
                        </div>
                        <div>
                            <p style={{fontWeight: 800}}>60 Marks</p>
                        </div>
                        <div>
                        </div>
                    </div>
                </p>
            </div>
            <div className='card-ft'>
                <p className='card-time'>
                    {time}
                </p>
                <p className='card-size'>
                </p>
                <p className='card-covered'>
                </p>
                <p className='card-link'>
                    {link.txt}
                </p>

            </div>
        </div>
    )
}

export default FeedCard
