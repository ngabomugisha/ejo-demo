import React, { useState, useEffect } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Popup from '../../../components/popup'
import { handleFetchStudent } from '../../../store/actions/student.actions'
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import { Paper, TableBody, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../components/useTable";
import { useDispatch } from 'react-redux';
import TeacherForm from '../../../components/schoolAdmin/TeacherForm';
import Grid from "@material-ui/core/Grid"

const headCells = [
    { id: 'fullName', label: 'Teacher\'s Name' },
    { id: 'email', label: 'Email Address (Personal)' },
    { id: 'Phone', label: 'Phone Number' },
    { id: 'workingStatus', label: 'working Status' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export const Index = (props) => {

    const [, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records] = useState([])
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    const {
        TblContainer,
        TblHead,
        TblPagination } = useTable(records, headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.fullName.toLowerCase().includes(target.value))
            }
        })
    }

    // const addOrEdit = (employee, resetForm) => {
    //     if (employee.id == 0)
    //         employeeService.insertEmployee(employee)
    //     else
    //         employeeService.updateEmployee(employee)
    //     resetForm()
    //     setRecordForEdit(null)
    //     setOpenPopup(false)
    //     setRecords(employeeService.getAllEmployees())
    // }



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

                                <Grid item xs={4}>
                                    <Controls.Button
                                        text="Add New"
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    />
                                </Grid>
                                {console.log(records)}
                            </Grid>
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    //     recordsAfterPagingAndSorting().map(item =>
                                    //     (<TableRow key={item.firstName}>
                                    //         <TableCell>{item.lastName}</TableCell>
                                    //         <TableCell>{item.email}</TableCell>
                                    //         <TableCell>{item.mobile}</TableCell>
                                    //         <TableCell>{item.department}</TableCell>
                                    //         <TableCell>
                                    //             <Controls.ActionButton
                                    //                 color="primary"
                                    //                 onClick={() => { openInPopup(item) }}>
                                    //                 <EditOutlinedIcon fontSize="small" />
                                    //             </Controls.ActionButton>
                                    //             <Controls.ActionButton
                                    //                 color="secondary">
                                    //                 <CloseIcon fontSize="small" />
                                    //             </Controls.ActionButton>
                                    //         </TableCell>
                                    //     </TableRow>)
                                    //     )
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
