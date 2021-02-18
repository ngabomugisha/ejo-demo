import React from 'react'
import './Slide1.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: '-5px',
        width: 200,
        backgroundColor: '#fff',
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
        backgroundColor: '#fff',
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));

function Slide1() {
    const classes = useStyles()
    const [term, setTerm] = React.useState('')
    const handleChange = (event) => {
        setTerm(event.target.value)
    };
    return (
        <div className='slide1-container'>
            <div className='first-field'>
                <div className="top-field">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Birthday"
                    type="date"
                    color="primary"
                    defaultValue="2017-05-24"
                    InputLabelProps={{
                        shrink: true,
                    }}
                /></div>
                <div className='top-field'>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Term</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={term}
                        onChange={handleChange}
                        label="Select Term"
                        color="primary"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"First Term"}>First Term</MenuItem>
                        <MenuItem value={"Second Term"}>Second Term</MenuItem>
                        <MenuItem value={"Third Term"}>Third Term</MenuItem>
                    </Select>
                </FormControl>
                </div>
            </div>
            <div className="topic">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Age</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value="none"
                        onChange={handleChange}
                        label="Age"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={10}>Entreprenurship</MenuItem>
                        <MenuItem value={20}>Biology</MenuItem>
                        <MenuItem value={30}>Mathematics</MenuItem>
                        <MenuItem value={30}>Chemistry</MenuItem>
                        <MenuItem value={30}>Physics</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <h3>Units</h3>
            <div className='unit'>
                <input type='radio' value='' />
            </div>
            <div className='units'>
                <div className='top'>
                <label><span className='spn1'>Expected 9</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='spn2'>Covered 8</span></label><input type='radio' value='' />
                </div>
                <p>Food and Nutrition</p> 
            </div>

            <div className='units'>
                <div className='top'>
                <label><span className='spn1'>Expected 9</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className='spn2'>Covered 8</span></label><input type='radio' value='' />
                </div>
                <p>Holiday Activities</p> 
            </div>
            {/*
            <FormControl variant="outlined" color="primary" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Select Topic</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={Age}
                        onChange={handleChange}
                        label="Select Topic"
                        color="primary"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"First Term"}>First Term</MenuItem>
                        <MenuItem value={"Second Term"}>Second Term</MenuItem>
                        <MenuItem value={"Third Term"}>Third Term</MenuItem>
                    </Select>
</FormControl>*/}
        </div>
    )
}

export default Slide1
