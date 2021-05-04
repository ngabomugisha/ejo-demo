import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import AttendanceReports from '../../../components/report/AttendanceReports'
import { Grid, Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Accordion, Card } from 'react-bootstrap'


export const Index = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }


    return (
        <div>

            <PanelLayout selected={9} role={role}>
                <div className="report-container">
                    <div className="report-hd">
                        <h3>Report</h3>
                    </div>
                    <div className="report-details">
                        <Accordion defaultActiveKey="0">
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                    Attendance reports 
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="0">
                                    <Card.Body>
                                        <div>
                                            <AttendanceReports/>
                                            <h3>test</h3>
                                        </div>
                                    </Card.Body>
                                </Accordion.Collapse>
                            </Card>
                            <Card>
                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                    Click me!
                                </Accordion.Toggle>
                                <Accordion.Collapse eventKey="1">
                                    <Card.Body>Hello! I'm another body</Card.Body>
                                </Accordion.Collapse>
                            </Card>
                        </Accordion>
                    </div>

                </div>
            </PanelLayout>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
