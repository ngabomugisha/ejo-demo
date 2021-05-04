import React,{useState, useEffect, createRef} from 'react'
import { connect } from 'react-redux'
import https from '../../helpers/https'
import Popup from '../popup/index'
import Controls from "../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, TableBody, TableRow, TableCell, MenuItem, InputAdornment, Grid, TextField } from '@material-ui/core';
import useTable from "../../components/parts/useTable";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Details from '../schoolAdmin/Details'
import StudentForm from '../schoolAdmin/StudentForm'
import { FiUpload } from "react-icons/fi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import MarksReport from '../../pages/SCHOOL-ADMIN/marksReport'
import { DropzoneArea } from "material-ui-dropzone"
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import {useDropzone} from 'react-dropzone';
import { Formik, Field, Form } from 'formik'


const theme = createMuiTheme({
    palette: {
        primary: {
            main: purple[500],
        },
        secondary: {
            main: '#8bc34a',
        },
    },
});
export const Table = (props) => {

    const dropzoneRef = createRef()
    const openDialog = () => {
    if(dropzoneRef.current){
        dropzoneRef.current.open()
    }
}

    function Accept(props) {
        const {
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        } = useDropzone({
          accept: 'text/csv'
        });
      
        return (
          <div className="container">
            <div className="my-dropzone" {...getRootProps({className: 'dropzone'})}>
              <input {...getInputProps()} />
              {isDragAccept && (<p className = "dropzone-message">All csv files will be accepted</p>)}
              {isDragReject && (<p className = "dropzone-message">This File is not allowed use tepmlate</p>)}
              {!isDragActive && (<p className = "dropzone-message">Drop CSV file here or click to browse</p>)}
              <button className="check-btn-2" style={{}} type="button" onClick={openDialog}>Browse a file</button>
            </div>
          </div>
        );
      }

    const [isLoading, setIsLoading] = useState(true);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records] = useState(props.data)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [uploadPopup, setUploadPopup] = useState(false)
    const [detailsPopup, setDetailsPopup] = useState(false)
    const [file,setFile] = useState(null)
    const [classs, setClasss] = useState([])
    const [studentsClass, setStudentClass] = useState('')
    const headCells = props.head
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
    const openUploadPopup = () => {
        setUploadPopup(true)
    }
    const openDetailsPopup = () => {
        setDetailsPopup(true)
    }
    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const openInPrintPopup = item => {
        setRecordForEdit(item)
        setOpenPrintPopup(true)
    }

    function loadBody() {
        return (recordsAfterPagingAndSorting().map(item =>
        (<TableRow key={item._id}>
            <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{item.firstName}</TableCell>
            <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{item.lastName}</TableCell>
            <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{item.gender}</TableCell>
            <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{(item.createdAt).substring(0,10)}</TableCell>
            <TableCell>
                <Controls.ActionButton
                    color="primary"
                    onClick={() => openInPopup(item)}>
                    <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                    onClick={() => openInPrintPopup(item)}
                    color="secondary">
                    <BsFileEarmarkSpreadsheet fontSize="normal" />
                </Controls.ActionButton>
            </TableCell>
        </TableRow>)
        ))
    }


const handleupload = (e) => {
    console.log(e.target.files[0])
    if((e.target.files[0].name).substring((e.target.files[0].name).indexOf('.')+1)== 'csv'){
    console.log("YES")
        setFile(e.target.files[0])
}
}

const upload = async () => {

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


function loadTable(){

    return (<div className="student-container">
                    <Paper elevation={5}>
                        <div className="paper-hd"><h2>Students List</h2></div>
                        <div className="student-controls">
                            <Grid container spacing={2}>
                                <Grid item xs={4}>
                                    <Controls.Input
                                        label="Search Students"
                                        fullWidth
                                        InputProps={{
                                            startAdornment: (<InputAdornment position="start">
                                                <Search />
                                            </InputAdornment>)
                                        }}
                                        onChange={handleSearch}
                                    /></Grid>

                                <Grid item xs={4}>
                                    <Controls.Button
                                        fullWidth
                                        text="Add New student"
                                        variant="outlined"
                                        startIcon={<AddIcon />}
                                        onClick={() => { setOpenPopup(true); setRecordForEdit(null); }}
                                    />
                                </Grid>

                                <Grid item xs={4}>
                                    <Controls.Button
                                        text="Import New students"
                                        variant="outlined"
                                        fullWidth
                                        startIcon={<FiUpload />}
                                        onClick={() => setUploadPopup(true)}
                                    />
                                </Grid>
                            </Grid>
                        </div>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {
                                    loadBody()
                                }
                            </TableBody>
                        </TblContainer>
                        <TblPagination />
                    </Paper>
                    <Popup
                        title="Register Student Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}>
                        <StudentForm recordForEdit={recordForEdit} /></Popup>
                    <Popup
                        title="upload Students list (.xsls, .xsl)"
                        openPopup={uploadPopup}
                        setOpenPopup={setUploadPopup}>
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
                                <button className="check-btn" type="button" onClick={upload}>Upload data</button>
                                </Grid>
                            </Grid>
                            </form>
                        </div>
                    </Popup>

                    <Popup
                        title="Student Details"
                        openPopup={detailsPopup}
                        setOpenPopup={setDetailsPopup}>
                        <Details recordForEdit={recordForEdit} />
                    </Popup>

                    <Popup
                        title="Student School Report"
                        print={true}
                        openPopup={openPrintPopup}
                        setOpenPopup={setOpenPrintPopup}>
                        <MarksReport recordForEdit={recordForEdit} />
                    </Popup>
                </div>)

}

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
    return (
        <div>
                {loadTable()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = {
    
}

export default connect(mapStateToProps, mapDispatchToProps)(Table)
