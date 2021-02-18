import React from 'react'
import './Slide5.css'
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';




const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));


function Slide5() {
    const classes = useStyles();
    const [state, setState] = React.useState({
        Assignment: '',
        name: 'hai',
    });
    const handleChange = (event) => {
        const name = event.target.name;
        setState({
            ...state,
            [name]: event.target.value,
        });
    };

    return (
        <div className="slide5-container">
            <div className="question-field">
                <TextField id="outlined-basic" label="Question Total Marks" variant="outlined" value="100" />
            </div>
            <div className='select'>
            <FormControl style={{ minWidth: '99%' }} variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Select Question From Library</InputLabel>
                <Select
                    native
                    minWidth
                    value={state.age}
                    onChange={handleChange}
                    label="Select Question From Library"
                    inputProps={{
                        name: 'Assignment Type',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option value={10}>Question from Library</option>
                    <option value={20}>Create Question</option>
                </Select>
            </FormControl>
            </div>
            <div className="question-field">
                <TextField id="outlined-basic" label="Question 1" variant="outlined" value="Question 1: What is Climate Change?" />
            </div>
            <div className="question-field">
                <TextField id="outlined-basic" label="Set New Question" variant="outlined" value="How to stop Climate Change" />
            </div>
            <div className="question-field">
                <TextField id="outlined-basic" label="Answer to Question" variant="outlined" value="How to stop Climate Change" />
            </div>
        </div>
    )
}

export default Slide5
