import React from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { Pie, Doughnut } from 'react-chartjs-2'
import Paper from '@material-ui/core/Paper';

export const Index = (props) => {
    const state = {
        labels: ['Male', 'Female'],
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

    return (
        <div>
            <PanelLayout selected={4} role={props.state.auth.user.role}>
                <div className="report-container">
                <div className="report-hd">
                    <h3>Report</h3>
                </div>
                <div className="chrt">
                    <Paper>
                        <div className='chrt-hd'>
                            <p>Student Attendance</p>
                            <p>Class: Grade 1</p>
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
                </div>
            </PanelLayout>
        </div>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
