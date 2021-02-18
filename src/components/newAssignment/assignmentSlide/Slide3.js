import React from 'react'
import './Slide3.css'
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


function Slide3() {
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
        <div className='slide3-container'>
            <FormControl style={{ minWidth: '100%' }} variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Select Assignment Type</InputLabel>
                <Select
                    native
                    minWidth
                    value={state.age}
                    onChange={handleChange}
                    label=" Select Assignment Type"
                    inputProps={{
                        name: 'Assignment Type',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>Ten</option>
                    <option value={20}>Twenty</option>
                    <option value={30}>Thirty</option>
                </Select>
            </FormControl>
            <div className="question-field">
                <TextField id="outlined-basic" label="Question 1" variant="outlined" value="Question 1: What is Climate Change?" />
            </div>
            <h3>Cognitive Domain Category</h3>
            <div className='radio-groups'>
                <form>
                    <div className='radio-group'>
                        <fieldset id="group1">
                            <div className='option'><label>Remembering</label><input type="radio" value="Remembering" name="group1" /></div>
                            <div className='option'><label>Understanding</label><input type="radio" value="Understanding" name="group1" /></div>
                            <div className='option'><label>Applying</label><input type="radio" value="Applying" name="group1" /></div>
                            <div className='option'><label>Analyzing</label><input type="radio" value="Analyzing" name="group1" /></div>
                            <div className='option'><label>Synthetizing</label><input type="radio" value="Synthetizing" name="group1" /></div>
                            <div className='option'><label>Evaluating</label><input type="radio" value="Evaluating" name="group1" /></div>
                        </fieldset>
                    </div>
                </form>
            </div>
            <FormControl style={{ minWidth: '100%' }} variant="outlined" className={classes.formControl}>
                <InputLabel htmlFor="outlined-age-native-simple">Select Number of Question</InputLabel>
                <Select
                    native
                    minWidth
                    value={state.age}
                    onChange={handleChange}
                    label="Select Number of Question"
                    inputProps={{
                        name: 'Assignment Type',
                        id: 'outlined-age-native-simple',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={1}>1 Questions</option>
                    <option value={2}>2 Questions</option>
                    <option value={3}>3 Questions</option>
                    <option value={4}>4 Questions</option>
                    <option value={5}>5 Questions</option>
                    <option value={6}>6 Questions</option>
                    <option value={7}>7 Questions</option>
                    <option value={8}>8 Questions</option>
                    <option value={9}>9 Questions</option>
                    <option value={10}>10 Questions</option>
                </Select>
            </FormControl>
        </div>
    )
}

export default Slide3
