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

function Slide1(props) {
    const classes = useStyles()
    const [term, setTerm] = React.useState('')
    const recevied = props.Values
    console.log("RECEIVED,", recevied)
    const handleChange = (event) => {
        setTerm(event.target.value)
    };
    return (
        <div className='slide1-container'>
            
            <div className='topic'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Topic Area</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={term}
                            onChange={handleChange}
                            label="Topic Area"
                            color="primary"
                        >
                            <MenuItem value="">
                                <em>Select Topic</em>
                            </MenuItem>
                            <MenuItem value={"First Term"}>First Term</MenuItem>
                            <MenuItem value={"Second Term"}>Second Term</MenuItem>
                            <MenuItem value={"Third Term"}>Third Term</MenuItem>
                        </Select>
                    </FormControl>
                </div>

                <div className='topic'>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel id="demo-simple-select-outlined-label">Sub Topic</InputLabel>
                        <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={term}
                            onChange={handleChange}
                            label="Sub Topic"
                            color="primary"
                        >
                            <MenuItem value="">
                                <em>Select Sub-Topic</em>
                            </MenuItem>
                            <MenuItem value={"First Term"}>First Term</MenuItem>
                            <MenuItem value={"Second Term"}>Second Term</MenuItem>
                            <MenuItem value={"Third Term"}>Third Term</MenuItem>
                        </Select>
                    </FormControl>
                </div>
            <div className="topic">
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Unit</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value="none"
                        onChange={handleChange}
                        label="Unit"
                    >
                        <MenuItem value="">
                            <em>Select Unit</em>
                        </MenuItem>
                        <MenuItem value={10}>Entreprenurship</MenuItem>
                        <MenuItem value={20}>Biology</MenuItem>
                        <MenuItem value={30}>Mathematics</MenuItem>
                        <MenuItem value={30}>Chemistry</MenuItem>
                        <MenuItem value={30}>Physics</MenuItem>
                    </Select>
                </FormControl>
                </div>
                <div className="msg-field">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Key Unit Competency"
                    type="text"
                    value="To be able to explain the meaning of the 
                    study of livi- ng organisms,
                     divided into many specialized fields that
                     cover their morphology, physiology, anatomy,
                      behaviour, origin, and distribution."
                    color="primary"
                    multiline={true}
                    rowsMax="8"
                    disabled
                />
            </div>
                <div className="topic">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Lesson"
                    type="text"
                    placeholder="Lesson 1"
                    color="primary"
                />
            </div>
          
        </div>
    )
}

export default Slide1
