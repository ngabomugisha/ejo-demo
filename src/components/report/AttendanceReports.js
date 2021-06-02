import React, { useEffect, useState, useRef } from 'react'
import { connect } from 'react-redux'
import moment from "moment";
import ReactToPrint from "react-to-print";
import { Table } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import {
    CircularProgress,
    Paper,
    TextField,
    Dialog,
    Grid,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    MenuItem,
} from '@material-ui/core'
import { Pie, Doughnut } from 'react-chartjs-2'
import './style.css'
import https from '../../helpers/https'
import { handleFetchStudent } from '../../store/actions/student.actions'
import { handleFetchClasses } from '../../store/actions/classes.actions'
import { handleFetchSubject } from '../../store/actions/subjects.actions'
import { handleFetchTeachers } from '../../store/actions/teachers.actions'
import { handleFetchClassStudent } from '../../store/actions/student.actions'
import TimeTable from '../../pages/SCHOOL-ADMIN/timeTable/TimeTable'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export const AttendanceReports = (props) => {
    let school = null
    let role = null
    let teacherId = null
    let count = 1
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { teacherId = props.state.auth.user._id; role = props.state.auth.user._id } }
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    const descriptionElementRef = React.useRef(null);
 
 
    const [enabled, setEnabled] = useState(false)
    const [absent, setAbsent] = useState([])
    const [present, setPresent] = useState([])
    const [open, setOpen] = useState(false)
    const [classOne, setClassOne] = useState(null)
    const [teacher] = useState(props.teachersList)
    const [classTwo, setClassTwo] = useState(null)
    const [grph1Date, setGrph1Date] = useState(null)
    const [grph2Date, setGrph2Date] = useState(null)
    const [subjectOne, setSubjectOne] = useState(null)
    const [timeTable, setTimeTable] = useState(null)
    const [graph, setGraph] = useState({
        labels: ['Absent', 'Present'],
        datasets: [
            {
                label: '',
                backgroundColor: [
                    '#2ED47A',
                    '#FFB946'
                ],
                hoverBackgroundColor: [
                    '#2ED4aA',
                    '#FFB9a6'
                ],
                data: [50, 50]
            }
        ]
    })
    const [timeTableslot, setTimeTableSlot] = useState(null)
    const [scroll, setScroll] = useState("paper")

    const [mon, setMon] = useState([]);
    const [tue, setTue] = useState([]);
    const [wed, setWed] = useState([]);
    const [thu, setThu] = useState([]);
    const [fri, setFri] = useState([]);
    const [keyUnitComp, setKeyUnitComp] = useState(null);
    const [subj, setSubj] = React.useState([]);
    const [sub, setSub] = useState("");
    const [attendanceList_class, setAttendanceList_class] = useState([])
    const [attendanceList_slot, setAttendanceList_slot] = useState([])
    const [ timeMade, setTimeMade] = useState(null)

