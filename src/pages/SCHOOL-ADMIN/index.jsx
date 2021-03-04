import React,{useEffect, useState} from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../components/Layouts/PanelLayout/Index'
import {useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchStudent } from '../../store/actions/student.actions'
import { Pie, Doughnut } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';
import { Card } from '@material-ui/core'

export const Index = (props) => {

    const { list: ALL_STUDENTS } = useSelector((state) => state.students);
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


//get student from selected class
const fetchStudentsData = async () => {
    try {
        await dispatch(handleFetchStudent());
    } catch (error) {
    } finally {
        setIsLoading(false);
        
    }
};
useEffect(() => {
    fetchStudentsData();
}, []);

    return (
        <>
        {!props.state.auth.user ? history.replace('/'):
            <PanelLayout selected={1} role={props.state.auth.user.role}>
                 <div className="report-container">
                <div className="report-hd">
                    <h3>Dashboard</h3>
                </div>
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
                    <Paper elevation={4}>
                        <div className='chrt-hd'>
                            <p> Total number of Students</p>
                        </div>
                    <h1 className="number-student">{ALL_STUDENTS.length}</h1>
                    </Paper>
                </div>
                </div>
            </PanelLayout>
}
        </>
    )
}

const mapStateToProps = (state) => ({
    state : state
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
