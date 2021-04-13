import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import './style.css'
import https from '../../helpers/https'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import 'bootstrap/dist/css/bootstrap.min.css'
import MenuItem from '@material-ui/core/MenuItem';
import { Formik, Field, Form } from 'formik'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { KeyboardTimePicker } from '@material-ui/pickers'
import * as Yup from "yup";
import { isSameOrBeforeTime, isSameOrAfterTime } from "./util";
import {handleFetchClasses} from '../../store/actions/classes.actions'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
export const TimetableForm = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined){if(props.state.auth.user != undefined) {school = props.state.auth.user.school; role = props.state.auth.user.role}}
  
    const [open, setOpen] = React.useState(false);
    const [openformMsg, setOpenformMsg] = React.useState(false);
    const [msg, setMsg] = useState('')
    const [msgtype, setMsgtype] = useState('')
    const classes = useStyles();
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpen(false);
        setOpenformMsg(false)
    };

    const initialValue = {
        "assignedClass": "",
        "teacher": "",
        "subject": "",
        "term": "",
        "starts": "",
        "ends": "",
        "dayOfWeek": 0,

    }

    const onSubmit = values => {
        const st = parseInt((values.starts).substring(0,2)+(values.starts).substring(3))
        const en = parseInt((values.ends).substring(0,2)+(values.ends).substring(3))

        if(st > en) 
        {
            setMsg('starting time should not be after ending time')
            setMsgtype('warning')
            setOpenformMsg(true)
        }
        else if(st === en) 
        {
            setMsg('starting time and after ending time should not be the same')
            setMsgtype('warning')
            setOpenformMsg(true)
        }
        else if(st < parseInt("0800")) 
        {
            setMsg('starting time should not be before 8:00')
            setMsgtype('warning')
            setOpenformMsg(true)
        }

        else if(en > parseInt("1700")) 
        {
            setMsg('endind time should not be after 17:00')
            setMsgtype('warning')
            setOpenformMsg(true)
        }

        else{
        let convertedData = {
            ...values,
            time: {
                dayOfWeek: parseInt(values.dayOfWeek),
                starts: (values.starts).substring(0, 2) + (values.starts).substring(3),
                ends: (values.ends).substring(0, 2) + (values.ends).substring(3)
            }
        }
        // alert(JSON.stringify(convertedData, null, 2))
        console.log(convertedData)
        const options = {
            method: 'POST',
            url: '/timetables',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data: convertedData
        };

        https.post('/timetables', convertedData, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
            if (res.status == 200)
                {setOpen(true)
                props.close()}
            else
                return alert("something went wrong")
        })
        }
    }
    const validations1 = (value) => {
        console.log("$$$$$$$$$$$$$$$$$:::::",props.classes)
    }
    const SignupSchema = Yup.object().shape({
        // (end_time, screma, self)
        starts: Yup.string().test(
            "start_time_test",
            "Start time must be lower than end time",
            value => {
                console.log("hell", value);
                return false;
            }
        ),
        ends: Yup.string().test(
            "end time test",
            'end time should be like this',
            value => {
                console.log('hell yh:', value)
                return false
            }
        )
    });

    console.log("$$$$$$$$$$$$$$$$$:::::",props.classes)
    useEffect(() => {
        props.handleFetchClasses(school)
    }, [])

    return (
        <>

            <Container component="main" minWidth="xl" >
                <CssBaseline />
                <div className={classes.paper}>
                    <div className="timetable-form-container" >
                        <Formik
                            initialValues={initialValue}
                            onSubmit={onSubmit}
                        >
                            {({ errors, touched }) => (
                                <Form>
                                    <Grid container xs={12} minWidth="xs" direction="row" spacing={2}>

                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="Classes"
                                                name="assignedClass"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {props.classes ?
                                                    props.classes.map(item => (<MenuItem key={item._id} value={item._id}>{item.level ? item.level.name : ''} {item.combination ? item.combination.name : ''} {item.label}</MenuItem>)) : null
                                                }

                                            </Field>

                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="Subjects"
                                                name="subject"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {props.subject != null ?
                                                    props.subject.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="Teachers"
                                                name="teacher"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {props.teachers != null ?
                                                    props.teachers.map(item => (<MenuItem key={item._id} value={item._id}>{item.firstName}{item.lastName}</MenuItem>)) : null
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="choice a day"
                                                name="dayOfWeek"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="1">
                                                    Monday
                                                </MenuItem>

                                                <MenuItem value="2">
                                                    Tuesday
                                                </MenuItem>
                                                <MenuItem value="3">
                                                    Wednesday
                                                </MenuItem>
                                                <MenuItem value="4">
                                                    Thursday
                                                </MenuItem>
                                                <MenuItem value="5">
                                                    Friday
                                                </MenuItem>

                                            </Field>

                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                as={TextField}
                                                label="Start Time"
                                                type="time"
                                                fullWidth
                                                variant="outlined"
                                                name="starts"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300, // 5 min
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                as={TextField}
                                                label="End Time"
                                                type="time"
                                                name='ends'
                                                fullWidth
                                                variant="outlined"
                                                required
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                                inputProps={{
                                                    step: 300, // 5 min
                                                }}
                                            />
                                            {errors.end && touched.ends ? (
                                                <div>{errors.ends}</div>
                                            ) : null}
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="choice Term"
                                                name="term"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {props.terms != null ?
                                                    props.terms.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                }

                                            </Field>

                                        </Grid>
                                    </Grid>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        create
                                    </Button>

                                </Form>)}
                        </Formik>
                    </div>
                </div>
                <Box mt={5}>
                </Box>
                <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        New slot has been saved!
        </Alert>
                </Snackbar>

                <Snackbar open={openformMsg} autoHideDuration={4000} onClose={handleClose} anchorOrigin={{ vertical : 'top', horizontal: 'center' }}>
                    <Alert onClose={handleClose} severity={msgtype}>
                        {msg}
        </Alert>
                </Snackbar>
            </Container>
        </>
    )

}

const mapStateToProps = (state) => {
    const classes = state.classes.list
    return {
        state,classes
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchClasses : (school) => {
        dispatch(handleFetchClasses(school))
    }
})

    export default connect(mapStateToProps, mapDispatchToProps)(TimetableForm)
