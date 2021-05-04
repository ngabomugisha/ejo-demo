import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { CircularProgress, Paper, TextField, MenuItem } from '@material-ui/core'
import https from '../../helpers/https'
import { handleFetchStudent } from '../../store/actions/student.actions'
import { handleFetchClasses } from '../../store/actions/classes.actions'
import { handleFetchSubject } from '../../store/actions/subjects.actions'
import { handleFetchAssignment } from '../../store/actions/assignments.actions'
import Table from 'react-bootstrap/Table'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'

import ReactHTMLTableToExcel from 'react-html-table-to-excel';

export const StudentsMarks = (props) => {
    let school = null
    let role = null
    let count = 1
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    const teacher = props.state.auth && props.state.auth.user && props.state.auth.user._id;
    const [enabled, setEnabled] = useState(false)
    const [classs, setClasss] = useState(null)
    const [subject, setSubject] = useState(null)
    const [clas, setClas] = useState(null)
    const [sublist, setSublist] = useState(null)
    const [sub, setSub] = useState(null)
    const [assignment, setAssignment] = useState(null)
    const [timeTable, setTimeTable] = useState(null)
    const [assignmentMarks, setAssignmentMarks] = useState(null)

    // const handleChanges = e => {
    //     if (e.target.name === 'class') {
    //         console.log(e.target.value)
    //         setClassOne(e.target.value)
    //        fetchSubjects(e.target.value)
    //        setEnabled(true)
    //     }
    //     if (e.target.name === 'subject') {
    //         setSubject(e.target.value)
    //         props.handleFetchAssignment(e.target.value)

    //     }
    //     if(e.target.name ===' assignment')setAssignment(e.target.value)

    // }

    const handleChanges = (e) => {

        if (e.target.name === "class") {
            setClas(e.target.value)
            setSublist(classs.filter(el => el._id === clas));
        }

        if (e.target.name === "subject") {
            setSub(e.target.value)
            //   console.log("{{{{{{{{{{{{",sub,"&&&&&",clas,"}}}}}}}}}}}}}}}}}}}")
            //   props.handleFetchLessonPlanSubject(sub,clas)
            props.handleFetchAssignment(e.target.value)

            //   console.log("{{{{{{{{{{{{",props.assignmentsList,"}}}}}}}}}}}}}}}}}}}")
        }
        if (e.target.name === 'assignment') {
            setAssignment(e.target.value)
            fetchAssignment(e.target.value)
        }
    }

    const fetchClasses = async () => {
        const req = await https.get(`/class-teachers/${teacher}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                setClasss(res.data)
            }).catch(function (err) {
                console.log(err, '***********ERRRORR***********');
            });
        return req
    }

    const fetchAssignment = async (ass) => {
        const req = await https.get(`/marks/${ass}/assignment-marks`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                setAssignmentMarks(res.data)
                console.log("{{{{{{{{{{{{ ASSSSSSSSAAAA", res.data, "}}}}}}}}}}}}}}}}")
            }).catch(function (err) {
                console.log(err, '***********ERRRORR***********');
            });
        return req
    }

    useEffect(() => {
        props.handleFetchClasses(school)
        fetchClasses()
        // console.log("{{{{{{{{{{",classs,"}}}}}}}}}}}}}}}")
    }, [])
    return (
        <div>
            <div className="report-field">
                <TextField
                    label="Class"
                    value={clas}
                    name="class"
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
                    {classs &&
                        classs.map(item => (
                            <MenuItem key={item._id} value={item._id}>{!item ? '' : !item.class != null && !item.class != undefined ? '' : !item.class.level ? '' : item.class.level.name}&nbsp;{!item ? '' : !item.class ? '' : !item.class.combination ? '' : !item.class.combination ? '' : item.class.combination.name}&nbsp;{!item ? "" : !item.class ? "" : item.class.label ? item.class.label : ''}</MenuItem>
                        ))
                    }
                </TextField>
            </div>

            <div className='report-field'>
                <TextField
                    label="Subject"
                    value={sub}
                    name="subject"
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
                    {sublist
                        &&
                        sublist.map(item => (
                            <MenuItem key={item.subject._id} value={item.subject._id}>{item.subject.name}</MenuItem>
                        ))
                    }
                </TextField>
            </div>
            <div className='report-field'>
                <TextField
                    label="Subject"
                    variant="outlined"
                    name="assignment"
                    value={assignment}
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
                    {props.assignmentsList && props.assignmentsList.map((item) => (
                        <MenuItem key={item._id} value={item._id}>
                            {item.title}
                        </MenuItem>
                    ))}
                </TextField>
            </div>


            {/* <div style={{marginBottom: "10px"}}>
                <Button style={{ minWidth: "95%", margin: "0 auto" }}
                    className="mx-sm-3">Print list</Button>
            </div> */}
            <div style={{maxWidth:"90%", margin: "0 auto"}}>
                <div style={{marginBottom: "5px"}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="check-btn"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"/>
                    </div>
                <Table striped bordered hover  id="table-to-xls">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Marks</th>
                        </tr>
                    </thead>
                    <tbody>

                        {assignmentMarks && assignmentMarks.map(item => (
                            <tr>
                                <td>{count++}</td>
                                <td>{item.student.firstName}</td>
                                <td>{item.student.lastName}</td>
                                <td>{item.totalMarks}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>





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

    const { assignments } = state
    const assignmentsList = assignments.list
    return {
        state, classList, studentsList, subjectsList, assignmentsList
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
    handleFetchAssignment: (subject) => {
        dispatch(handleFetchAssignment(subject))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentsMarks)
