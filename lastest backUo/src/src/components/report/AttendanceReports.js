import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CircularProgress, Paper, TextField, MenuItem } from '@material-ui/core'
import { Pie, Doughnut } from 'react-chartjs-2'
import './style.css'
import https from '../../helpers/https'
import { handleFetchStudent } from '../../store/actions/student.actions'
import { handleFetchClasses } from '../../store/actions/classes.actions'
import { handleFetchSubject } from '../../store/actions/subjects.actions'

export const AttendanceReports = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    const [enabled, setEnabled] = useState(false)
    const [classOne, setClassOne] = useState(null)
    const [classTwo, setClassTwo] = useState(null)
    const [grph1Date, setGrph1Date] = useState(null)
    const [grph2Date, setGrph2Date] = useState(null)
    const [subjectOne, setSubjectOne] = useState(null)
    const [ timeTable, setTimeTable] = useState(null)
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
                data: [60, 40]
            }
        ]
    })

    const handleChanges = e => {
        if (e.target.name === 'date-1') setGrph1Date(e.target.value)
        if (e.target.name === 'class-1') {
            console.log(e.target.value)
            setClassOne(e.target.value)
           fetchSubjects(e.target.value)
           setEnabled(true)
        }
        if (e.target.name === 'subject-1') {
            setSubjectOne(e.target.value)

        }
        //for second graph
        if (e.target.name === 'date-2') setGrph2Date(e.target.value)
        if (e.target.name === 'class-2') {
            setClassTwo(e.target.value)
            fetchClassAttendance(e.target.value)
        }

    }

    async function fetchSubjects(id) {
        console.log("ID",id)
        const req = await https.get(`/timetables/${id}/class`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                console.log("FromDATA ofCLass:",res.data)
                setTimeTable(res.data)

            }).catch(function (err) {
                console.log(err);
            });
        return req
    }
    async function fetchClassAttendance(id) {
        console.log("ID",id)
        const req = await https.get(`attendances/class-attendances/${id}/class`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                console.log("DATA:",res.data)

            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    useEffect(() => {
        props.handleFetchClasses(school)

    }, [])
    return (
        <div className="attendanceReport-container">
            <div className="report-1">
                <div className="report-field">
                    <TextField
                        id="date"
                        label="Date"
                        name="date-2"
                        fullWidth
                        onChange={handleChanges}
                        variant="outlined"
                        type="date"
                        value={grph1Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="report-field">
                    <TextField
                        label="Class"
                        value={classOne}
                        name="class-1"
                        variant="outlined"
                        type="text"
                        fullWidth="true"
                        onChange={handleChanges}
                        select
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {props.classList &&
                            props.classList.map(item => (
                                <MenuItem key={item._id} value={item._id}>{item.level && item.level.name} {item.combination && item.combination.name} {item.label && item.label}</MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                <div className='report-field'>
                    <TextField
                        label="Subject"
                        variant="outlined"
                        name="subject-1"
                        value={subjectOne}
                        onChange={handleChanges}
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
                        {timeTable && timeTable.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                <div>{(props.subjectsList.find(i => i._id === item.subject)).name} 
                                <p className='details-time'><i>Time {(item.time.starts).substring(0,2)}:{(item.time.starts).substring(2)} - {(item.time.ends).substring(0,2)}:{(item.time.ends).substring(2)}</i></p></div>
                            </MenuItem>
                        ))}
                    </TextField>
                </div>
                <Doughnut
                    data={graph}
                    options={{
                        title: {
                            display: false,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
            <div className="report-1">
            <div className="report-field">
                    <TextField
                        id="date"
                        label="Date"
                        name="date-2"
                        fullWidth
                        onChange={handleChanges}
                        variant="outlined"
                        type="date"
                        value={grph2Date}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </div>
                <div className="report-field">
                    <TextField
                        label="Class"
                        value={classTwo}
                        name="class-2"
                        variant="outlined"
                        type="text"
                        fullWidth="true"
                        onChange={handleChanges}
                        select
                        InputLabelProps={{
                            shrink: true,
                        }}
                    >
                        <MenuItem value={null}>
                            <em>None</em>
                        </MenuItem>
                        {props.classList &&
                            props.classList.map(item => (
                                <MenuItem key={item._id} value={item._id}>{item.level && item.level.name} {item.combination && item.combination.name} {item.label && item.label}</MenuItem>
                            ))
                        }
                    </TextField>
                </div>
                {/* <div className='report-field'>
                    <TextField
                        label="Subject"
                        variant="outlined"
                        name="subject-1"
                        value={subjectOne}
                        onChange={handleChanges}
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
                        {timeTable && timeTable.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
                                <div>{(props.subjectsList.find(i => i._id === item.subject)).name} 
                                <p className='details-time'><i>Time {(item.time.starts).substring(0,2)}:{(item.time.starts).substring(2)} - {(item.time.ends).substring(0,2)}:{(item.time.ends).substring(2)}</i></p></div>
                            </MenuItem>
                        ))}
                    </TextField> */}
                {/* </div> */}
                <Doughnut
                    data={graph}
                    options={{
                        title: {
                            display: false,
                            text: 'Average Rainfall per month',
                            fontSize: 20
                        },
                        legend: {
                            display: true,
                            position: 'right'
                        }
                    }}
                />
            </div>
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
    return {
        state, classList, studentsList, subjectsList
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
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(AttendanceReports)
