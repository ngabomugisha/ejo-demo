import React from 'react'
import './FeedCards.css'
import FeedCard from '../feedCard/FeedCard'

function FeedCards() {
    return ( 
        <div className='cards'>
            <div className='card'>
                <FeedCard
                    title='Test One (Online)'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Assignment'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    time='12:03pm 26th May, 2020'
                />
            </div>
            <div className='card'>
                <FeedCard
                    title='Test One (Online)'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Assignment'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    time='12:03pm 26th May, 2020'
                />
            </div>

            <div className='card'>
                <FeedCard
                    title='Test One (Online)'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Assignment'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    time='12:03pm 26th May, 2020'
                />
            </div>

            <div className='card'>
                <FeedCard
                    title='Test One (Online)'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Assignment'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    time='12:03pm 26th May, 2020'
                />
            </div>

            <div className='card'>
                <FeedCard
                    title='Test One (Online)'
                    details='Biology is the natural science that studies life and living organisms, including their physical structure, chemical processes, molecular interactions, physiological mechanisms, development and evolution.'
                    tag='Assignment'
                    link={{ txt: 'View More Details', link: 'google.com' }}
                    time='12:03pm 26th May, 2020'
                />
            </div>
    </div>
        )}

export default FeedCards