import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import Popup from '../popup/index'
import Controls from "../../controls/Controls";
import https from '../../helpers/https'
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, TableBody, TableRow, TableCell, InputAdornment, Grid, TextField, MenuItem } from '@material-ui/core';
import useTable from "../../components/parts/useTable";
import Details from '../schoolAdmin/Details'
import QuestionForm from '../schoolAdmin/QuestionForm'
import { FiUpload } from "react-icons/fi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import MarksReport from '../../pages/SCHOOL-ADMIN/marksReport'
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { RiDeleteBin2Line } from "react-icons/ri";
import { handleFetchSubject } from '../../store/actions/subjects.actions'
import { handleFetchQuestion } from '../../store/actions/question.actions'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}



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
export const QuestionTable = (props) => {


    const [isLoading, setIsLoading] = useState(true);
    const [open, setOpen] = React.useState(false);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records, setRecords] = useState(props.data)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [detailsPopup, setDetailsPopup] = useState(false)
    const [file, setFile] = useState(null)
    const [classs, setClasss] = useState([])
    const [studentsClass, setStudentClass] = useState('')
    const [subjectOne, setSubjectOne] = useState("")
    const [subject, setSubject] = useState([])
    const [unit, setUnit] = useState([])
    const headCells = props.head

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(props.questionsList ? props.questionsList : [], headCells, filterFn);


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(x => x.difficultLevel.toLowerCase().includes(target.value) || x.questionsObjective.toLowerCase().includes(target.value) || x.questionType.toLowerCase().includes(target.value))
            }
        })
    }

    const handleChange = e => {
        if (e.target.name == 'subject') setSubjectOne(e.target.value)
    }

    const openInPopup = item => {
        setRecordForEdit(item)
        setOpenPopup(true)
    }
    const openInPrintPopup = item => {
        setRecordForEdit(item)
        setOpenPrintPopup(true)
    }

    const handleDeleteQuestion =async id => {
        await https.delete(`/question-banks/${id}`, { headers: { 'content-type' : 'application/json', 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
            console.log("DELETING : ", res.data)
            setOpen(true)
            props.handleFetchQuestion(subjectOne)
        }).catch(function (err) {
            console.log(err);
        });
    }

    useEffect(() => {
        props.handleFetchQuestion(subjectOne)
        setRecords(props.questionsList)
    }, [subjectOne])

    useEffect(() => {
        props.handleFetchQuestion(subjectOne)
    }, [openPopup])


    useEffect(() => {
        async function fetchSubjects() {
            const req = await https.get(`/lessons/subjects`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setSubject(res.data)
                }).catch(function (err) {
                    console.log(err);
                });
            return req
        }
        fetchSubjects()
        props.handleFetchSubject()
    }, [])

    return (
        <div>
            <div className="student-container">
                <Paper elevation={5}>
                    <div className="paper-hd"><h2>Questions List</h2></div>
                    <div className='report-field'>

                    </div>
                    <div className="student-controls">
                        <Grid container spacing={2}>
                            <Grid item xs={4}>
                                <TextField
                                    label="Subject"
                                    variant="outlined"
                                    name="subject"
                                    value={subjectOne}
                                    onChange={handleChange}
                                    type="text"
                                    fullWidth
                                    select
                                    InputLabelProps={{
                                        shrink: true,
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    {
                                        props.subjectsList &&
                                        props.subjectsList.map(item => (
                                            <MenuItem key={item._id} value={item._id}>
                                                {item.name}
                                            </MenuItem>
                                        ))
                                    }
                                </TextField>
                            </Grid>
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
                                    text="Add New Question"
                                    variant="outlined"
                                    startIcon={<AddIcon />}
                                    onClick={() => setOpenPopup(true)}
                                />
                            </Grid>
                            <Grid item xs={4}>
                            </Grid>
                        </Grid>
                    </div>
                    <TblContainer>
                        <TblHead />
                        <TableBody>
                            {
                                recordsAfterPagingAndSorting().map(item =>
                                (<TableRow key={item._id}>
                                    <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{item.question}</TableCell>
                                    <TableCell>{subject.reduce(function (data, condition) {
                                        if (item.subject === condition._id) {
                                            var fin = condition.name
                                            data = fin
                                        }
                                        return data
                                    }, [])}</TableCell>
                                    <TableCell>{item.difficultLevel}</TableCell>
                                    <TableCell>{(item.questionType)}</TableCell>
                                    <TableCell>
                                        {/* <Controls.ActionButton
                                            color="primary"
                                            onClick={() => alert("to be added next")}>
                                            <EditOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton> */}
                                        <Controls.ActionButton
                                            onClick={() => handleDeleteQuestion(item._id)}
                                            color="secondary">
                                            <RiDeleteBin2Line fontSize="normal" style={{ color: "white" }} />
                                        </Controls.ActionButton>
                                    </TableCell>
                                </TableRow>)
                                )
                            }
                        </TableBody>
                    </TblContainer>
                    <TblPagination />
                </Paper>
                <Popup
                    title="Record a Question "
                    openPopup={openPopup}
                    setOpenPopup={setOpenPopup}>
                    <QuestionForm recordForEdit={recordForEdit} setOpenPopup={setOpenPopup} /></Popup>
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
            </div >
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                     Question is Deleted!
                </Alert>
            </Snackbar>
        </div>
    )
}

const mapStateToProps = (state) => {
    // const { classes } = state
    // const classList = classes.list

    // const { students } = state
    // const studentsList = students.list

    const { subjects } = state
    const subjectsList = subjects.list

    const { questions } = state
    const questionsList = questions.list

    // const {teachers} = state
    // const teachersList = teachers.list
    return {
        state, subjectsList, questionsList
    }
}

const mapDispatchToProps = dispatch => ({
    // handleFetchClasses: (school) => {
    //     dispatch(handleFetchClasses(school))
    // },
    // handleFetchStudent: (school) => {
    //     dispatch(handleFetchStudent(school))
    // },
    handleFetchSubject: () => {
        dispatch(handleFetchSubject())
    },
    handleFetchQuestion: (subject) => {
        dispatch(handleFetchQuestion(subject))
    }
    // handleFetchTeachers: (school) => {
    //     dispatch(handleFetchTeachers(school))
    // }
})

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable)
