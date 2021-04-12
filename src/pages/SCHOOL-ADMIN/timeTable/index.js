import React, { useEffect, useState } from 'react'
import './style.css'
import { connect } from 'react-redux'
import { makeStyles } from '@material-ui/core/styles';
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import https from '../../../helpers/https'
import TimetableForm from '../../../components/schoolAdmin/TimetableForm'
import TimeTable from '../timeTable/TimeTable'
import Popup from '../../../components/popup/index'
import MenuItem from '@material-ui/core/MenuItem';
import { Button, Grid, TextField, Box } from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import Skeleton from "@material-ui/lab/Skeleton"
import moment from 'moment';
import 'bootstrap/dist/css/bootstrap.min.css'
import { handleFetchTerms, handleUpdateTerm } from '../../../store/actions/term.action'
import { useDispatch, useSelector } from 'react-redux';
import {SCHOOLADMIN} from '../../../pages/Auth/Users'


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
    const school = props.state.auth.user.school;
    const classes = useStyles();
    const [classs, setClasss] = React.useState([]);
    const { list: ALL_TERMS } = useSelector((state) => state.terms);
    const [teacher, setTeacher] = React.useState([])
    const [subject, setSubject] = React.useState([])
    const [loadTimetable, setLoadTimetable] = useState(false)
    const [data, setData] = useState([])
    const [openPopup, setOpenPopup] = useState(false)

    const [mon, setMon] = useState([])
    const [tue, setTue] = useState([])
    const [wed, setWed] = useState([])
    const [thu, setThu] = useState([])
    const [fri, setFri] = useState([])
    const dispatch = useDispatch();

    let timetabledata = {
        events: {
            monday: mon,
            tuesday: tue,
            wednesday: wed,
            thursday: thu,
            friday: fri
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
    }

    const handleSave = () => {
        setOpenPopup(true)
    }
    const fetchTermsData = async () => {
        try {
            await dispatch(handleFetchTerms());
        } catch (error) {
            console.log(error)
        }
    };


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

        else if (values.class != '' && values.teacher != "" && values.subject !== '') {
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
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {classs != null ?
                                                        classs.map(item => (<MenuItem key={item._id} value={item._id}>{item.label}</MenuItem>)) : ""
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
                                                        <em>None</em>
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
                                                <button name="check" type="submit" className="check-btn">check TimeTable</button>
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
                                <TimeTable data={timetabledata} /> : (
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

            <Popup
                title="Create new timetable slot"
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <TimetableForm class={classs} subject={subject} teachers={teacher} terms={ALL_TERMS} />

            </Popup>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
