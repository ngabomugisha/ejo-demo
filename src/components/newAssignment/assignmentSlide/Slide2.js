import React, { useState } from 'react'
import './Slide2.css'
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import FilledInput from '@material-ui/core/FilledInput';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
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
}));

function Slide2() {
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: '',
        password: '',
        weight: '',
        weightRange: '',
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    return (
        <div className='slide1-container'>
            <h3>Assignment Type</h3>
            <div className='radio-groups'>
                <form>
                    <div className='radio-group'>
                        <fieldset id="group1">
                            <div className='option'><label>Individual Work</label><input type="radio" value="Individual Work" name="group1" /></div>
                            <div className='option'><label>Group Work</label><input type="radio" value="Group Work" name="group1" /></div>
                            <div className='option'><label>Home Work</label><input type="radio" value="Home Work" name="group1" /></div>
                            <div className='option'><label>Summative</label><input type="radio" value="Summative" name="group1" /></div>
                            <div className='option'><label>Exams</label><input type="radio" value="Exams" name="group1" /></div>
                        </fieldset>
                    </div>
                    <div className='radio-group'>
                        <fieldset id="group2">
                            <div className='option'><label>Oral</label><input type="radio" value="Oral" name="group2" /></div>
                            <div className='option'><label>Practice</label><input type="radio" value="Practice" name="group2" /></div>
                            <div className='option'><label>Written/Type</label><input type="radio" value="Written/Type" name="group2" /></div>
                        </fieldset>
                    </div>
                </form>
            </div>

            <div className={classes.root}>
                <div>
                    <TextField
                        color="primary"
                        label="Test Duration"
                        size="small"
                        id="outlined-start-adornment"
                        className={clsx(classes.margin, classes.textField)}
                        InputProps={{
                            endAdornment: <InputAdornment position="end">Minutes</InputAdornment>,
                        }}
                        variant="outlined"
                    />
                </div>
            </div>
        </div>
    )
}

export default Slide2
