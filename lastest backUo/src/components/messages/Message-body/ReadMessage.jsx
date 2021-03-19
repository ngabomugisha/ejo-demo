import React from 'react'
import './Index.css'
import Button from '@material-ui/core/Button'
import {useHistory, Link} from 'react-router-dom'

function ReadMessage() {
    const history = useHistory()
    return (
        <div className='msg-body-container'>
            <h3>James Fred</h3>
            <h5>Topic: Sed ut perspiciatis unde omnisiste natus error sit voluptatem</h5>
            <div className='time'>
                <span>12:09 pm</span><span>4th May, 2020</span><span></span><span></span><span><span></span></span><span></span>
            </div>
            <hr/>
            <div className='body'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includ ing versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/><br/> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div>
            <div className='reply'><Link>Reply</Link></div>
            
        </div>
    )
}

export default ReadMessage
