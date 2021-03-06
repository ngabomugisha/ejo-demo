import React, { useEffect, useState } from 'react'
import './style.css'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import https from '../../../helpers/https'
import TimetableForm from '../../../components/schoolAdmin/TimetableForm'
import TimeTable from '../timeTable/TimeTable'
import Popup from '../../../components/popup/index'
import moment from 'moment'
import MenuItem from '@material-ui/core/MenuItem';
import { Grid, TextField, Box } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import Skeleton from "@material-ui/lab/Skeleton"
import Modal from 'react-bootstrap/Modal'
import 'bootstrap/dist/css/bootstrap.min.css'
import Button from 'react-bootstrap/Button'
import { handleFetchTerms, handleUpdateTerm } from '../../../store/actions/term.action'
import { handleFetchClasses } from '../../../store/actions/classes.actions'
import { useDispatch, useSelector } from 'react-redux';
import { SCHOOLADMIN } from '../../../pages/Auth/Users'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Switch from '@material-ui/core/Switch';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}




const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export const Index = (props) => {
    let school = null
    let role = null
    let p2 = null
    let edit = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    const classes = useStyles();
    const [classs, setClasss] = React.useState([]);
    const { list: ALL_TERMS } = useSelector((state) => state.terms);
    const [teacher, setTeacher] = React.useState([])
    const [subject, setSubject] = React.useState([])
    const [loadTimetable, setLoadTimetable] = useState(false)
    const [data, setData] = useState([])
    const [openPopup, setOpenPopup] = useState(false)
    const [slot, setSlot] = useState(null)
    const [show, setShow] = useState(false)
    const [open, setOpen] = useState(false)
    const [openNewSlotForm, setOpennewslotForm] = useState(false)
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('sm');

    const [mon, setMon] = useState([])
    const [tue, setTue] = useState([])
    const [wed, setWed] = useState([])
    const [thu, setThu] = useState([])
    const [fri, setFri] = useState([])
    const [sat, setSat] = useState([])
    const dispatch = useDispatch();

    let timetabledata = {
        events: {
            monday: mon,
            tuesday: tue,
            wednesday: wed,
            thursday: thu,
            friday: fri,
            saturday: sat
        }
    }

    const iniData = {
        "class": "",
        "teacher": "",
        "subject": ""
    }
    let newSlot = {
        "class": "",
        "teacher": "",
        "subject": "",
        "term": "",
        "time": {
            "dayOfWeek": 0,
            "starts": "",
            "ends": ""
        }
    }
    const putMon = (dt) => {

        //this is for monday events
        let sub = null
        setMon(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 1) {
                var sm = {
                    'id': 1,
                    "_id": opt._id,
                    'name': 'Subject : \n' + '' + subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        //this is for tuesday events
        setTue(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 2) {
                var sm = {
                    'id': 2,
                    "_id": opt._id,
                    'name': subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        //this for wensday
        setWed(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 3) {
                var sm = {
                    'id': 3,
                    "_id": opt._id,
                    'name': subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        //this is for thursday
        setThu(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 4) {
                var sm = {
                    'id': 4,
                    "_id": opt._id,
                    'name': subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        //this is for friday
        setFri(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 5) {
                var sm = {
                    'id': 5,
                    "_id": opt._id,
                    'name': subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        //this is for saturday
        setSat(dt.reduce(function (fit, opt) {

            if (opt.time.dayOfWeek == 6) {
                var sm = {
                    'id': 6,
                    "_id": opt._id,
                    'name': subject.reduce(function (done, cond) {
                        if (cond._id === opt.subject) {
                            var yes = cond.name
                            done = yes
                        }
                        return done;
                    }, []) + "& Teacher :" +
                        teacher.reduce(function (done2, cond2) {
                            if (cond2._id === opt.teacher) {
                                var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                done2 = yes2;
                            }
                            return done2;
                        }, [])
                    ,
                    'type': "custom",
                    'startTime':
                        moment("2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"),
                    'endTime':
                        moment("2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00")
                };
                fit.push(sm);
            }
            console.log("RETURNED OBJECT:", fit)
            return fit;
        }, []))

        if (mon.length > 0) {
            timetabledata = {
                'events': {
                    ...timetabledata.events,
                    'monday': mon
                }
            }
        }

        if (tue.length > 0) {
            timetabledata = {
                'events': {
                    ...timetabledata.events,
                    'tuesday': tue
                }
            }
        }

        if (wed.length > 0) {
            timetabledata = {
                'events': {
                    ...timetabledata.events,
                    'wednesday': wed
                }
            }
        }

        if (fri.length > 0) {
            timetabledata = {
                'events': {
                    ...timetabledata.events,
                    'friday': fri
                }
            }
        }

        if (sat.length > 0) {
            timetabledata = {
                'events': {
                    ...timetabledata.events,
                    'saturday': sat
                }
            }
        }
    }
    const handleClose = () => {
        setOpenPopup(false)
    }

    const handleOpenNewSlotForm = () => {
        setOpennewslotForm(true)
    }

    const handleCloseNewSlotForm = () => {
        setOpennewslotForm(false)
    }

    const handleCloseFeedBack = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleSave = () => {
        handleOpenNewSlotForm()
    }
    const fetchTermsData = async () => {
        try {
            await dispatch(handleFetchTerms());
        } catch (error) {
            console.log(error)
        }
    };

    const deleteSlot = async () => {
        // alert("slot to delete : "+ slot._id)
        await https.delete(`/timetables/${slot._id}`, { headers: { 'content-type': 'application/json', 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                console.log("DELETING : ", res.data)
                setOpen(true)
                setShow(false)

            }).catch(function (err) {
                console.log(err);
            });
    }

    const onSubmit = values => {
        //  alert(JSON.stringify(window.event.name, null, 2))

        if (values.class != '' && values.teacher == "" && values.subject == '') {
            async function fetchSubjects() {
                const req = await https.get(`/timetables/${values.class}/class`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                    .then((res) => {
                        setData(res.data)
                        putMon(res.data)
                    }).catch(function (err) {
                        console.log(err);
                    });
                return req
            }
            console.log(fetchSubjects())
            fetchSubjects()
            setLoadTimetable(true)

        }

        else if (values.class == '' && values.teacher != "" && values.subject == '') {
            async function fetchSubjects() {
                const req = await https.get(`/timetables/${values.teacher}/teacher`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                    .then((res) => {
                        setData(res.data)
                        putMon(res.data)
                    }).catch(function (err) {
                        console.log(err);
                    });
                return req
            }
            console.log(fetchSubjects())
            fetchSubjects()
            setLoadTimetable(true)
        }
        else if (values.class != '' && values.teacher != "" && values.subject == '') {
            async function fetchSubjects() {
                const req = await https.get(`/timetables/${values.class}/${values.teacher}/class-teacher`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                    .then((res) => {
                        setData(res.data)
                        putMon(res.data)
                    }).catch(function (err) {
                        console.log(err);
                    });
                return req
            }
            console.log(fetchSubjects())
            fetchSubjects()
            setLoadTimetable(true)
        }

        else if (values.class != '' && values.teacher != "" && values.subject != '') {
            async function fetchSubjects() {
                const req = await https.get(`/timetables/${values.class}/${values.teacher}/${values.subject}/class-teacher-subject`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                    .then((res) => {
                        setData(res.data)
                        putMon(res.data)
                    }).catch(function (err) {
                        console.log(err);
                    });
                return req
            }
            console.log(fetchSubjects())
            fetchSubjects()
            setLoadTimetable(true)
        }
        else {
            putMon([])
        }

    }

    useEffect(() => {
        if (slot != null)
            setShow(true)
    }, [slot])

    useEffect(() => {
        fetchTermsData()

        // console.log("MONDAY DATA", timetabledata)
        // if (timetabledata.events.monday || timetabledata.events.tuesday || timetabledata.events.wednesday || timetabledata.events.thursday || timetabledata.events.friday) {
        // }

    }, [mon])

    useEffect(() => {
        fetchTermsData()

        async function fetchSubjects() {
            const req = await https.get(`/lessons/subjects`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setSubject(res.data)
                    console.log("SUBJECTS : ", res.data)
                }).catch(function (err) {
                    console.log(err);
                });
            return req
        }
        fetchSubjects()

        async function fetchTeachers() {
            const req = await https.get(`/auth/${school}/school-employees`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setTeacher((res.data).filter(tech => { return tech.role === 'TEACHER' }));
                    // setTeacher(res.data)
                    console.log("TEACHERS : ", res.data)
                }).catch(function (err) {
                    alert(err);
                });
            return req
        }
        fetchTeachers()

        async function fetchClasses() {
            const req = await https.get(`/classes/602c1e8feeb9ae2820b62120/school-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setClasss(res.data)
                    console.log("CLASSES : ", res.data)
                }).catch(function (err) {
                    console.log(err);
                });
            return req
        }
        fetchClasses()
        props.handleFetchClasses(school)
    }, [])

    return (
        <div>
            <PanelLayout selected={props.state.auth.user.role === SCHOOLADMIN ? 7 : 3} role={props.state.auth.user.role} >
                <div className="timeTable-container">
                    <div>
                        <div className="form-container">
                            <Formik
                                initialValues={iniData}
                                onSubmit={onSubmit}

                            >
                                {(formik) => (
                                    <form onSubmit={formik.handleSubmit}>
                                        <Grid container xs={12} justify="center" spacing={1}>
                                            <Grid item xs={2}>
                                                <Field
                                                    as={TextField}
                                                    type="text"
                                                    name="class"
                                                    label="Class"
                                                    select
                                                    fullWidth
                                                    helperText=" select Class"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>All</em>
                                                    </MenuItem>
                                                    {props.classes ?
                                                        props.classes.map(item => (<MenuItem key={item._id} value={item._id}>{item.level ? item.level.name : ''} {item.combination ? item.combination.name : ""} {item.label}</MenuItem>)) : ""
                                                    }
                                                </Field>
                                            </Grid>
                                            <Grid item xs={3}>
                                                <Field
                                                    as={TextField}
                                                    type="text"
                                                    name="teacher"
                                                    label="Teacher"
                                                    select
                                                    fullWidth
                                                    helperText="select Teacher"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>All</em>
                                                    </MenuItem>
                                                    {teacher != null ?
                                                        teacher.map(item => (<MenuItem key={item._id} value={item._id}>{item.firstName}&nbsp;{item.lastName}</MenuItem>)) : ""
                                                    }
                                                </Field>
                                            </Grid>
                                            <Grid item xs={2}>
                                                <Field
                                                    as={TextField}
                                                    type="text"
                                                    name="subject"
                                                    label="Subject"
                                                    select
                                                    fullWidth
                                                    helperText="select Subject"
                                                    variant="outlined"
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {subject != null ?
                                                        subject.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : ""
                                                    }
                                                </Field>
                                            </Grid>
                                            <Grid item xs={3} justify="center">
                                                <button name="check" type="submit" className="check-btn">Load TimeTable</button>
                                            </Grid>
                                            <Grid item xs={2} justify="center">
                                                <button name="save" onClick={() => handleSave()} className="check-btn">New Slot</button>
                                            </Grid>
                                        </Grid>
                                    </form>)}
                            </Formik>
                        </div>
                    </div>
                    <div className='TimeTable-co'>
                        {
                            loadTimetable ?
                                <TimeTable data={timetabledata}
                                    getDetails={value => setSlot(value)}
                                /> : (
                                    <Box>
                                        <div className="skeleton-line">
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                            <Skeleton width="20%" />
                                        </div>
                                    </Box>)
                        }
                    </div>
                </div>
            </PanelLayout>




            <Dialog
                fullWidth={fullWidth}
                maxWidth={maxWidth}
                open={openNewSlotForm}
                onClose={handleCloseNewSlotForm}
                aria-labelledby="max-width-dialog-title"
            >
                {/* <DialogTitle id="max-width-dialog-title">Optional sizes</DialogTitle> */}
                <DialogContent>
                    <DialogContentText>
                        Create a new timetable Slot
          </DialogContentText>
                    <TimetableForm class={classs} subject={subject} teachers={teacher} terms={ALL_TERMS} close={handleCloseNewSlotForm} />
                </DialogContent>
                {/* <DialogActions> */}
                    {/* <Button onClick={handleCloseNewSlotForm} color="primary">
                        Close
          </Button> */}
                {/* </DialogActions> */}
            </Dialog>




            {/* 
            <Popup
                title="Create new timetable slot"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <TimetableForm class={classs} subject={subject} teachers={teacher} terms={ALL_TERMS} close={handleClose} />

            </Popup> */}

            <Modal
                show={show}
                onHide={() => setShow(false)}
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Timetable Slot Details
        </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>
                        {slot && (slot.name).substring(0, (slot.name).indexOf("&"))}
                    </p>

                    <p>
                        Starts: {slot && (JSON.stringify(slot.startTime)).substring(12, 17)}
                    </p>
                    <p>
                        Ends: {slot && (JSON.stringify(slot.endTime)).substring(12, 17)}
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={deleteSlot} variant="danger" >Delete timetable slot</Button>
                    <Button onClick={() => setShow(false)}>Close</Button>
                </Modal.Footer>
            </Modal>

            <Snackbar open={open} autoHideDuration={4000} onClose={handleCloseFeedBack}>
                <Alert onClose={handleCloseFeedBack} severity="success">
                    Timetable slot is Deleted!
                </Alert>
            </Snackbar>

        </div>
    )
}

const mapStateToProps = (state) => {
    const classes = state.classes.list
    return {
        state, classes
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchClasses: (school) => {
        dispatch(handleFetchClasses(school))
    }
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)
