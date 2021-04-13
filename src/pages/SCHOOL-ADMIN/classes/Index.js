import React, { useState, useEffect } from 'react'
import './Index.css'
import https from '../../../helpers/https'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { connect } from 'react-redux'
import AGTABLE from '../../../components/parts/AG_TABLE'
import { handleFetchClasses, handleAddClass, handleUpdateClass, handleDeleteClass } from '../../../store/actions/classes.actions'
import { handleFetchCombination } from '../../../store/actions/combinations.actions'
import { handleFetchLevels } from '../../../store/actions/levels.actions'
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
    const [CLASSES, setCLASSES] = useState(props.state.classes)
    const { list: COMBINATIONS } = props.state.combinations
    const { list: LEVELS } = props.state.levels
    const [openMsg, setOpenMsg] = useState(false)
    const [Data, setData] = useState([])
    const [msg , setMsg] = useState(null)
    const [type, setType] = useState(null)
    const [id, setId] = useState(null)
    const [updating, setUpdating] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const classes = useStyles();
    const [classData, setClassData] = useState({
        school: school,
        level: null,
        combination: null,
        label: null
    })
    const [open, setOpen] = React.useState(false);
    const [fullWidth, setFullWidth] = React.useState(true);
    const [maxWidth, setMaxWidth] = React.useState('md');
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleOpenMsg = (ty,msg) => {
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
        if (classData.level !== null && classData.combination !== null && classData.label !== null){
            props.handleUpdateClass({id: id, data: classData})
                        handleOpenMsg('success', 'Class Updated Successfully')
                            props.handleFetchClasses(school)
                            setCLASSES(props.state.classes)
                            setData(formatData(CLASSES.list))
                            update()
                            setData(formatData(CLASSES.list))
                        setOpen(false);
                        setUpdating(false)
                        setClassData({
                            school: school,
                            level: null,
                            combination: null,
                            label: null
                        })
        }
    };
    const handleCreate = () => {
        props.handleAddClass(classData)   
        handleOpenMsg('success', 'Class Created Successfully')
            props.handleFetchClasses(school)
            setCLASSES(props.state.classes)
            setData(formatData(CLASSES.list))
            update()
            setData(formatData(CLASSES.list))
            setClassData({
                school: school,
                level: null,
                combination: null,
                label: null
            })
    };

    const handleDelete = (i) => {
        props.handleDeleteClass(i)   
        handleOpenMsg('warning', 'Class Deleted')
            props.handleFetchClasses(school)
            setCLASSES(props.state.classes)
            setData(formatData(CLASSES.list))
            update()
            setData(formatData(CLASSES.list))
            setClassData({
                school: school,
                level: null,
                combination: null,
                label: null
            })
    };

    const handleChange = e => {
        console.log("YOU ARE FCKD")
        if (e.target.name === 'level') setClassData(
            {
                ...classData,
                level: e.target.value
            })

        if (e.target.name === 'combination') setClassData(
            {
                ...classData,
                combination: e.target.value
            })

        if (e.target.name === 'label') setClassData(
            {
                ...classData,
                label: e.target.value
            })
            console.log("CLASSES DATA:",classData)
    }

    const formatData = (unformatted) => {
        let i = 1
        const formatted = []
        unformatted.forEach(i => formatted.push({ level: i.level ? i.level.name : '', combination: i.combination? i.combination.name: '', label: i.label, id: i._id }))
        return formatted
    }
    const editRow = (parms) => {
        const level = parms['data']['level']
        const combination = parms['data']['combination']
        const label = parms['data']['label']
        p2 = Object.assign({}, parms['data']);
        edit = {
            school: school,
            level: (props.levels.find(item => item.name === p2.level))._id,
            combination: (COMBINATIONS.find(item => item.name === p2.combination))._id,
            label: p2.label,
        }
        setClassData(edit)
        setId(parms.value)
        setUpdating(true)
        handleClickOpen()
    }
    const deleteRow = (parms) => {
        console.log(parms.value,"%%%%%")
        setId(parms.value)
        handleDelete(parms.value)
        setUpdating(false)
        setOpen(false)
    }
    const columns = [{ headerName: 'Level', field: 'level', sortable: true, filter: true, checkboxSelection: true, headerCheckboxSelection: true, flex: 1 },
    { headerName: 'Combination', field: 'combination', sortable: true, filter: true, flex: 1 },
    { headerName: 'ID', field: 'id', hide: true },
    { headerName: 'Label', field: 'label', flex: 1 },
    {
        headerName: "Action", field: "id",
        cellRendererFramework: (params) => <div style={{display: "flex", justifyContent : "space-evenly"}}>
            <div style={{ color: "#1F72C6", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"35px", paddingRight:"35px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => editRow(params)}>Edit</div>
            <div style={{ color: "#f00", cursor: "pointer", borderRadius: "4px", backgroundColor: "whitesmoke", textAlign: 'center', paddingLeft:"25px", paddingRight:"25px", verticalAlign: "center", fontWeight: "bold" }} className="edit-btn-class" onClick={() => deleteRow(params)}>Delete</div>
        </div>
    }]

    const update = () => {
        props.handleFetchClasses(school)
        props.handleFetchCombination()
        props.handleFetchLevels()
        setCLASSES(props.state.classes)
            setData(formatData(CLASSES.list))
    }

    useEffect(() => {
        update()
        if(props.state.classes.list){
            setCLASSES(props.state.classes)
        }
    },[CLASSES])
    useEffect(() => {
        update()
    }, [])
    return (
        <div>
            <PanelLayout selected={4} role={role}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div className="paper-hd"><h2>Classes List</h2></div>
                    <div className='add-btn'><button onClick={handleClickOpen} className='check-btn' style={{ wordWrap: "normal" }}>Add a new class</button></div>
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
                                            defaultColDef={{ flex: 1 }}
                                        />
                                    </div>
                                </div>
                            </div> :
                            // <AGTABLE
                            //     data={Data}
                            //     columns={columns} /> :
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
                    <DialogTitle id="max-width-dialog-title">Create a new class</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <div className="frm" style={{ minWidth: "100%" }}>
                                <Grid container spacing={2}>
                                    <Grid item xs={4} sm={4}>

                                        <TextField
                                            label="Level"
                                            value={classData.level}
                                            name="level"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                            select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        >
                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            {LEVELS &&
                                                LEVELS.map(item => (
                                                    <MenuItem key={item._id} value={item._id}>{item.name}&nbsp;</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>

                                        <TextField
                                            label="Combination"
                                            value={classData.combination}
                                            name="combination"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            select
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        >
                                            <MenuItem value={null}>
                                                <em>None</em>
                                            </MenuItem>
                                            {COMBINATIONS &&
                                                COMBINATIONS.map(item => (
                                                    <MenuItem key={item._id} value={item._id}>{item.name}&nbsp;</MenuItem>
                                                ))
                                            }
                                        </TextField>
                                    </Grid>
                                    <Grid item xs={4} sm={4}>

                                        <TextField
                                            label="Label"
                                            value={classData.label}
                                            name="label"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            onChange={handleChange}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
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
    const {classes} = state
    const {list} = classes
    const levels = state.levels.list
    return {
        state,list,levels 
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchClasses: async (school) => {
        await dispatch(handleFetchClasses(school))
    },

    handleFetchCombination: () => {
        dispatch(handleFetchCombination())
    },
    handleFetchLevels: () => {
        dispatch(handleFetchLevels())
    },

    handleAddClass: (data) => {
        dispatch(handleAddClass(data))
    },
    handleUpdateClass: (data) => {
        dispatch(handleUpdateClass(data))
    },
    handleDeleteClass: (data) => {
        dispatch(handleDeleteClass(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
