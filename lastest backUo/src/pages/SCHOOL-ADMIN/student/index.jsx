import React, { useState, useEffect,createRef } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { connect } from 'react-redux'
import { handleFetchStudent } from '../../../store/actions/student.actions'
import { TextField, Grid, Snackbar, Switch, Select, MenuItem, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, InputLabel } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import Skeleton from "@material-ui/lab/Skeleton"
import { Box } from '@material-ui/core'
import EditorWrapText from 'material-ui/svg-icons/editor/wrap-text'
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-enterprise'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import StudentForm from '../../../components/schoolAdmin/StudentForm'
import { FiUpload } from "react-icons/fi";
import {useDropzone} from 'react-dropzone';
import { DropzoneArea } from "material-ui-dropzone"
import EditorFormatListBulleted from 'material-ui/svg-icons/editor/format-list-bulleted'
import { DeleteForeverTwoTone } from '@material-ui/icons'

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
    const dropzoneRef = createRef()
    const openDialog = () => {
    if(dropzoneRef.current){
        dropzoneRef.current.open()
    }
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
    const [STUDENT, setSTUDENT] = useState(props.state.students)
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [uploadPopup, setUploadPopup] = useState(false)
    const [openMsg, setOpenMsg] = useState(false)
    const [Data, setData] = useState([])
    const [msg, setMsg] = useState(null)
    const [type, setType] = useState(null)
    const [id, setId] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [studentsClass, setStudentClass] = useState('')
    const [file,setFile] = useState(null)
    const classes = useStyles();
    const [classs, setClasss] = useState([])
    const [studentData, setStudentData] = useState({
        studentClass: null,
        firstName: null,
        lastName: null,
        registrationNumber: null,
        gender: null,
        studentProgram: null,
        dateOfBirth: null,
        address: null,
        scholarship: null,
        ngo: {
            name: null,
            contactPerson: {
                title: null,
                name: null,
                phone: null
            }
        },
        allergies: null,
        permanentHealthConditions: [
        ],
        "guardians": [
            {
                firstName: null,
                lastName: null,
                identificationNumber: null,
                phone: null,
                email: null,
                maritalStatus: null,
                relationship: null,
            }
        ]
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
        update()
        setOpen(false)
        setUploadPopup(false)
    }

    const handleUpdate = async () => {
        if (studentData) {
            props.handleUpdateClass({ id: id, data: studentData })
            handleOpenMsg('success', 'Class Updated')
            setTimeout(() => {
                props.handleFetchClasses(school)
                setSTUDENT(props.state.students)
                setData(formatData(STUDENT.list))
                update()
                setData(formatData(STUDENT.list))
            }, 0);
            setOpen(false);
            setUpdating(false)
            setStudentData({
                school: school,
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
        props.handleAddStudent(studentData)
        handleOpenMsg('success', 'Student Updated')
        setTimeout(() => {
            props.handleFetchStudents(school)
            setSTUDENT(props.state.students)
            setData(formatData(props.list))
            update()
            setData(formatData(props.list))
        }, 0);
    };

const handleUpload = async () => {

    console.log("button clicked",file)
    const formData = new FormData()
    
    formData.append('studentClass', studentsClass._id)
    formData.append('students',file)

    for (var key of formData.entries()) {
        console.log(key[0] + ', ' + key[1]);
    }


    const dat = {
        'studentClass': studentsClass._id,
        'students':file
    }
    console.log("DATA READY:" ,dat)
    console.log("this is formData :",formData)
    await https.post('/students/create-from-csv' , formData,  {  headers : { 'Content-Type' : 'multipart/form-data', 'Authorization': `Basic ${localStorage.token}` } })
    .then((res)=>{
        alert(res.status)
    }).catch((erro) => {
        console.log("ERROR :",erro)
    })
}



const handleupload = (e) => {
    console.log(e.target.files[0])
    if((e.target.files[0].name).substring((e.target.files[0].name).indexOf('.')+1)== 'csv'){
    console.log("YES")
        setFile(e.target.files[0])
}
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

        if (e.target.name === 'firstName') setStudentData(
            {
                ...studentData,
                firstName: e.target.value
            })

        if (e.target.name === 'lastName') setStudentData(
            {
                ...studentData,
                lastName: e.target.value
            })

        if (e.target.name === 'email') setStudentData(
            {
                ...studentData,
                email: e.target.value
            })

        if (e.target.name === 'phoneNumber') setStudentData(
            {
                ...studentData,
                phoneNumber: e.target.value
            })

        if (e.target.name === 'workingStatus') setStudentData(
            {
                ...studentData,
                workingStatus: e.target.value
            })

        if (e.target.name === 'yearsOfExperience') setStudentData(
            {
                ...studentData,
                yearsOfExperience: parseInt(e.target.value)
            })

        if (e.target.name === 'level') setStudentData(
            {
                ...studentData,
                level: e.target.value
            })


    }

    const formatData = (unformatted) => {
        let i = 1
        const formatted = []
        unformatted.forEach(i => { 
            formatted.push({ firstName: i.firstName, lastName: i.lastName, studentClass: i.studentClass, registrationNumber: i.registrationNumber, gender: i.gender, studentProgram: i.studentProgram, dateOfBirth: i.dateOfBirth, scholarship: i.scholarship, address: i.address, workingStatus: i.workingStatus, id: i._id }) })
        return formatted
    }
    const editRow = (parms) => {
        p2 = Object.assign({}, parms['data']);
        // edit = {
        //     school: school,
        //     level: (LEVELS.find(item => item.name === p2.level))._id,
        //     combination: (COMBINATIONS.find(item => item.name === p2.combination))._id,
        //     label: p2.label,
        // }
        // setClassData(edit)
        setId(parms.value)
        setUpdating(true)
        handleClickOpen()
    }
    // const deleteRow = (parms) => {
    //     console.log(parms.value,"%%%%%")
    //     setId(parms.value)
    //     handleDelete(parms.value)
    //     setUpdating(true)
    // }
    const columns = [
    { headerName: 'First Name', field: 'firstName', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true, },
    { headerName: 'Last Name', field: 'lastName', sortable: true, filter: true, },
    { headerName: 'Student Class', field: 'studentClass', },
    { headerName: 'registration Number', field: 'registrationNumber', },
    { headerName: 'gender ', field: 'gender', },
    { headerName: 'studentProgram', field: 'studentProgram', },
    { headerName: 'dateOfBirth', field: 'dateOfBirth', width: 150 },
    { headerName: 'address', field: 'address', width: 150 },
    { headerName: 'scholarship', field: 'scholarship', hide: true, flex: 1 },
    { headerName: 'ID', field: 'id', hide: true, flex: 1 },
    {
        headerName: "Action", field: "id",
        cellRendererFramework: (params) => <div style={{ display: "flex" }}>
            <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', padding: "5px",whiteSpace: "nowrap"  }} className="edit-btn-class" onClick={() => alert("edit")}>Edit</div>
            <div style={{ color: "#f00", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', padding: "3px", whiteSpace: "nowrap" }} className="edit-btn-class" onClick={() => alert("edit")}>Delete</div>
        </div>
    }]

    const update = () => {
        props.handleFetchStudent(school)
        setSTUDENT(props.state.students)
        setTimeout(() => {
            setData(formatData(props.list))
        }, 0);
    }

    useEffect(() => {
        update()
        if (props.state.students.list) {
            setSTUDENT(props.state.students)
        }
    }, [STUDENT])

    useEffect(() => {
        async function fetchClasses() {
            const req = await https.get(`/classes/602c1e8feeb9ae2820b62120/school-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setClasss(res.data)
                    console.log("CLASSES : ", res.data)
                }).catch(function (err) {
                    console.log(err);
                });
            return req
        }
        fetchClasses()
        console.log('CHOOSEN CLASS', studentsClass)
    }, [])
    useEffect(() => {
        update()
        if (props.state.students.list) {
            setSTUDENT(props.state.students)
        }
    },[])
    return (
        <div>
            <PanelLayout selected={2} role={role}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="paper-hd"><h2>Students List</h2></div>
                    <div style={{display:"flex"}}><Button onClick={() => setUploadPopup(true)} className='check-btn' style={{ wordWrap: "normal" }}>import a list of Student</Button><Button onClick={handleClickOpen} className='check-btn' style={{ wordWrap: "normal" }}>Register a new Student</Button></div>
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
                                            rowData={formatData(props.list)}
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
                    <DialogTitle id="max-width-dialog-title">Register a new Student</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="frm" style={{ minWidth: "100%" }}>
<StudentForm recordForEdit={recordForEdit} close = {handleClose}/>


                            </div>
                        </DialogContentText>
                    </DialogContent>
                </Dialog>

                {/* UPload Student */}
                <Dialog
                    fullWidth={fullWidth}
                    maxWidth={maxWidth}
                    open={uploadPopup}
                    onClose={handleClose}
                    aria-labelledby="max-width-dialog-title"
                >
                    <DialogTitle id="max-width-dialog-title">Register a new Student</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="frm" style={{ minWidth: "100%" }}>
                                <div>
                                    <form>
                                        <Grid container xs={12} spacing={2} minWidth={12} justify="center" direction="column">

                                            <Grid item xs={12} justify="center">
                                                <TextField
                                                    type="text"
                                                    label="student Class"
                                                    select
                                                    id="select"
                                                    helperText="Please select studentClass"
                                                    variant="outlined"
                                                    fullWidth
                                                    onChange={(e) => setStudentClass(e.target.value)}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                >
                                                    <MenuItem value="">
                                                        <em>NONE</em>
                                                    </MenuItem>
                                                    {classs != null ?
                                                        classs.map(item => (<MenuItem key={item._id} value={item._id}>{item.level.name}</MenuItem>)) : null
                                                    }
                                                </TextField>
                                                {/* <input type="file" onChange={handleupload}/> */}
                                                {/* <Accept onChange={(file) => console.log(file)}/> */}
                                                <DropzoneArea
                                                    acceptedFiles={['text/csv']}
                                                    filesLimit={1}
                                                    dropzoneText={"Drag and drop a CSV File here or click to browse"}
                                                    onChange={(files) => setFile(files[0])}
                                                />
                                               
                                            </Grid>
                                        </Grid>
                                    </form>
                                </div>
                            </div>
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                            <Button onClick={handleUpload} color="primary">
                                Import
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
    const { students } = state
    const { list } = students
    return {
        state, list
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchStudent: async (school) => {
        await dispatch(handleFetchStudent(school))
    },

})

export default connect(mapStateToProps, mapDispatchToProps)(Index)

