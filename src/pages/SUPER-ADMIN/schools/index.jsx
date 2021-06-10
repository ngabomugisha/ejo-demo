import React, { useState, useEffect ,useCallback} from 'react'
import './Index.css'
import { makeStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { useDispatch, useSelector } from 'react-redux';
import { handleFetchSchool, handleAddSchool } from '../../../store/actions/schools.actions'
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



export const Index = (props) => {
    let school = null
    let role = null
    let teacherId = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { teacherId = props.state.auth.user._id; role = props.state.auth.user._id } }
   
    
    const [tableData, setTableData] = useState([])
    const dispatch = useDispatch();
    const { list: ALL_SCHOOLS } = useSelector((state) => state.schools);
    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);


    const [gridApi, setGridApi] = useState(null);
    const [gridColumnApi, setGridColumnApi] = useState(null);
    const [rowData, setRowData] = useState(null);
    const onGridReady = (params) => {
        setGridApi(params.api);
        setGridColumnApi(params.columnApi);
        const updateData = (data) => { setRowData(data); };
    }

    const columns = [
    { headerName: 'School Name', field: 'name', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true,flex:1 },
    { headerName: 'Gender', field: 'gender', sortable: true, filter: true,flex:1 },
    { headerName: 'Status', field: 'status', flex:1 },
    { headerName: 'ID', field: '_id', hide: true, flex: 1 },
    { headerName: "Action", field: "id",
        cellRendererFramework: (params) => <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "20px", backgroundColor: "#e8f5ff" , marginRight: "10px", textAlign: 'center', paddingLeft: "35px", paddingRight: "35px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => alert("are you sure you want to delete school?")}>Delete</div>
            {/* <div style={{ color: "#f00", cursor: "pointer", borderRadius: "14px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"25px", paddingRight:"25px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => deleteRow(params)}>Delete</div> */}
        </div>
    }]


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    let count = 0


    const addSchool = async (data) => {
        try {
            await dispatch(handleAddSchool({ 'name': data.name }));
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    }


    const fetchData = async () => {
        try {
            props.handleFetchSchool()
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
        props.schoolList &&
        props.schoolList.map((school) => (
            setTableData(data => [...data, { id: count++, '#': count, 'School Name': school.name, 'Created On': school.createdAt }])
        ))
    }, []);

 useEffect(() => {
     console.log("TABLE DATA :", tableData)
 }, [tableData])
   
    return (
        <>
            <PanelLayout selected={2} role={role}>

                <div className="students-container">
                        <div className='paper-hd'>
                            <h2>{"Schools List"}</h2>
                            <Fab color="primary" aria-label="add" onClick={handleClickOpen}>
                                <AddIcon />
                            </Fab>
                        </div>
                        <div>
                            <div className="modal-btn">
                                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" maxWidth="xs" fullWidth>
                                    <DialogTitle id="form-dialog-title">Create a new School</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            {/* <WarningRoundedIcon color="primary" /> Use provided template */}
                                </DialogContentText>

                                        <div className="form">
                                            <form className="my" noValidate autoComplete="off">
                                                <TextField id="outlined-basic" label="School Name" variant="outlined"  />
                                            </form>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary" variant="outlined">
                                            Cancel
                                    </Button>
                                        <Button onClick={addSchool} color="primary" variant="outlined">
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
                                    rowData={props.schoolList ? props.schoolList : []}
                                    onGridReady={onGridReady}/>
                                    </div>
                                )}
                        </div>
                </div>

            </PanelLayout>

        </>
    )
}

const mapStateToProps = (state) => {
    const {schools} = state
    const schoolList = schools.list
    return {
        state, schoolList
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchSchool: async () => {
        await dispatch(handleFetchSchool())
    },

})
  
export default connect(mapStateToProps, mapDispatchToProps)(Index)
