import React, { useState, useEffect } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { connect, useDispatch, useSelector } from 'react-redux'
import { handleAddTeacher, handleFetchTeachers } from '../../../store/actions/teachers.actions'
import { handleFetchSubject } from '../../../store/actions/subjects.actions'
import { handleFetchClasses } from '../../../store/actions/classes.actions'
import { handleFetchClassTeacher } from '../../../store/actions/classTeacher.actions'
import { TextField, Grid, Snackbar, Switch, Select, MenuItem, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Skeleton from "@material-ui/lab/Skeleton"
import { Box } from '@material-ui/core'
import Table from 'react-bootstrap/Table'
import 'bootstrap/dist/css/bootstrap.min.css'
import EditorWrapText from 'material-ui/svg-icons/editor/wrap-text'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import EditorFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import { DeleteForeverTwoTone } from '@material-ui/icons'
import * as users from '../../Auth/Users'
// import ReactExport from 'react-data-export';
// import { CSVLink } from "react-csv";



// const ExcelFile = ReactExport.ExcelFile;
// const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;

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
    const dispatch = useDispatch()
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    let csvReport = {}
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        const updateData = (data) => { setRowData(data); };
    }
    const onExportClick = () => { gridApi.exportDataAsExcel({ allColumns: false }); }
    const searchDivStyle = { backgroundColor: "#dedede", padding: 10, display: "flex" }
    const searchStyle = { width: "100%", padding: "10px 20px", borderRadius: 20,marginRight:"10px", outline: 0, border: "2px #1F72C6 solid", fontSize: "100%" }
    const onFilterTextChange = (e) => { gridApi.setQuickFilter(e.target.value) }
    const [TEACHER, setTEACHER] = useState(props.state.teachers)
    const [openMsg, setOpenMsg] = useState(false)
    const [Data, setData] = useState([])
    const [dataSet, setDataSet] = useState([])
    const [msg, setMsg] = useState(null)
    const [updateData, setUpdateData] = useState(null)
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
    const [classData, setClassData] = useState({
        subject: null,
        assignedClass: null
    })
    const [open, setOpen] = React.useState(false);
    const [openClass, setOpenClass] = React.useState(false);
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
        setOpenClass(false)
    }
    const handleUpdate = async () => {
        if (teacherData) {
            props.handleUpdateClass({ id: id, data: teacherData })
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

    // create a teacher
    const handleCreate = async () => {

        https.post('/auth/signup', teacherData, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                handleOpenMsg('success', 'Teacher Updated')
                setTimeout(() => {
                    props.handleFetchTeachers(school)
                    setTEACHER(props.state.teachers)
                    setData(formatData(props.list ? props.list : []))
                    update()
                    setData(formatData(props.list ? props.list : []))
                }, 0);
            })
            .catch(function (erro) {
                handleOpenMsg('warning', erro.message)
            })

    };
    const handleCreateClass = async () => {
        handleOpenMsg('success', 'processing.....')
        await https.post('/class-teachers/', classData, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
            if (res.status == 200) { handleOpenMsg('success', 'class is assigned successfully'); handleClose() }
            else handleOpenMsg('warning', 'Class has not assigned')
        })
    };

    const handleDeleteAssignedClass = async (id) => {
        await https.delete(`/class-teachers/${id}`, { headers: { 'content-type' : 'application/json', 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
            console.log("DELETING : ", res.data)
            handleOpenMsg('success', 'Subject has unassigned to a Teacher')
            setOpen(false)
            handleClose()
        }).catch(function (err) {
            console.log(err);
        });
    }



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
        if (e.target.name === 'clas') setClassData({
            ...classData,
            assignedClass: e.target.value
        })
        if (e.target.name === 'subject') setClassData({
            ...classData,
            subject: e.target.value
        })

    }

    const formatData = (unformatted) => {
        let i = 1
        const formatted = []
        unformatted.forEach(i => { if (i.role === "TEACHER") formatted.push({ firstName: i.firstName, lastName: i.lastName, email: i.email, school: i.school, role: i.role, phoneNumber: i.phoneNumber, level: i.level, yearsOfExperience: i.yearsOfExperience, workingStatus: i.workingStatus, id: i._id }) })
        return formatted
    }
    const editRow = (parms) => {
        if (id == null) props.handleFetchClassTeacher(parms.value)
        setId(parms.value)
        setClassData({
            ...classData,
            teacher: parms.value
        })
        setOpenClass(true)
    }
    
    // const deleteRow = (parms) => {
    //     console.log(parms.value,"%%%%%")
    //     //setId(parms.value)
    //    //handleDelete(parms.value)
    //     setUpdating(true)
    // }

    // const headers = [
    //     { label: "First Name", key: "firstName" },
    //     { label: "Last Name", key: "lastName" },
    //     { label: "Email", key: "email" },
    //     { label: "Age", key: "age" }
    //   ];


