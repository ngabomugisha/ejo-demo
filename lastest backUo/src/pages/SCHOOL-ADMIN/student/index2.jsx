import React, { useState, useEffect } from 'react'
import './Index.css'
import { Grid, } from '@material-ui/core';
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Popup from '../../../components/popup'
import { useForm, Form } from '../../../components/parts/useForm'
import { handleFetchStudent } from '../../../store/actions/student.actions'
import Button from '@material-ui/core/Button'
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import PeopleOutlineTwoToneIcon from '@material-ui/icons/PeopleOutlineTwoTone';
import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment } from '@material-ui/core';
import useTable from "../../../components/useTable";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import studentForm from '../../../components/schoolAdmin/StudentForm'

// const useStyles = makeStyles(theme => ({
//     pageContent: {
//         margin: theme.spacing(5),
//         padding: theme.spacing(3)
//     },
//     searchInput: {
//         width: '75%'
//     },
//     newButton: {
//         position: 'absolute',
//         right: '10px'
//     }
// }))


const headCells = [
    { id: 'fistName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'createdAt', label: 'Registered On' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]

export const Index = (props) => {

    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();

    const { list: ALL_STUDENTS } = useSelector((state) => state.students);
    //const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)

    const [records, setRecords] = useState(ALL_STUDENTS)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

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

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    function loadBody() {
        return (recordsAfterPagingAndSorting().map(item =>
        (<TableRow key={item._id}>
            <TableCell>{item.firstName}</TableCell>
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{(item.createdAt)}</TableCell>
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
        ))
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
            <PanelLayout selected={2} role={props.state.auth.user.role}>


                <Paper >

                    <Toolbar>
                        <Controls.Input
                            label="Search Employees"
                            InputProps={{
                                startAdornment: (<InputAdornment position="start">
                                    <Search />
                                </InputAdornment>)
                            }}
                            onChange={handleSearch}
                        />
                        <Controls.Button
                            text="Add New"
                            variant="outlined"
                            startIcon={<AddIcon />}
                            onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                        />
                        {console.log(records)}
                    </Toolbar>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {isLoading ? (
                                <SkeletonTheme color="lightGray">
                                    <section>
                                        <Skeleton count={12} />
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
                    title="Employee Form"
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}>
                    <studentForm />

                </Popup>
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






























// import React, { useState, useEffect } from 'react'
// import './Index.css'
// import { makeStyles } from '@material-ui/core/styles';
// import { connect } from 'react-redux'
// import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
// import { useDispatch, useSelector } from 'react-redux';
// import { handleFetchStudent } from '../../../store/actions/student.actions'
// import { handleFetchClasses } from '../../../store/actions/classes.actions';
// import { Paper } from '@material-ui/core'
// import { DataGrid } from '@material-ui/data-grid';
// import Fab from '@material-ui/core/Fab';
// import AddIcon from '@material-ui/icons/Add';
// import Button from '@material-ui/core/Button';
// import Dialog from '@material-ui/core/Dialog';
// import DialogActions from '@material-ui/core/DialogActions';
// import DialogContent from '@material-ui/core/DialogContent';
// import DialogContentText from '@material-ui/core/DialogContentText';
// import DialogTitle from '@material-ui/core/DialogTitle';
// import WarningRoundedIcon from '@material-ui/icons/WarningRounded';
// import Snackbar from '@material-ui/core/Snackbar';
// import Slide from '@material-ui/core/Slide';
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";



// function TransitionRight(props) {
//     return <Slide {...props} direction="right" />;
//   }

// const columns = [
//     {
//         field: '#',
//         headerClassName: 'super-app-theme--header',
//         headerAlign: 'center',
//     },
//     {
//         field: 'Last Name',
//         headerClassName: 'super-app-theme--header',
//         headerAlign: 'center',
//         width: 150
//     },
//     {
//         field: 'First Name',
//         headerClassName: 'super-app-theme--header',
//         headerAlign: 'center',
//         width: 150
//     },
// ];


// const useStyles = makeStyles((theme) => ({
//     root: {
//         '& .super-app-theme--header': {
//             backgroundColor: '#1f72c7',
//             color: 'white',
//             fontWeight: '50px',
//         },

//         '& > *': {
//             margin: theme.spacing(1),
//         },
//         fab: {
//             position: 'absolute',
//             bottom: theme.spacing(2),
//             right: theme.spacing(2),
//         },
//     },
//     margin: {
//         margin: theme.spacing(1),
//     },
//     withoutLabel: {
//         marginTop: theme.spacing(3),
//     },
//     textField: {
//         width: '25ch',
//     },
//     input: {
//         display: 'none',
//     },
// }));

// export const Index = (props) => {
//     // for alert message
//     const [openM, setOpenM] = React.useState(false);
//     const [transition, setTransition] = React.useState(undefined);

//     const handleClick = () => {
//         setOpen(true)
//     };

//     const handleClick2 = () => {
//         setTransition(() => TransitionRight);
//         setOpenM(true);
//         setOpen(false)
//     };

//     //for dialog box
//     const [open, setOpen] = React.useState(false);

//     const handleClickOpen = () => {
//         setOpen(true);
//     };

//     const handleClose = () => {
//         handleClick2()
//         setOpen(false);
//     };
//     const handleClose2 = () => {
//         setOpenM(false);
//     };

//     const classes = useStyles();
//     let count = 0
//     let ar = []
//     const dispatch = useDispatch();
//     const { list: ALL_STUDENTS } = useSelector((state) => state.students);
//     const [isLoading, setIsLoading] = useState(true);

//     // get all classes
//     const fetchClassesData = async () => {
//         try {
//             await dispatch(handleFetchClasses());
//         } catch (error) {
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     //get student from selected class
//     const fetchStudentsData = async () => {
//         try {
//             await dispatch(handleFetchStudent());
//         } catch (error) {
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         fetchStudentsData();
//         fetchClassesData();
//     }, []);
//     {
//         ALL_STUDENTS.map((st) => (
//             ar.push({ id: count++, '#': count, 'First Name': st.firstName, 'Last Name': st.lastName })
//         ))
//     }

//     return (
//         <>
//             <PanelLayout selected={2} role={props.state.auth.user.role}>


//                 <div className="students-container">
//                     <Paper elevation={3}>
//                         <div className='paper-hd'>
//                             <h2>{"School > Students List"}</h2>
//                             <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
//                                 <AddIcon />
//                             </Fab>
//                         </div>
//                         <div>
//                             <div className="modal-btn">
//                                 <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
//                                     <DialogTitle id="form-dialog-title">Upload Students file (.xls)*</DialogTitle>
//                                     <DialogContent>
//                                         <DialogContentText>
//                                             <WarningRoundedIcon color="primary" /> Use provided template
//                                 </DialogContentText>

//                                         <div className={classes.root}>
//                                             <input
//                                                 accept="image/*"
//                                                 className={classes.input}
//                                                 id="contained-button-file"
//                                                 multiple
//                                                 type="file"
//                                             />
//                                             <label htmlFor="contained-button-file">
//                                                 <h7>Upload</h7>
//                                             </label>
//                                         </div>
//                                     </DialogContent>
//                                     <DialogActions>
//                                         <Button onClick={handleClose} color="primary" variant="outlined">
//                                             Cancel
//                                     </Button>
//                                         <Button onClick={handleClose} color="primary" variant="outlined">
//                                             Submit
//                                     </Button>
//                                         <Snackbar
//                                             open={false}
//                                             onClose={handleClose2}
//                                             TransitionComponent={transition}
//                                             message="File Submited"
//                                             key={transition ? transition.name : ''}
//                                         />
//                                     </DialogActions>
//                                 </Dialog>
//                             </div>
//                         </div>
//                         <div style={{ height: 300, width: '100%' }} className={classes.root}>
//                             {isLoading ? (
//                                 <SkeletonTheme color="lightGray">
//                                 <section>
//                                   <Skeleton count={6} />
//                                 </section>
//                               </SkeletonTheme>
//                             ) : (
//                                     <DataGrid rows={ar} columns={columns} />
//                                 )}
//                         </div>
//                     </Paper>
//                 </div>
//             </PanelLayout>
//         </>
//     )
// }

// const mapStateToProps = (state) => ({
//     state: state
// })

// const mapDispatchToProps = {

// }

// export default connect(mapStateToProps, mapDispatchToProps)(Index)
