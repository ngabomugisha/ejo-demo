import React from 'react'
import './Index.css'
import Button from '@material-ui/core/Button'
import {useHistory, Link} from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    maxWidth: '60%',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    minWidth: "100%",
    height: 350,
  },
}));


function ReadMessage({data}) {
    const classes = useStyles();
    console.log("******************",data)
    const history = useHistory()
    return (
        <div className='read-body-container'>
            <h3>{ data && data.sender.firstName} {" "} { data && data.sender.lastName} </h3>
            <h5>Topic: {data.topic}</h5>
            <div className='time'>
                <span>{(data.createdAt).substring(11,16)}</span><span></span><span>{(data.createdAt).substring(0,10)}</span>
            </div>
            <hr/>
            {/* <div className='body'>
                <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker includ ing versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. <br/><br/> Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
            </div> */}

    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
      <div className='body'>
                <p>{data.announcement}.</p>
            </div>
      </GridList>
    </div>
            {/* <div className='reply'><Link>Reply</Link></div> */}
            
        </div>
    )
}

export default ReadMessage
