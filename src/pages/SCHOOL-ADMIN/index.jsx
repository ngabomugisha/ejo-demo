import React, { useEffect, useState } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchStudent } from '../../store/actions/student.actions'
import { Pie, Doughnut } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import { Card } from '@material-ui/core'
import { handleFetchSchool } from '../../store/actions/schools.actions'
import { handleFetchClasses } from '../../store/actions/classes.actions'
import https from '../../helpers/https'
import CircularProgress from '@material-ui/core/CircularProgress';
import Bullet from '../SCHOOL-ADMIN/marksReport/index'

export const Index = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined){if(props.state.auth.user != undefined) {school = props.state.auth.user.school; role = props.state.auth.user.role}}
    const { list: ALL_STUDENTS } = useSelector((state) => state.students);
    const { list: ALL_SCHOOLS } = useSelector((state) => state.schools)
    const { list: ALL_CLASSES } = useSelector((state) => state.classes)
    const [leave, setLeave] = useState(null)
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const state = {
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
    }



    // //get classes from selected school
    // const fetchClassesData = async () => {
    //     try {
    //         await dispatch(handleFetchClasses(school));
    //     } catch (error) {
    //     } finally {
    //         setIsLoading(false);

    //     }
    // };


    // //get school from selected class
    // const fetchSchoolData = async () => {
    //     try {
    //         await dispatch(handleFetchSchool());
    //     } catch (error) {
    //     } finally {
    //         setIsLoading(false);

    //     }
    // };


    //get student from selected class
    const fetchStudentsData = async () => {
        try {
            await dispatch(handleFetchStudent(school));
        } catch (error) {
        } finally {
            setIsLoading(false);

        }
    };
    async function fetchLeaveNotApproved(school) {
        const req = await https.get(`/leaves/teacher-leaves/${school}/school-teacher-leaves`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                setLeave(res.data)
            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    useEffect(() => {
        fetchStudentsData();
        fetchLeaveNotApproved(school);
        // fetchSchoolData()
        // fetchClassesData()
    }, []);

    return (
        <>
            {!props.state.auth.user ? history.replace('/') :
                <PanelLayout selected={1} role={role}>
                    <div className="report-container">
                        <div className="report-hd">
                            <h3>Dashboard</h3>
                        </div>
                        <div className="dashboard-container-1">
                        <div className="first-row">
                        <div className="chrt">
                            <Paper>
                                <div className='chrt-hd'>
                                    <p>Student Attendance</p>
                                    <p>Class: Senior 4</p>
                                </div>
                                <Doughnut
                                    data={state}
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
                                <div className="chrt-btm"></div></Paper>
                        </div>
                        <div className="chrt">
                            <Paper elevation={2}>
                                <div className='chrt-hd'>
                                    <p> Total number of Students</p>
                                </div>
                                <h1 className="number-student">{ALL_STUDENTS != null ? ALL_STUDENTS.length : <CircularProgress disableShrink />}</h1>
                            </Paper>
                        </div>
                        <div className="chrt">
                            <Paper elevation={2}>
                                <div className='chrt-hd'>
                                    <p> Not Approved teacher leave</p>
                                </div>
                                <h1 className="number-student">{leave != null ? leave.length : <CircularProgress disableShrink />}</h1>
                            </Paper>
                        </div>
                        </div>
                        <div className="first-row">
                        <div className="chrt">
                            <Paper>
                                <div className='chrt-hd'>
                                    <p>Student Attendance</p>
                                    <p>Class: Senior 4</p>
                                </div>
                                <Doughnut
                                    data={state}
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
                                <div className="chrt-btm"></div></Paper>
                        </div>
                        <div className="chrt">
                            <Paper elevation={2}>
                                <div className='chrt-hd'>
                                    <p> Total number of Students</p>
                                </div>
                                <h1 className="number-student">{ALL_STUDENTS != null ? ALL_STUDENTS.length : <CircularProgress disableShrink />}</h1>
                            </Paper>
                        </div>
                        <div className="chrt">
                            <Paper elevation={2}>
                                <div className='chrt-hd'>
                                    <p> Not Approved teacher leave</p>
                                </div>
                                <h1 className="number-student">{leave != null ? leave.length : <CircularProgress disableShrink />}</h1>
                            </Paper>
                        </div>
                        </div>
                       
                        </div>
                    </div>
                </PanelLayout>
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        state
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchClasses : (school) => {
        dispatch(handleFetchClasses(school))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
