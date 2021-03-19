import React, { useState, useEffect } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import { connect, useSelector } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Popup from '../../../components/popup'
import { handleFetchTeachers } from '../../../store/actions/teachers.actions'
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
import useTable from "../../../components/useTable";
import { useDispatch } from 'react-redux';
import TeacherForm from '../../../components/schoolAdmin/TeacherForm';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const headCells = [
    { id: 'fullName', label: 'Teacher\'s Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'Phone', label: 'Phone Number' },
    { id: 'lastLogin', label: 'Last Login' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export const Index = (props) => {
    const school = props.userData.school
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { list: ALL_TEACHERS } = useSelector((state) => state.teachers);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [records, setRecords] = useState(ALL_TEACHERS)



    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.firstName.toLowerCase().includes(target.value) || x.lastName.toLowerCase().includes(target.value))
            }
        })
    }
    //     // Async / Await
    // const getTeachersList = async url => {
    //     try {
    //         const response = await https.get(`/auth/602b9ef1aab3f92010a7a4e0/school-employees`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } })
    //         setRecords(response.data)
    //         console.log('this is data after fetch', records)
    //     } catch (error) {
    //         console.log('error:', error);
    //     }
    // };


    function loadBody() {
        return (
            recordsAfterPagingAndSorting != null ?
                recordsAfterPagingAndSorting().map(item =>
                (<TableRow key={item._id}>
                    <TableCell>{item.firstName}&nbsp;&nbsp;{item.lastName}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.lastLogin}</TableCell>
                    <TableCell>
                        <Controls.ActionButton
                            color="primary"
                            onClick={() => { openInPopup(item) }}>
                            <EditOutlinedIcon fontSize="small" />
                        </Controls.ActionButton>
                        <Controls.ActionButton
                            color="secondary">
                            <CloseIcon fontSize="small" />
                        </Controls.ActionButton>
                    </TableCell>
                </TableRow>)
                ) : null)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }

    // let getTeachersList = async () => {
    //     let res = await https.get(`/auth/602b9ef1aab3f92010a7a4e0/school-employees`,{ headers: {'Authorization' : `Basic ${localStorage.token}` } })
    //     let { data } = res.data;
    //     setTeachers(data );

    //     setIsLoading(false);
    // };


    //get student from selected class
    const fetchTeachersData = async (school) => {
        // try {
        //     await dispatch(handleFetchTeachers(school));
        // } catch (error) {
        //     alert("something went wrong",error)
        // } finally {
        //     setIsLoading(false);

        // }
        await dispatch(handleFetchTeachers(school));
    };
    useEffect(() => {
        console.log('school data, effect = >', school)
        if (school) {
            const fetchedData = fetchTeachersData(school);
            console.log('fetchedData', fetchedData);
            setIsLoading(false)
        }
    }, [records, school]);
    console.log('school data = >', school)
    return (
        <>
            <PanelLayout selected={3} role={props.state.auth.user.role}>
                <div className="teacher-container">
                    <Paper elevation={5}>
                        <div className="paper-hd"><h2>Teachers List</h2></div>
                        <Toolbar>
                            <Grid container spacing={3} justify="space-between">
                                <Grid item xs={4}>
                                    <Controls.Input
                                        label="Search Teacher"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>)
                                        }}
                                        onChange={handleSearch}
                                    />
                                </Grid>
                                {console.log("yesssssss", records)}
                                <Grid item xs={4}>
                                    <Controls.Button
                                        text="Add New"
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    />
                                </Grid>
                                {console.log('records => ', records)}
                            </Grid>
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {isLoading ? (
                                    <SkeletonTheme color="lightGray">
                                        <section>
                                            <Skeleton fullWidth height={50} />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
                                        </section>
                                    </SkeletonTheme>
                                ) : (loadBody()
                                    )
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                    <Popup
                        title="Teacher"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}>
                        <TeacherForm recordForEdit={recordForEdit} /></Popup>
                </div>
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
