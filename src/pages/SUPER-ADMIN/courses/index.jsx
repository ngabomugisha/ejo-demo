import React, { useEffect, useState, createRef  } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import https from '../../../helpers/https'
import { makeStyles } from '@material-ui/core/styles';
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchSchool, handleAddSchool } from '../../../store/actions/schools.actions'
import { handleFetchSubject } from '../../../store/actions/subjects.actions'
import { Paper } from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TextField from '@material-ui/core/TextField';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import { DropzoneArea } from "material-ui-dropzone"
import MuiAlert from '@material-ui/lab/Alert';


function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export const Index = (props) => {
    let school = null
    let role = null
    let teacherId = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { teacherId = props.state.auth.user._id; role = props.state.auth.user._id } }
   
    const dropzoneRef = createRef()
    const openDialog = () => {
        if (dropzoneRef.current) {
            dropzoneRef.current.open()
        }
    }
    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null); 
    const [uploadPopup, setUploadPopup] = useState(false)
    const [isLoading, setIsLoading] = useState(true);
    const [file, setFile] = useState(null)
    const [open, setOpen] = React.useState(false);
    const [ subject, setSubject] = useState("")
    const [ msg, setMsg] = useState("")
    const [ type, setType] = useState("")
    const [ openMsg, setOpenMsg] = useState("")




    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        const updateData = (data) => { setRowData(data); };
    }

    const columns = [
        { headerName: 'School Name', field: 'name', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true,flex:1 },
        { headerName: 'ID', field: '_id', hide: true, flex: 1 },
        { headerName: "Action", field: "id",
            cellRendererFramework: (params) => <div style={{ display: "flex", justifyContent: "center" }}>
                <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "20px", backgroundColor: "#e8f5ff" , marginRight: "10px", textAlign: 'center', paddingLeft: "35px", paddingRight: "35px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => alert(JSON.stringify(params))}>Delete</div>
                {/* <div style={{ color: "#f00", cursor: "pointer", borderRadius: "14px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"25px", paddingRight:"25px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => deleteRow(params)}>Delete</div> */}
            </div>
        }]

//Method



const handleClickOpen = () => {
    setOpen(true);
};
const handleClose = () => {
    setOpen(false);
};
const fetchData = async () => {
    try {
        props.handleFetchSubject()
    } catch (error) {
    } finally {
        setIsLoading(false);
    }
};


const handleOpenMsg = (ty, msg) => {
    setMsg(msg)
    setType(ty)
    setOpenMsg(true)
}
const handleCloseMsg = () => {
    props.handleFetchSubject()
    setOpenMsg(false)
}


const handleUpload = async () => {

    const formData = new FormData()
    formData.append('name', subject)
    formData.append('subject', file)
    console.log("******************", file, subject)
    const dat = {
        'name': subject,
        'subject': file
    }
    await https.post('/lessons/subjects/create-from-csv', formData, { headers: { 'Content-Type': 'multipart/form-data', 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
            handleOpenMsg("success", 'Subject has been created successful')
            handleClose()
        }).catch((erro) => {
            console.log("ERROR :", erro)
        })
}

const handleChange = e => {
    if(e.target.name === 'subjectName') setSubject(e.target.value)
}


//UseEffects
    useEffect(() => {
        fetchData()
    }, [])


console.log("This is Subjects", props.subjectsList)


    return (
        <>
            <PanelLayout selected={3} role={role}>
                
            <div className="students-container">
                        <div className='paper-hd'>
                            <h2>{"Subjects List"}</h2>
                            <Button variant="primary" onClick={handleClickOpen}>
                                <AddIcon /> Upload a subject
                            </Button>
                        </div>
                        <div>
                            <div className="modal-btn">
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                                    <DialogTitle id="form-dialog-title">Create a new Subject</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            {/* <WarningRoundedIcon color="primary" /> Use provided template */}
                                </DialogContentText>

                                        <div className="form">
                                            <form className="my" noValidate autoComplete="off">
                                                <div style={{padding: "20px"}}>
                                                <TextField  
                                                label="Subject Name" 
                                                variant="outlined"
                                                name="subjectName"
                                                value={subject}
                                                fullWidth
                                                onChange={handleChange}
                                                  />
</div>
                                                <DropzoneArea
                                                    acceptedFiles={[".csv, text/csv, application/vnd.ms-excel, application/csv, text/x-csv, application/x-csv, text/comma-separated-values, text/x-comma-separated-values"]}
                                                    filesLimit={1}
                                                    dropzoneText={"Drag and drop a CSV File here or click to browse"}
                                                    onChange={(files) => setFile(files[0])}
                                                />
                                            </form>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary" variant="outlined">
                                            Cancel
                                    </Button>
                                        <Button onClick={handleUpload} variant="primary">
                                            Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div style={{ height: 300, width: '100%' }}>
                            {isLoading ? (
                                <SkeletonTheme color="lightGray">
                                    <section>
                                        <Skeleton count={6} />
                                    </section>
                                </SkeletonTheme>
                            ) : (
                                <div
                                    id="myGrid"
                                    style={{
                                        height: '100%',
                                        width: "100%",
                                    }}
                                    className="ag-theme-alpine">
                                    <AgGridReact
                                    columnDefs={columns}
                                    rowData={props.subjectsList ? props.subjectsList : []}
                                    onGridReady={onGridReady}/>
                                    </div>
                                )}
                        </div>
                </div>


                <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleCloseMsg}>
                    <Alert onClose={handleCloseMsg} severity={type}>
                        {msg}
                    </Alert>
                </Snackbar>
                
            </PanelLayout>
        </>
    )
}

const mapStateToProps = (state) => {
    const {subjects} = state
    const subjectsList = subjects.list
    return {
        state, subjectsList
    }
}

const mapDispatchToProps = dispatch => ({
    
    handleFetchSubject: async () => {
        await dispatch(handleFetchSubject())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
