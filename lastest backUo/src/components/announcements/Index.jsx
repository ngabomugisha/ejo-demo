import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import './Index.css'
import https from '../../helpers/https'
import StickyBox from "react-sticky-box";
import Message from '../messages/Message/Index'
import { useHistory } from 'react-router-dom'
import MessageBody from '../messages/Message-body/Index'
import ReadMessage from '../messages/Message-body/ReadMessage'
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { handleFetchanouncementsRec, handleFetchanouncementsSent } from '../../store/actions/announcement.actions'
import { set } from 'date-fns/esm';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: '-5px',
        width: 200,

    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));



function Index(props) {
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()
    const dispatch = useDispatch()
    const [body, setBody] = useState('write')
    const [msg, setMsg] = useState(null)
    const [category, setCategory] = useState('received')
    const { list: REC_ANNOUNCEMENT } = useSelector((state) => state.announcementRec);
    const { list: SENT_ANNOUNCEMENT } = useSelector((state) => state.announcementSent);

    const readDetails = (i) => {
        setBody('read')
        console.log('&&&&&&&&&&&&&&&&&&&&', i)
        setMsg(i)
    }
    const handleCategory = (event, newCategory) => {
        setCategory(newCategory);
    };

    const [open, setOpen] = React.useState(false);

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
    };
    const classes = useStyles()
    const [term, setTerm] = React.useState('')
    const [message, setMessage] = useState(null)
    const handleChange = (event) => {
        if (event.target.name === "term") setTerm(event.target.value)
        if (event.target.name === "message") setMessage({
            ...message,
            'announcement' : event.target.value
        })
        if (event.target.name ==='topic') setMessage({
            ...message,
            'topic' : event.target.value
        })
    }


    const onSubmit = async () => {
        console.log("MESSAGE :", message)
        if (message !== null)
            await https.post('/announcements/', message , { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
                if (res.status == 200){
                    setOpen(true);
                    history.replace("/headStudy")
                }
                else
                    return alert("something went wrong")
            })
    }

    useEffect(() => {      
    dispatch(handleFetchanouncementsRec())
    dispatch(handleFetchanouncementsSent())
    if(REC_ANNOUNCEMENT) setIsLoading(false)
    }, [])

    return (
        <>
            <div className="announcement-container">
                <StickyBox>
                    <div className="head">
                        <div className="head-btn">
                            <ToggleButtonGroup
                                value={category}
                                exclusive
                                onChange={handleCategory}
                                aria-label="text alignment"
                            >
                                <ToggleButton value="received" aria-label="center aligned">
                                    Received
                            </ToggleButton>
                                <ToggleButton value="sent" aria-label="center">
                                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Sent&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            </ToggleButton>
                            </ToggleButtonGroup>
                            {/* <button id='unread'>Received</button>
                            <button id='sent'>Sent</button> */}
                        </div>
                        <Button color="primary" variant="outlined" size="medium" onClick={() => setBody('write')}>New Message</Button>
                    </div>
                </StickyBox>
                <div className="msgs-container" style={{ height: "100vh", overflow: 'auto' }}>
                    <div className="msgs">



                        {!isLoading ?
                        (category === 'received' ?
                            REC_ANNOUNCEMENT &&
                            REC_ANNOUNCEMENT.map(item => (
                                <div className="message" onClick={() => readDetails(item)} >
                                    <Message time={item.createdAt} starter={(item.sender.firstName).substring(0, 1) + (item.sender.lastName).substring(0, 1)} sender={item.sender.firstName + "  " + item.sender.lastName} announcement={item.topic} />
                                </div>
                            ))
                            :
                            SENT_ANNOUNCEMENT &&
                            SENT_ANNOUNCEMENT.map(item => (
                                <div className="message" onClick={() => readDetails(item)}>
                                    <Message time={item.createdAt} starter={(item.sender.firstName).substring(0, 1) + (item.sender.lastName).substring(0, 1)} sender={item.sender.firstName + "  " + item.sender.lastName} announcement={item.topic} />
                                </div>
                            )))
                        :
                        <p>loading</p>
                    }




                    </div>




                    {body === 'write' ?
                        <div className="msg-body">
                            <div className="body-container">
                                <div className='select-field'>
                                    <FormControl variant="outlined" className={classes.formControl}>
                                        <InputLabel id="demo-simple-select-outlined-label">Receivers</InputLabel>
                                        <Select
                                            labelId="demo-simple-select-outlined-label"
                                            id="demo-simple-select-outlined"
                                            value={term}
                                            onChange={handleChange}
                                            label="Receivers"
                                            color="primary"
                                            name="term"
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={"First Term"}>All</MenuItem>
                                        </Select>
                                    </FormControl>
                                </div>
                                <div className="msg-field">
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Topic"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder="Topic"
                                        color="primary"
                                        multiline={false}
                                        name="topic"
                                    />
                                </div>
                                <div className="msg-field">
                                    <TextField
                                        id="outlined-basic"
                                        variant="outlined"
                                        label="Message"
                                        type="text"
                                        onChange={handleChange}
                                        placeholder=" "
                                        color="primary"
                                        multiline={true}
                                        rowsMax="15"
                                        rows="15"
                                        name="message"
                                    />
                                </div>
                                <div className="send-btn">
                                    <Button color='primary' className="btn-next" size="large"
                                        onClick={() => onSubmit()}
                                        style={{
                                            borderRadius: 5,
                                            backgroundColor: "#1f75c6",
                                            padding: "7px 15px",
                                            fontSize: "15px",
                                            color: "#fff",
                                            width: '200px',
                                            textTransform: 'capitalize'
                                        }}
                                    >
                                        Send
                                    </Button>
                                </div>
                                <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                                    <Alert onClose={handleClose} severity="success">
                                        Announcement sent!
                                    </Alert>
                                </Snackbar>
                            </div>
                        </div>
                        : msg != null ?
                            <div className="msg-body">
                                <ReadMessage data={msg} />
                            </div> : null
                    }
                </div>
            </div >
        </>

    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = (dispatch) => ({
    handleFetchanouncementsSent: () => {
        dispatch(handleFetchanouncementsSent)
    },
    handleFetchanouncementsRec: () => {
        dispatch(handleFetchanouncementsRec)
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)