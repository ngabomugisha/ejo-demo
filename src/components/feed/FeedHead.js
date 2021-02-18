import React from 'react'
import './Feed.css'
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import {Link} from 'react-router-dom'


function FeedHead() {
    const history = useHistory()
    return (
        <>
            <div className="hd">
                <div className="hd-txt">
                    <h2>Overview</h2>
                </div>
                <div className="hd-btn">
                    <Link to='/teacher/newAssignment'>
                        <Button
                            variant="outlined"
                            size="medium"
                            color="primary">
                            New Assignment
                        </Button>
                    </Link>
                    <Button variant="outlined" size="medium" color="primary">
                        New Lesson Plan
          </Button>
                </div>
            </div>
        </>
    )
}

export default FeedHead
