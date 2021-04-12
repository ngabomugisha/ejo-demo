import React, { useState , useEffect } from 'react'
import { connect } from 'react-redux'
import Popup from '../popup/index'
import Controls from "../../controls/Controls";
import https from '../../helpers/https'
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import { Paper, TableBody, TableRow, TableCell, InputAdornment, Grid } from '@material-ui/core';
import useTable from "../../components/parts/useTable";
import Details from '../schoolAdmin/Details'
import QuestionForm from '../schoolAdmin/QuestionForm'
import { FiUpload } from "react-icons/fi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import MarksReport from '../../pages/SCHOOL-ADMIN/marksReport'
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import { RiDeleteBin2Line } from "react-icons/ri";


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
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records] = useState(props.data)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [detailsPopup, setDetailsPopup] = useState(false)
    const [file, setFile] = useState(null)
    const [classs, setClasss] = useState([])
    const [studentsClass, setStudentClass] = useState('')

    const [subject, setSubject] = useState([])
    const [unit, setUnit] = useState([])
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
            <TableCell onClick={() => { setDetailsPopup(true); setRecordForEdit(item); }}>{item.question}</TableCell>
            <TableCell>{subject.reduce(function (data,condition){
                if(item.subject === condition._id){
                    var fin = condition.name
                    data = fin
                }
                return data
            },[])}</TableCell>
            <TableCell>{item.difficultLevel}</TableCell>
            <TableCell>{(item.questionType)}</TableCell>
            <TableCell>
                <Controls.ActionButton
                    color="primary"
                    onClick={() => alert("to be added next")}>
                    <EditOutlinedIcon fontSize="small" />
                </Controls.ActionButton>
                <Controls.ActionButton
                    onClick={() => openInPrintPopup(item)}
                    color="secondary">
                    <RiDeleteBin2Line fontSize="normal" />
                </Controls.ActionButton>
            </TableCell>
        </TableRow>)
        ))
    }



    function loadTable() {

        return (<div className="student-container">
            <Paper elevation={5}>
                <div className="paper-hd"><h2>Questions List</h2></div>
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
                                text="Add New Question"
                                variant="outlined"
                                startIcon={<AddIcon />}
                                onClick={() => alert('to be added after')}
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
                            loadBody()
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination />
            </Paper>
            <Popup
                title="Record a Question "
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}>
                <QuestionForm recordForEdit={recordForEdit} /></Popup>
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



    // componentDidMount()
    useEffect(() => {
        // async function fetchunit() {
        //     const request = await https.get(`/lessons/units/${subT}/subTopic-units`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
        //     )
        //         .then((response) => {
        //             setUnit(response.data)
        //         });
        //     return request
        // }
        // fetchunit()

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

export default connect(mapStateToProps, mapDispatchToProps)(QuestionTable)
