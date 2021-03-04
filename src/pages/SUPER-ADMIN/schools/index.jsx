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
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Snackbar from '@material-ui/core/Snackbar';
import Slide from '@material-ui/core/Slide';
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import TextField from '@material-ui/core/TextField';


function TransitionRight(props) {
    return <Slide {...props} direction="right" />;
}

const columns = [
    {
        field: '#',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
    },
    {
        field: 'School Name',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 150
    },
    {
        field: 'Created On',
        headerClassName: 'super-app-theme--header',
        headerAlign: 'center',
        width: 150
    },
];


const useStyles = makeStyles((theme) => ({
    root: {
        '& .super-app-theme--header': {
            backgroundColor: '#1f72c7',
            color: 'white',
            fontWeight: '50px',
        },

        '& > *': {
            margin: theme.spacing(1),
        },
        fab: {
            position: 'absolute',
            bottom: theme.spacing(2),
            right: theme.spacing(2),
        },
    },
    margin: {
        margin: theme.spacing(1),
    },
    withoutLabel: {
        marginTop: theme.spacing(3),
    },
    textField: {
        width: '25ch',
    },
    input: {
        display: 'none',
    },
}));

export const Index = (props) => {
    let ar = []
    const dispatch = useDispatch();
    const { list: ALL_SCHOOLS } = useSelector((state) => state.schools);
    const [isLoading, setIsLoading] = useState(true);
  //  const [newSchool , setNewSchool] = useState(null)


    // const handleTextField = (e) => {
    //         setNewSchool(e.target.value)
    //     }
    // )(e){
    //     setNewSchool(e.target.value)
    //     alert(newSchool)
    //}
    // for alert message

    //for dialog box
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const classes = useStyles();
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
            await dispatch(handleFetchSchool());
        } catch (error) {
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        fetchData();
    }, []);


    {
        ALL_SCHOOLS.map((school) => (
            ar.push({ id: count++, '#': count, 'School Name': school.name, 'Created On': school.createdAt })
        ))
    }
    return (
        <>
            <PanelLayout selected={2} role={props.state.auth.user.role}>

                <div className="students-container">
                    <Paper elevation={3}>
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
                                            <form className={classes.root} className="my" noValidate autoComplete="off">
                                                <TextField id="outlined-basic" label="School Name" variant="outlined"  />
                                            </form>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose} color="primary" variant="outlined">
                                            Cancel
                                    </Button>
                                        <Button onClick={addSchool()} color="primary" variant="outlined">
                                            Submit
                                    </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                        <div style={{ height: 300, width: '100%' }} className={classes.root}>
                            {isLoading ? (
                                <SkeletonTheme color="lightGray">
                                    <section>
                                        <Skeleton count={6} />
                                    </section>
                                </SkeletonTheme>
                            ) : (
                                    <DataGrid rows={ar} columns={columns} />
                                )}
                        </div>
                    </Paper>
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
