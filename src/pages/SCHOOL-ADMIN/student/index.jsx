import React, { useState, useEffect } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Popup from '../../../components/popup'
import { handleFetchStudent } from '../../../store/actions/student.actions'
import Controls from "../../../controls/Controls";
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import { Paper, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Grid } from '@material-ui/core';
import useTable from "../../../components/useTable";
import { useDispatch, useSelector } from 'react-redux';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import Details from '../../../components/schoolAdmin/Details'
import StudentForm from '../../../components/schoolAdmin/StudentForm'
import { FiUpload } from "react-icons/fi";
import { BsFileEarmarkSpreadsheet } from "react-icons/bs";
import MarksReport from '../marksReport/index'
import { DropzoneArea } from "material-ui-dropzone"
import { createMuiTheme } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';

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

const headCells = [
    { id: 'fistName', label: 'First Name' },
    { id: 'lastName', label: 'Last Name' },
    { id: 'gender', label: 'Gender' },
    { id: 'createdAt', label: 'Registered On' },
    { id: 'actions', label: 'Actions', disableSorting: true }
]
export const Index = (props) => {

    const school = props.state.auth.user.school;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { list: ALL_STUDENTS } = useSelector((state) => state.students);
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [records] = useState(ALL_STUDENTS)
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [uploadPopup, setUploadPopup] = useState(false)
    const [detailsPopup, setDetailsPopup] = useState(false)

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
            <TableCell>{item.lastName}</TableCell>
            <TableCell>{item.gender}</TableCell>
            <TableCell>{(item.createdAt)}</TableCell>
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

    //get student from selected class
    const fetchStudentsData = async (school) => {
        try {
            await dispatch(handleFetchStudent(school));
        } catch (error) {
            alert(error)
        } finally {
            setIsLoading(false);

        }
    };
    useEffect(() => {
        fetchStudentsData(school);
    }, []);

    return (
        <>
            <PanelLayout selected={2} role={props.state.auth.user.role}>

                <div className="student-container">
                    <Paper elevation={5}>
                        <div className="paper-hd"><h2>Students List</h2></div>
                        <Toolbar>
                            <Grid container spacing={3}>
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
                        </Toolbar>
                        <TblContainer>
                            <TblHead />
                            <TableBody>
                                {isLoading ? (
                                    <SkeletonTheme color="lightGray">
                                        <section>
                                            <Skeleton fullWidth height={50} />
                                            <Skeleton animation={false} />
                                            <Skeleton animation="wave" />
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
                        title="Register Student Form"
                        openPopup={openPopup}
                        setOpenPopup={setOpenPopup}>
                        <StudentForm recordForEdit={recordForEdit} /></Popup>
                    <Popup
                        title="upload Students list (.xsls, .xsl)"
                        openPopup={uploadPopup}
                        setOpenPopup={setUploadPopup}>
                        <div>
                            <Grid container xs={12} spacing={2} minWidth={12} justify="center" direction="column">
                                <Grid item xs={12}>
                                    <DropzoneArea
                                        acceptedFiles={['image/*']}
                                        dropzoneText={"Drag and drop an Excel file here or click to select"}
                                        onChange={(files) => console.log('Files:', files)}
                                    />
                                </Grid>
                            </Grid>
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
                </div>

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
