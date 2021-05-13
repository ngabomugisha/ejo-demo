import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.css'
import { handleFetchLeave, handleUpdateLeave } from '../../store/actions/leaves.actions'
import { Table, ToggleButton, ToggleButtonGroup } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export const Leave = (props) => {
    let count = 1
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    const [stat, setStat] = useState(null)

    const checkStatus = (status) => {
        if (status === "DECLINED") return (1)
        else if (status === "APPROVED") return (3)
        else return (2)
    }

    const handleChange = (e,id) => {
        alert(JSON.stringify(e))
        // if(e.target == 1) setStat({
        //     "status": "DECLINED"
        // })
        // else if(e == 3) setStat({
        //     "status": "APPROVED"
        // })

        // if(stat != null)
        // props.handleUpdateLeave(id,stat)


    }

    useEffect(() => {
        props.handleFetchLeave(school)
        console.log("{{{{{{{", props.leavesList, "}}}}}}}}")
    }, [])
    return (
        <div>
            <Table striped bordered hover responsive>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Names</th>
                        <th>Reason</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>

                    {
                        props.leavesList &&
                        props.leavesList.map(item => (
                            <tr key={item._id}>
                                <td>{count++}</td>
                                <td>{item.teacher.firstName} {item.teacher.lastName}</td>
                                <td>{item.reason}</td>
                                <td>{(item.starts).substring(0, 10)}</td>
                                <td>{(item.ends).substring(0, 10)}</td>
                                <td>{stat == null ? item.status : stat}</td>
                                <td>
                                    <ToggleButtonGroup onChange={(e, _id) =>handleChange(e,item._id)} type="radio" name="options" defaultValue={checkStatus(item.status)}>
                                        <ToggleButton variant="danger" value={1}>Decline</ToggleButton>
                                        <ToggleButton variant="warning" value={2}>Pending</ToggleButton>
                                        <ToggleButton variant="success" value={3}>Approve</ToggleButton>
                                    </ToggleButtonGroup>
                                </td>
                            </tr>
                        ))
                    }

                </tbody>
            </Table>
        </div>
    )
}

const mapStateToProps = (state) => {
    const { leaves } = state
    const leavesList = leaves.list
    return {
        state, leavesList
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchLeave: (school) => {
        dispatch(handleFetchLeave(school))
    },
    handleUpdateLeave: (id,data) => {
        dispatch(handleUpdateLeave(id,data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Leave)
