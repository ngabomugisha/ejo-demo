import React, { useState, useEffect, createRef } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { connect } from 'react-redux'
import StudentForm from '../../../components/schoolAdmin/StudentForm'
import { Paper } from '@material-ui/core'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom'
import { handleFetchOneStudent } from '../../../store/actions/student.actions'

export const AddStudent = (props) => {
    const location = useLocation()
    const [data, setData] = useState(null)
    let school = null
    let role = null
    let p2 = null
    let edit = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    const [recordForEdit, setRecordForEdit] = useState(null)

    useEffect(() => {

        https.get(`/students/${props.location.state.data}`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                setData(res.data);
            }).catch(function (err) {
                console.log(err);
            });

    }, [])
    return (
        <div>
            <PanelLayout selected={2} role={role}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="paper-hd"><h2>Register a new Student</h2></div>
                </div>
                <div style={{ margin: "50px" }}>
                    <Paper elevation={3}>
                        <div className="student-form">
                            {console.log('DATA TO PASS IN STUDENT FOR UPDATE', data)}
                            {props.location.state.update && data != null ?
                                <>
                                    <StudentForm recordForEdit={data} update={props.location.state.update} />
                                </> : <StudentForm recordForEdit={null} update={false} />}
                        </div>
                    </Paper>
                </div>
            </PanelLayout>

        </div>
    )
}

const mapStateToProps = (state) => {
    const { students } = state
    const student = state.student.list
    const { list } = students
    return {
        state, list, student
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchOneStudent: (id) => {
        dispatch(handleFetchOneStudent(id))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(AddStudent)
