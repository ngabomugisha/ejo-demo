import React, { useState, useEffect } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { handleFetchStudent } from '../../../store/actions/student.actions'
import { useDispatch, useSelector } from 'react-redux';
import Table from '../../../components/parts/Table'
import Skeleton from "@material-ui/lab/Skeleton"
import { Box} from '@material-ui/core'


export const Index = (props) => {

    const school = props.state.auth.user.school;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { list: ALL_STUDENTS } = useSelector((state) => state.students);

    const headCells = [
        { id: 'fistName', label: 'First Name' },
        { id: 'lastName', label: 'Last Name' },
        { id: 'gender', label: 'Gender' },
        { id: 'createdAt', label: 'Registered On' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]
    
    //get student from selected class
    const fetchStudentsData = async (school) => {
        try {
            await dispatch(handleFetchStudent(school));
        } catch (error) {
            alert(error)
        } 
    };
    useEffect(() => {
        fetchStudentsData(school);
    }, []);
    console.log('data from ALL_Strudents',ALL_STUDENTS)

    setTimeout(() => {
        console.log('after timed out ',ALL_STUDENTS)
        setIsLoading(false)
    }, 1000);

console.log('data from localstorage',JSON.parse(localStorage.getItem("students")))
    return (
        <>
            <PanelLayout selected={2} role={props.state.auth.user.role}>

        {
            !isLoading ?
            <Table data={ALL_STUDENTS} head={headCells}/>:
            (  <Box className="my-bx">
                <div className="skeleton-line-students">
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
                  

            </PanelLayout>
        </>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
