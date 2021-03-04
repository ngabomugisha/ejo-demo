import React, { useState } from 'react'
import './Slide3.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tab from 'react-bootstrap/Tab'
import TextField from '@material-ui/core/TextField';
import Tabs from 'react-bootstrap/Tabs'
import 'bootstrap/dist/css/bootstrap.min.css'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
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


function Slide3() {
    const [key, setKey] = useState('home');
    const [term, setTerm] = React.useState('')
    const classes = useStyles();
    const [values, setValues] = useState({
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
        <div className='slide3-container'>
            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Introduction">
                    <div className='knowledge-container'>
                        <h5>Introduction</h5>

                        <div className='topic'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Content</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={handleChange}
                                    label="Content"
                                    color="primary"
                                >
                                    <MenuItem value="">
                                        <em>Select content</em>
                                    </MenuItem>
                                    <MenuItem value={"First Term"}>First Term</MenuItem>
                                    <MenuItem value={"Second Term"}>Second Term</MenuItem>
                                    <MenuItem value={"Third Term"}>Third Term</MenuItem>
                                </Select>
                            </FormControl>
                        </div>

                        <div className="msg-field">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Other Activities"
                                type="text"
                                value="Other Activities"
                                color="primary"
                                multiline={true}
                                rowsMax="4"

                            />
                        </div>

                        <div className={classes.root}>
                            <input
                                accept="image/*"
                                className={classes.input}
                                id="contained-button-file"
                                multiple
                                type="file"
                            />
                            <label htmlFor="contained-button-file">
                                <h7>Upload</h7>
                            </label>
                        </div>

                        <div className='topic'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cross Cutting Issue</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    onChange={handleChange}
                                    label="Cross Cutting Issue"
                                    color="primary"
                                >
                                    <MenuItem value="">
                                        <em>Select content</em>
                                    </MenuItem>
                                    <MenuItem value={"First Term"}>First Term</MenuItem>
                                    <MenuItem value={"Second Term"}>Second Term</MenuItem>
                                    <MenuItem value={"Third Term"}>Third Term</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div className="msg-field">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Comment"
                                type="text"
                                color="primary"
                                multiline={true}
                                rowsMax="5"

                            />
                        </div>


                        <div className="topic">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Competency"
                                type="text"
                                placeholder="Other Materials and References"
                                color="primary"
                            />
                        </div>
                        <div className="msg-field">
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Comment"
                                type="text"
                                color="primary"
                                multiline={true}
                                rowsMax="5"

                            />
                        </div>
                    </div>
                </Tab>
                <Tab eventKey="profile" title="Development">
                    <h2>Skills</h2>
                </Tab>
                <Tab eventKey="contact" title="Conclusion">
                    <h2>Attitude and Value</h2>
                </Tab>
            </Tabs>


        </div>
    )
}

export default Slide3
