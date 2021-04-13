import React, { useState, useEffect } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { connect } from 'react-redux'
import { handleAddTeacher, handleFetchTeachers } from '../../../store/actions/teachers.actions'
import { TextField, Grid, Snackbar, Switch, Select, MenuItem, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Skeleton from "@material-ui/lab/Skeleton"
import { Box } from '@material-ui/core'
import EditorWrapText from 'material-ui/svg-icons/editor/wrap-text'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import EditorFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import { DeleteForeverTwoTone } from '@material-ui/icons'
import * as users from '../../Auth/Users'

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },

        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: '-5px',
        width: 200,

    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        margin: 'auto',
        width: 'fit-content',
    },
    formControl: {
        marginTop: theme.spacing(2),
        minWidth: 120,
    },
    formControlLabel: {
        marginTop: theme.spacing(1),
    },
}));


export const Index = (props) => {
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        const updateData = (data) => {
            setRowData(data);
        };
    }
    const onExportClick = () => {
        gridApi.exportDataAsExcel({ allColumns: false });
    }
    const searchDivStyle = { backgroundColor: "#dedede", padding: 10, display: "flex" }
    const searchStyle = {
        width: "100%", padding: "10px 20px", borderRadius: 20, outline: 0,
        border: "2px #1F72C6 solid", fontSize: "100%"
    }
    const onFilterTextChange = (e) => {
        gridApi.setQuickFilter(e.target.value)
    }
    let school = null
    let role = null
    let p2 = null
    let edit = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    const [TEACHER, setTEACHER] = useState(props.state.teachers)
    const [openMsg, setOpenMsg] = useState(false)
    const [Data, setData] = useState([])
    const [msg, setMsg] = useState(null)
    const [ updateData, setUpdateData] = useState(null)
    const [type, setType] = useState(null)
    const [id, setId] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const classes = useStyles();
    const [teacherData, setTeacherData] = useState({
        school: school,
        role: users.TEACHER,
        firstName: null,
        lastName: null,
        email: null,
        phoneNumber: null,
        level: null,
        yearsOfExperience: null,
        workingStatus: null
    })
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleOpenMsg = (ty, msg) => {
        setMsg(msg)
        setType(ty)
        setOpenMsg(true)
    }
    const handleCloseMsg = () => {
        setIsLoading(false)
        setOpenMsg(false)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleUpdate = async () => {
        if (teacherData){
            props.handleUpdateClass({id: id, data: teacherData})
                        handleOpenMsg('success', 'Class Updated')
                            props.handleFetchClasses(school)
                            setTEACHER(props.state.teachers)
                            setData(formatData(TEACHER.list))
                            update()
                            setData(formatData(TEACHER.list))
                        setOpen(false);
                        setUpdating(false)
                        setTeacherData({
                            school: school,
                            role: users.TEACHER,
                            firstName: null,
                            lastName: null,
                            email: null,
                            phoneNumber: null,
                            level: null,
                            yearsOfExperience: null,
                            workingStatus: null
                        })
        }
    };
    const handleCreate = () => {
        props.handleAddTeacher(teacherData)   
        handleOpenMsg('success', 'Teacher Updated')
        setTimeout(() => {
            props.handleFetchTeachers(school)
            setTEACHER(props.state.teachers)
            setData(formatData(props.list?props.list:[]))
            update()
            setData(formatData(props.list?props.list:[]))
        }, 0);
    };

    // const handleDelete = (i) => {
    //     props.handleDeleteClass(i)   
    //     handleOpenMsg('warning', 'Class Deleted')
    //     setTimeout(() => {
    //         props.handleFetchClasses(school)
    //         setCLASSES(props.state.classes)
    //         setData(formatData(CLASSES.list))
    //         update()
    //         setData(formatData(CLASSES.list))
    //     }, 0);
    // };

    const handleChange = e => {

        if (e.target.name === 'firstName') setTeacherData(
            {
                ...teacherData,
                firstName: e.target.value
            })

        if (e.target.name === 'lastName') setTeacherData(
            {
                ...teacherData,
                lastName: e.target.value
            })

        if (e.target.name === 'email') setTeacherData(
            {
                ...teacherData,
                email: e.target.value
            })

        if (e.target.name === 'phoneNumber') setTeacherData(
            {
                ...teacherData,
                phoneNumber: e.target.value
            })

        if (e.target.name === 'workingStatus') setTeacherData(
            {
                ...teacherData,
                workingStatus: e.target.value
            })

        if (e.target.name === 'yearsOfExperience') setTeacherData(
            {
                ...teacherData,
                yearsOfExperience: parseInt(e.target.value)
            })

        if (e.target.name === 'level') setTeacherData(
            {
                ...teacherData,
                level: e.target.value
            })

            
    }

    const formatData = (unformatted) => {
        let i = 1
        const formatted = []
        unformatted.forEach(i => {if(i.role === "TEACHER") formatted.push({ firstName: i.firstName, lastName: i.lastName, email: i.email, school: i.school, role: i.role, phoneNumber: i.phoneNumber, level: i.level, yearsOfExperience: i.yearsOfExperience, workingStatus: i.workingStatus, id: i._id }) })
        return formatted
    }
        // const editRow = (parms) => {
        //     p2 = Object.assign({}, parms['data']);

        //     console.log("data to edit ::::::::::", props.teachers.reduce(function(done, check){
        //         if(check._id === parms.value){
        //             done.push({
        //                 check
        //             })
        //         }
        //         return done
        //     },''))

        //     setId(parms.value)
        //     setUpdating(true)
        //     handleClickOpen()
        // }
    // const deleteRow = (parms) => {
    //     console.log(parms.value,"%%%%%")
    //     setId(parms.value)
    //     handleDelete(parms.value)
    //     setUpdating(true)
    // }
    const columns = [{ headerName: 'Frist Name', field: 'firstName', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true, },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true, },
    { headerName: 'Email', field: 'email', },
    { headerName: 'Phone', field: 'phoneNumber', },
    { headerName: 'Working Status', field: 'workingStatus', },
    { headerName: 'Years Of Experience', field: 'yearsOfExperience', },
    { headerName: 'Level', field: 'level', width: 150 },
    { headerName: 'Role', field: 'role', width: 150 },
    { headerName: 'School', field: 'school', hide: true, flex: 1 },
    { headerName: 'ID', field: 'id', hide: true, flex: 1 },
    {
        headerName: "Action", field: "id",
        cellRendererFramework: (params) => <div style={{display: "flex", justifyContent : "space-evenly"}}>
        {/* <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"35px", paddingRight:"35px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => editRow(params)}>Edit</div> */}
        {/* <div style={{ color: "#f00", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"25px", paddingRight:"25px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => deleteRow(params)}>Delete</div> */}
        </div>
    }]

    const update = () => {
        props.handleFetchTeachers(school)
        setTEACHER(props.state.teachers)
            setData(formatData(props.list))
    }

    useEffect(() => {
        update()
        if (props.state.classes.list) {
            setTEACHER(props.stateTeacher)
        }
    }, [TEACHER])

    useEffect(() => {
    }, [])
    return (
        <div>
            <PanelLayout selected={3} role={role}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="paper-hd"><h2>Teachers List</h2></div>
                    <div className='add-btn'><button onClick={handleClickOpen} className='check-btn' style={{ wordWrap: "normal" }}>Register a new Teacher</button></div>
                </div>
                <div className='classes-cont'>
                    {
                        !isLoading ?
                            <div style={{ width: "100%", height: '100%' }}>
                                <div style={{ height: '90%', boxSizing: 'border-box' }}>
                                    <div style={searchDivStyle}>
                                        <input type="search" style={searchStyle} onChange={onFilterTextChange} placeholder="search ....." />
                                        <Button onClick={() => onExportClick()}>export</Button>
                                    </div>
                                    <div
                                        id="myGrid"
                                        style={{
                                            height: '100%',
                                            width: "100%",
                                        }}
                                        className="ag-theme-alpine">
                                        <AgGridReact
                                            columnDefs={columns}
                                            rowData={formatData(props.list?props.list:[])}
                                            rowSelection={'multiple'}
                                            onGridReady={onGridReady}
                                        />
                                    </div>
                                </div>
                            </div> :
                            (<Box className="my-bx">
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
                </div>
            </PanelLayout>
            <div>
                {/* Form */}
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Register a new Teacher</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="frm" style={{ minWidth: "100%" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={6} sm={6}>

                                        <TextField
                                            label="First Name"
                                            name="firstName"
                                            variant="outlined"
                                            type="text"
                                            value={teacherData.firstName}
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Last Name"
                                            name="lastName"
                                            variant="outlined"
                                            value={teacherData.lastName}
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Phone"
                                            name="phoneNumber"
                                            variant="outlined"
                                            value={teacherData.phoneNumber}
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Email"
                                            name="email"
                                            value={teacherData.email}
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="Years of Experience"
                                            name="yearsOfExperience"
                                            variant="outlined"
                                            value={teacherData.yearsOfExperience}
                                            type="number"
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="working Status"
                                            name="workingStatus"
                                            variant="outlined"
                                            type="text"
                                            value={teacherData.workingStatus}
                                            fullWidth
                                            onChange={handleChange}
                                            select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="PART-TIME">Part-Time</MenuItem>
                                            <MenuItem value="FULL-TIME">Full-Time</MenuItem>

                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>
                                        <TextField
                                            label="level of studies"
                                            name="level"
                                            variant="outlined"
                                            type="text"
                                            value={teacherData.level}
                                            fullWidth
                                            select
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="DIPLOMA">DIPLOMA(A0)</MenuItem>
                                            <MenuItem value="BACHELOR">BACHELOR</MenuItem>
                                            <MenuItem value="MASTERS">MASTERS</MenuItem>
                                        </TextField>
                                    </Grid>
                                </Grid>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        {updating ?
                            <Button onClick={handleUpdate} color="primary">
                                Update
                        </Button> :
                            <Button onClick={handleCreate} color="primary">
                                Create
                        </Button>
                        }
                    </DialogActions>
                </Dialog>

                <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleCloseMsg}>
                    <Alert onClose={handleCloseMsg} severity={type}>
                        {msg}
                    </Alert>
                </Snackbar>
            </div>

        </div>
    )
}

const mapStateToProps = (state) => {
    const { teachers } = state
    const { list } = teachers
    return {
        state, list
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchTeachers: async (school) => {
        await dispatch(handleFetchTeachers(school))
    },
    handleAddTeacher: async (data) => {
        await dispatch(handleAddTeacher(data))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(Index)



// import React, { useState, useEffect } from 'react'
// import './Index.css'
// import https from '../../../helpers/https'
// import { connect, useSelector } from 'react-redux'
// import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
// import Popup from '../../../components/popup'
// import { handleFetchTeachers } from '../../../store/actions/teachers.actions'
// import Controls from "../../../controls/Controls";
// import { Search } from "@material-ui/icons";
// import AddIcon from '@material-ui/icons/Add';
// import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
// import useTable from "../../../components/useTable";
// import { useDispatch } from 'react-redux';
// import TeacherForm from '../../../components/schoolAdmin/TeacherForm';
// import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
// import CloseIcon from '@material-ui/icons/Close';
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

// const headCells = [
//     { id: 'fullName', label: 'Teacher\'s Name' },
//     { id: 'email', label: 'Email Address (Personal)' },
//     { id: 'Phone', label: 'Phone Number' },
//     { id: 'lastLogin', label: 'Last Login' },
//     { id: 'actions', label: 'Actions', disableSorting: true }
// ]

// export const Index = (props) => {
//     let school = null
//     let role = null
//     if (props.state.auth != undefined){if(props.state.auth.user != undefined) {school = props.state.auth.user.school; role = props.state.auth.user.role}}
//     const [isLoading, setIsLoading] = useState(true);
//     const dispatch = useDispatch();
//     const { list: ALL_TEACHERS } = useSelector((state) => state.teachers);
//     console.log("TEEACCHHEEERR:",ALL_TEACHERS)
//     const [recordForEdit, setRecordForEdit] = useState(null)
//     const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
//     const [openPopup, setOpenPopup] = useState(false)
//     const [records, setRecords] = useState(ALL_TEACHERS)



//     const {
//         TblContainer,
//         TblHead,
//         TblPagination,
//         recordsAfterPagingAndSorting
//     } = useTable(records, headCells, filterFn);

//     const handleSearch = e => {
//         let target = e.target;
//         setFilterFn({
//             fn: items => {
//                 if (target.value == "")
//                     return items;
//                 else
//                     return items.filter(x => x.firstName.toLowerCase().includes(target.value) || x.lastName.toLowerCase().includes(target.value))
//             }
//         })
//     }


//     function loadBody() {
//         return (
//             recordsAfterPagingAndSorting != null ?
//                 (recordsAfterPagingAndSorting().map(item =>
//                 (item.role !=="TEACHER"? null :
//                 (<TableRow key={item._id}>
//                     <TableCell>{item.firstName}&nbsp;&nbsp;{item.lastName}</TableCell>
//                     <TableCell>{item.email}</TableCell>
//                     <TableCell>{item.phoneNumber}</TableCell>
//                     <TableCell>{(item.lastLogin).substring(0,10)}</TableCell>
//                     <TableCell>
//                         <Controls.ActionButton
//                             color="primary"
//                             onClick={() => { openInPopup(item) }}>
//                             <EditOutlinedIcon fontSize="small" />
//                         </Controls.ActionButton>
//                         <Controls.ActionButton
//                             color="secondary">
//                             <CloseIcon fontSize="small" />
//                         </Controls.ActionButton>
//                     </TableCell>
//                 </TableRow>)
//                 ))):null)
//     }

//     const openInPopup = item => {
//         setRecordForEdit(item)
//         setOpenPopup(true)
//     }

//     // //get student from selected class
//     // const fetchTeachersData = async (school) => {
//     //     try {
//     //         await dispatch(handleFetchTeachers(school));
//     //     } catch (error) {
//     //         alert("something went wrong",error)
//     //     } finally {
//     //         setIsLoading(false);

//     //     }
//     // };
//     useEffect(() => {
//         // props.handleFetchTeachers(school)
//         console.log('school data, effect = >', school)
//         if (school) {
//             if(ALL_TEACHERS.length> 0)
//             setIsLoading(false)
//         }

//     }, []);
//     console.log('school data = >', school)
//     return (
//         <>
//             <PanelLayout selected={3} role={role}>
//                 <div className="teacher-container">
//                     <Paper elevation={5}>
//                         <div className="paper-hd"><h2>Teachers List</h2></div>
//                         <Toolbar>
//                             <Grid container spacing={3} justify="space-between">
//                                 <Grid item xs={4}>
//                                     <Controls.Input
//                                         label="Search Teacher"
//                                         fullWidth
//                                         InputProps={{
//                                             startAdornment: (<InputAdornment position="start">
//                                                 <Search />
//                                             </InputAdornment>)
//                                         }}
//                                         onChange={handleSearch}
//                                     />
//                                 </Grid>
//                                 {console.log("yesssssss", records)}
//                                 <Grid item xs={4}>
//                                     <Controls.Button
//                                         text="Add New"
//                                         fullWidth
//                                         variant="outlined"
//                                         startIcon={<AddIcon />}
//                                         onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
//                                     />
//                                 </Grid>
//                                 {console.log('records => ', records)}
//                             </Grid>
//                         </Toolbar>
//                         <TblContainer>
//                             <TblHead />
//                             <TableBody>
//                                 {isLoading ? (
//                                     <SkeletonTheme color="lightGray">
//                                         <section>
//                                             <Skeleton fullWidth height={50} />
//                                             <Skeleton animation={false} />
//                                             <Skeleton animation="wave" />
//                                         </section>
//                                     </SkeletonTheme>
//                                 ) : (loadBody()
//                                     )
//                                 }
//                             </TableBody>
//                         </TblContainer>
//                         <TblPagination />
//                     </Paper>
//                     <Popup
//                         title="Teacher"
//                         openPopup={openPopup}
//                         setOpenPopup={setOpenPopup}>
//                         <TeacherForm recordForEdit={recordForEdit} /></Popup>
//                 </div>
//             </PanelLayout>

//         </>
//     )
// }

// const mapStateToProps = (state) => ({
//     state: state
// })

// const mapDispatchToProps = dispatch => ({
//     handleFetchTeachers: (school) => {
//         dispatch(handleFetchTeachers(school))
//     }
// })

// export default connect(mapStateToProps, mapDispatchToProps)(Index)