// for teacher
    const [classs, setClasss] = React.useState(null);
    const [unique, setUnique] = React.useState(null);
    const [clas, setClas] = React.useState(null)



    const fetchClasses = async () => {
        const req = await https.get(`/class-teachers/${teacherId}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
          .then((res) => {
            setClasss(res.data)
          }).catch(function (err) {
            console.log(err, '***********ERRRORR***********');
          });
        return req
      }
      

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handlesubject = (event) => {
        setSub(event.target.value);
    };

    const handleDateChange = (date) => {
        setGrph1Date(date.target.value);
        handleClickOpen();
    };

    const handleChanges = e => {
        if (e.target.name === 'dateOne') setGrph1Date(e.target.value)
        if (e.target.name === 'classOne') {
            // console.log(e.target.value)
            setClassOne(e.target.value)
            fetchSubjects(e.target.value)
            setEnabled(true)
            fetchClassAttendance(e.target.value)
        }
        if (e.target.name === 'subject-1') {
            setSubjectOne(e.target.value)
        }
    }


    // for timetable

    let timetabledata = {
        events: {
            monday: mon,
            tuesday: tue,
            wednesday: wed,
            thursday: thu,
            friday: fri,
        },
    };
    const putMon = (dt) => {
        //this is for monday events
        let sub = null;
        setMon(
            dt.reduce(function (fit, opt) {
                if (opt.time.dayOfWeek == 1) {
                    var sm = {
                        id: 1,
                        _id: opt._id,
                        name:
                            "Subject : \n" +
                            "" +
                            subj.reduce(function (done, cond) {
                                if (cond._id === opt.subj) {
                                    var yes = cond.name;
                                    done = yes;
                                }
                                return done;
                            }, []) +
                            "& Teacher :" +
                            teacher.reduce(function (done2, cond2) {
                                if (cond2._id === opt.teacher) {
                                    var yes2 = cond2.firstName + "" + "" + cond2.lastName;
                                    done2 = yes2;
                                }
                                return done2;
                            }, []),
                        type: "custom",
                        startTime: moment(
                            "2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"
                        ),
                        endTime: moment(
                            "2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00"
                        ),
                    };
                    fit.push(sm);
                }
                return fit;
            }, [])
        );

        //this is for tuesday events
        setTue(
            dt.reduce(function (fit, opt) {
                if (opt.time.dayOfWeek == 2) {
                    var sm = {
                        id: 2,
                        _id: opt._id,
                        name:
                            subj.reduce(function (done, cond) {
                                if (cond._id === opt.subj) {
                                    var yes = cond.name;
                                    done = yes;
                                }
                                return done;
                            }, '') +
                            "& Teacher :" +
                            teacher.reduce(function (done2, cond2) {
                                if (cond2._id === opt.teacher) {
                                    var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                    done2 = yes2;
                                }
                                return done2;
                            }, ''),
                        type: "custom",
                        startTime: moment(
                            "2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"
                        ),
                        endTime: moment(
                            "2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00"
                        ),
                    };
                    fit.push(sm);
                }
                // console.log("RETURNED OBJECT:", fit);
                return fit;
            }, [])
        );

        //this for wensday
        setWed(
            dt.reduce(function (fit, opt) {
                if (opt.time.dayOfWeek == 3) {
                    var sm = {
                        id: 3,
                        _id: opt._id,
                        name:
                            subj.reduce(function (done, cond) {
                                if (cond._id === opt.subj) {
                                    var yes = cond.name;
                                    done = yes;
                                }
                                return done;
                            }, []) +
                            "& Teacher :" +
                            teacher.reduce(function (done2, cond2) {
                                if (cond2._id === opt.teacher) {
                                    var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                    done2 = yes2;
                                }
                                return done2;
                            }, []),
                        type: "custom",
                        startTime: moment(
                            "2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"
                        ),
                        endTime: moment(
                            "2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00"
                        ),
                    };
                    fit.push(sm);
                }
                // console.log("RETURNED OBJECT:", fit);
                return fit;
            }, [])
        );

        //this is for thursday
        setThu(
            dt.reduce(function (fit, opt) {
                if (opt.time.dayOfWeek == 4) {
                    var sm = {
                        id: 4,
                        _id: opt._id,
                        name:
                            subj.reduce(function (done, cond) {
                                if (cond._id === opt.subj) {
                                    var yes = cond.name;
                                    done = yes;
                                }
                                return done;
                            }, []) +
                            "& Teacher :" +
                            teacher.reduce(function (done2, cond2) {
                                if (cond2._id === opt.teacher) {
                                    var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                    done2 = yes2;
                                }
                                return done2;
                            }, []),
                        type: "custom",
                        startTime: moment(
                            "2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"
                        ),
                        endTime: moment(
                            "2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00"
                        ),
                    };
                    fit.push(sm);
                }
                // console.log("RETURNED OBJECT:", fit);
                return fit;
            }, [])
        );

        //this is for friday
        setFri(
            dt.reduce(function (fit, opt) {
                if (opt.time.dayOfWeek == 5) {
                    var sm = {
                        id: 5,
                        _id: opt._id,
                        name:
                            subj.reduce(function (done, cond) {
                                if (cond._id === opt.subj) {
                                    var yes = cond.name;
                                    done = yes;
                                }
                                return done;
                            }, []) +
                            "& Teacher :" +
                            teacher.reduce(function (done2, cond2) {
                                if (cond2._id === opt.teacher) {
                                    var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                                    done2 = yes2;
                                }
                                return done2;
                            }, []),
                        type: "custom",
                        startTime: moment(
                            "2018-02-23T" +
                            opt.time.starts.substring(0, 2) +
                            ":" +
                            opt.time.starts.substring(2, 4) +
                            ":00"
                        ),
                        endTime: moment(
                            "2018-02-23T" +
                            opt.time.ends.substring(0, 2) +
                            ":" +
                            opt.time.ends.substring(2, 4) +
                            ":00"
                        ),
                    };
                    fit.push(sm);
                }
                // console.log("RETURNED OBJECT:", fit);
                return fit;
            }, [])
        );

        if (mon.length > 0) {
            timetabledata = {
                events: {
                    ...timetabledata.events,
                    monday: mon,
                },
            };
        }

        if (tue.length > 0) {
            timetabledata = {
                events: {
                    ...timetabledata.events,
                    tuesday: tue,
                },
            };
        }

        if (wed.length > 0) {
            timetabledata = {
                events: {
                    ...timetabledata.events,
                    wednesday: wed,
                },
            };
        }

        if (fri.length > 0) {
            timetabledata = {
                events: {
                    ...timetabledata.events,
                    friday: fri,
                },
            };
        }
    };

    function fetchSlots() {
        const req = https
            .get(`/timetables/${classOne}/class`, {
                headers: { Authorization: `Basic ${localStorage.token}` },
            })
            .then((res) => {
                // console.log("RETURNED DATA:", res.data);
                putMon(res.data);
            })
            .catch(function (err) {
                console.log(err);
            });
        return req;
    }

    async function fetchSubjects(id) {
        // console.log("ID", id)
        const req = await https.get(`/timetables/${id}/class`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                // console.log("FromDATA ofCLass:", res.data)
                setTimeTable(res.data)

            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    async function fetchClassAttendance(id) {
        console.log("ID", id)
        const req = await https.get(`attendances/class-attendances/${classOne}/class`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                console.log("DATA:", res.data)
                setAttendanceList_class(res.data)
            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    async function fetchTimeTableSlotAttendance(slot) {
        console.log("SLOT", slot)
        const req = await https.get(`attendances/class-attendances/${slot}/timetable-slot`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                console.log("DATA FrOM timetableslot : ", res.data)
                if ((res.data.time).substring(0, 10) == grph1Date)
                    console.log("&&&&&&&&&&&&&&", (res.data.time).substring(0, 10), "YESSSS", grph1Date)
                setAttendanceList_slot(res.data.students)
                setTimeMade(res.data.updatedAt)
            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    useEffect(() => {
        fetchSlots()
    }, [classOne])
    useEffect(() => {
        props.handleFetchStudent(school)
        setSubj(props.subjectsList)
        props.handleFetchClasses(school)
        fetchSlots()
        fetchClasses()
    }, [])

    useEffect(() => {
        fetchTimeTableSlotAttendance(timeTableslot)
        // console.log("%%%%%%%%%%%%%%%%%%", timeTableslot)
        setOpen(false)
    }, [timeTableslot])

    useEffect(() => {
        console.log("WWWHHHHHHAAAATTTT  ::", attendanceList_slot)
        if (attendanceList_slot) {
            setAbsent(
                attendanceList_slot.filter(i => i.present == false)
            )
            setPresent(
                attendanceList_slot.filter(i => i.present == true)
            )

            setGraph({
                labels: ['Absent', 'Present'],
                datasets: [
                    {
                        label: '',
                        backgroundColor: [
                            '#2ED47A',
                            '#FFB946'
                        ],
                        hoverBackgroundColor: [
                            '#2ED4aA',
                            '#FFB9a6'
                        ],
                        data: [absent.length, present.length]
                    }
                ]
            })

        }
    }, [attendanceList_slot])

    useEffect(() => {
        console.log("^^^^^^^^^^^^^^^^^^ ABSENT", absent)
    }, [absent])

    useEffect(() => {
        console.log("^^^^^^^^^^^^^^^^^^ PRESENT", present)
    }, [present])

    useEffect(() => {
        classs != null &&
          setUnique(classs.reduce((acc, current) => {
            const x = acc.find(item => item.class._id === current.class._id);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
          }, []))
      }, [classs])
    console.log("THIS IS THE CLASSES : ", unique)
    return (
        <div className="attendanceReport-container">
            <div className="">
                <div className="">
                    <TextField
                        label="Class"
                        value={classOne}
                        name="classOne"
                        variant="outlined"
                        type="text"
                        fullWidth
                        onChange={handleChanges}
                        select
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {
                            role != "TEACHER" ?
                            props.classList &&
                            props.classList.map(item => (
                                <MenuItem key={item._id} value={item._id}>{item.level && item.level.name} {item.combination && item.combination.name} {item.label && item.label}</MenuItem>
                            ))
                                :
                                unique &&
                                unique.map(item => (
                                    <MenuItem key={item.class._id} value={item.class._id}>{item.class.level && item.class.level.name} {item.class.combination && item.class.combination.name} {item.class.label && item.class.label}</MenuItem>
                                ))
                        }
                    </TextField>
                </div>
                <div className="report-field">
                    <TextField
                        label="Date"
                        name="dateOne"
                        fullWidth
                        onChange={handleDateChange}
                        variant="outlined"
                        type="date"
                        value={grph1Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>

                <div>
                    {/* <button className="check-btn">Print report</button> */}
                    <ReactHTMLTableToExcel
                        id="test-table-xls-button"
                        className="check-btn"
                        table="table-to-xls-attendance-1"
                        filename="tablexls"
                        sheet="tablexls"
                        buttonText="Download as XLS" />
                    <Table striped bordered hover id="table-to-xls-attendance-1" responsive>
                        <thead>
                            <tr>
                                <th colSpan="2">{props.classList.reduce(function(res,opt){
                                    if(opt._id == classOne){
                                        let level = opt.level ? opt.level.name : ""
                                        let combination = opt.combination ? opt.combination.name : ""
                                        let label = opt.label
                                        res= level + " " + combination + " " + label
                                    }
                                    return res
                                },"")}</th>
                                <th colSpan="2">Date: {timeMade && (timeMade).substring(0,10)} Time: {timeMade && (timeMade).substring(12,16)}</th>
                            </tr>
                            <tr>
                                <th>#</th>
                                <th>Names</th>
                                <th>Gender</th>
                                <th>Status</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                attendanceList_slot &&
                                attendanceList_slot.map(item => (
                                    <tr>
                                        <td>{count++}</td>
                                        <td>{
                                            props.studentsList.reduce(function (res, opt) {
                                                if (opt._id == item.student) {
                                                    let finded = opt.firstName + " " + opt.lastName
                                                    res = finded
                                                }
                                                return res
                                            }, "")
                                        }</td>
                                        <td>{
                                            props.studentsList.reduce(function (res, opt) {
                                                if (opt._id == item.student) {
                                                    let finded = opt.gender
                                                    res = finded
                                                }
                                                return res
                                            }, "")
                                            }</td>
                                        {
                                            item.present ?
                                                <td style={{ backgroundColor: "#eef6ff", color: "#3194f6" }}>
                                                    Present
                                            </td> :
                                                <td style={{ backgroundColor: "#ffece7", color: "#f1967e" }}>
                                                    Absent
                                            </td>
                                        }
                                        <td>{item.absenceReason}</td>

                                    </tr>
                                ))
                            }

                        </tbody>
                    </Table>
                </div>

                <div className="report-field">
                </div>
            </div>
          
            <Dialog
                open={open}
                fullWidth
                maxWidth="xl"
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title">select a timetable slot</DialogTitle>
                <DialogContent dividers={scroll === "paper"}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                    >
                        <TimeTable
                            data={timetabledata}
                            onChange={(value) => setTimeTableSlot(value)}
                        />
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
              </Button>
                </DialogActions>
            </Dialog>



        </div>
    )
}

const mapStateToProps = (state) => {
    const { classes } = state
    const classList = classes.list

    const { students } = state
    const studentsList = students.list

    const { subjects } = state
    const subjectsList = subjects.list

    const { teachers } = state
    const teachersList = teachers.list
    return {
        state, classList, studentsList, subjectsList, teachersList
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchClasses: (school) => {
        dispatch(handleFetchClasses(school))
    },
    handleFetchStudent: (school) => {
        dispatch(handleFetchStudent(school))
    },
    handleFetchSubject: () => {
        dispatch(handleFetchSubject())
    },
    handleFetchTeachers: (school) => {
        dispatch(handleFetchTeachers(school))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceReports)