// const data = [
//     { firstName: "Warren", lastName: "Morrow", email: "sokyt@mailinator.com", age: "36" },
//     { firstName: "Gwendolyn", lastName: "Galloway", email: "weciz@mailinator.com", age: "76" },
//     { firstName: "Astra", lastName: "Wyatt", email: "quvyn@mailinator.com", age: "57" },
//     { firstName: "Jasmine", lastName: "Wong", email: "toxazoc@mailinator.com", age: "42" },
//     { firstName: "Brooke", lastName: "Mcconnell", email: "vyry@mailinator.com", age: "56" },
//     { firstName: "Christen", lastName: "Haney", email: "pagevolal@mailinator.com", age: "23" },
//     { firstName: "Tate", lastName: "Vega", email: "dycubo@mailinator.com", age: "87" },
//     { firstName: "Amber", lastName: "Brady", email: "vyconixy@mailinator.com", age: "78" },
//     { firstName: "Philip", lastName: "Whitfield", email: "velyfi@mailinator.com", age: "22" },
//     { firstName: "Kitra", lastName: "Hammond", email: "fiwiloqu@mailinator.com", age: "35" },
//     { firstName: "Charity", lastName: "Mathews", email: "fubigonero@mailinator.com", age: "63" }
//   ];

      const headers = [
        { label: "First Name", key: "firstName"},
        { label: "Last Name", key: "LastName" },
        { label: "Email", key: "email" },
        { label: "phone", key: "phone" },
        { label: "working Status" , key: "workingStatus"},
        { label: "Experience" , key: "experience"},
        { label: "Level", key: "level" }
    ]


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
    { headerName: "Action", field: "id",
        cellRendererFramework: (params) => <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "20px", backgroundColor: "#e8f5ff" , marginRight: "10px", textAlign: 'center', paddingLeft: "35px", paddingRight: "35px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => editRow(params)}>Assigned Classes</div>
            {/* <div style={{ color: "#f00", cursor: "pointer", borderRadius: "14px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"25px", paddingRight:"25px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => deleteRow(params)}>Delete</div> */}
        </div>
    }]
let data2 = {}
    const update = () => {
        props.handleFetchSubject()
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
        if (id)
            props.handleFetchClassTeacher(id)
    }, [id])
    useEffect(() => {

        // const fmt = formatData(props.list)
        // setDataSet([
        //     {
        //         columns: [
        //             { title: "First Name" },
        //             { title: "Last Name" },
        //             { title: "Email" },
        //             { title: "phone" },
        //             { title: "working Status" },
        //             { title: "Experience" },
        //             { title: "Level" }
        //         ],
        //         data:
        //             fmt && fmt.map(teacher => [
        //                 { value: teacher.firstName },
        //                 { value: teacher.lastName },
        //                 { value: teacher.email },
        //                 { value: teacher.workingStatus },
        //                 { value: teacher.yearsOfExperience },
        //                 { value: teacher.level }
        //             ])

        //     }
        // ])
        //  data2 = [fmt && fmt.map(teacher => ({
        //      firstName: teacher.firstName,
        //      lastName: teacher.lastName ,
        //      email: teacher.email ,
        //      workingStatus: teacher.workingStatus ,
        //      experience: teacher.yearsOfExperience,
        //      level: teacher.level 
        // }))]

//  csvReport = {
//     data: data2,
//     headers: headers,
//     filename: 'Teachers.csv'
//   };
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
                                        {/* <ExcelFile
                                            filename="Teachers List"
                                            element={<Button style={{ margin: "0 auto",padding:"10px", borderRadius: "15px" }} >Export</Button>}>
                                            <ExcelSheet dataSet={dataSet} name="Teachers" />
                                        </ExcelFile> */}
                                        {/* <CSVLink {...csvReport} style={{ margin: "0 auto",padding:"10px", borderRadius: "15px" }}  >Export to CSV</CSVLink> */}
                                        {/* <h3>Export data to CSV in React</h3> */}
      {/* <CSVLink {...csvReport}>Export to CSV</CSVLink> */}
                                        {/* <Button style={{marginLeft : "10px", borderRadius: "15px" }} onClick={() => onExportClick()}>export</Button> */}
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
                                            rowData={formatData(props.list ? props.list : [])}
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
            <div>
                {/* add class */}
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={openClass}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Assign Teacher class and subject</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="frm" style={{ minWidth: "100%" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={12}>

                                        {props.classTeacher !== null ?
                                            <Table striped bordered hover responsive size="sm">
                                                <thead>
                                                    <tr>
                                                        <th>Class</th>
                                                        <th> Subject</th>
                                                        <th width="20">Action</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {props.classTeacher.map(i => (
                                                        <tr key={i._id}>
                                                            <td>{i. class && i.class.level.name} {i.class && i.class.label}</td>
                                                            <td>{i. subject && i.subject.name}</td>
                                                            <td width="20"><Button variant="danger" onClick ={() => handleDeleteAssignedClass(i._id)}>Delete</Button></td>
                                                        </tr>
                                                    ))}
                                                </tbody>
                                            </Table> : null
                                        }
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="Select Class"
                                            name="clas"
                                            variant="outlined"
                                            type="text"
                                            value={classData.assignedClass}
                                            fullWidth
                                            onChange={handleChange}
                                            select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {props.classes != null & props.classes != undefined ?
                                                props.classes.map(item => (<MenuItem key={item._id} value={item._id}>{item.level ? item.level.name : ''} {item.combination ? item.combination.name : ""} {item.label}</MenuItem>)) : null
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={6} sm={6}>
                                        <TextField
                                            label="select Subject"
                                            name="subject"
                                            variant="outlined"
                                            type="text"
                                            value={classData.subject}
                                            fullWidth
                                            select
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}>
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {
                                                props.subjects &&
                                                props.subjects.map(i =>
                                                    (<MenuItem value={i._id} key={i._id}>{i.name}</MenuItem>))

                                            }
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

                        <Button onClick={handleCreateClass} color="primary">
                            Assign
                        </Button>
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
    const subjects = state.subjects.list
    const classes = state.classes.list
    const classTeacher = state.classTeacher ? state.classTeacher.list : null
    const { teachers } = state
    const { list } = teachers
    return {
        state, list, subjects, classes, classTeacher
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchTeachers: async (school) => {
        await dispatch(handleFetchTeachers(school))
    },
    handleAddTeacher: async (data) => {
        await dispatch(handleAddTeacher(data))
    },
    handleFetchClasses: (school) => {
        dispatch(handleFetchClasses(school))
    },
    handleFetchSubject: () => {
        dispatch(handleFetchSubject())
    },
    handleFetchClassTeacher: (id) => {
        dispatch(handleFetchClassTeacher(id))
    }

})

export default connect(mapStateToProps, mapDispatchToProps)(Index)

