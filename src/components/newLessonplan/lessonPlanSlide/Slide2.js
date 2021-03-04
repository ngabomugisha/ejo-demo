import React, { useState } from 'react'
import './Slide2.css'
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Tab from 'react-bootstrap/Tab'
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

function Slide2() {

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
        <div className='slide2-container'>

            <Tabs
                id="controlled-tab-example"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="home" title="Knowledge">
                    <div className='knowledge-container'>
                        <h5>Instructional Object</h5>

                        <div className='topic'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Select Knowledge</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={term}
                                    onChange={handleChange}
                                    label="Select Knowledge"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cognitive Domain Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Understanding"
                                    onChange={handleChange}
                                    label="Cognitive Domain Level"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Standard Criteria Performance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Standard Criteria Performance"
                                    onChange={handleChange}
                                    label="Standard Criteria Performance"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Instruction Material</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Audio-visual"
                                    onChange={handleChange}
                                    label="Instruction Material"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Prints</MenuItem>
                                    <MenuItem value={20}>Audio</MenuItem>
                                    <MenuItem value={30}>Visuals</MenuItem>
                                    <MenuItem value={40}>Audiovisuals</MenuItem>
                                    <MenuItem value={50}>Electronic Interactives</MenuItem>
                                    <MenuItem value={60}>Measurement tools </MenuItem>
                                </Select>
                            </FormControl>
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
                                <InputLabel id="demo-simple-select-outlined-label">Other Materials and References</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Other Materials and References"
                                    onChange={handleChange}
                                    label="Other Materials and References"
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

                    </div>
                </Tab>
                <Tab eventKey="profile" title="Skills">
                <div className='knowledge-container'>
                        <h5>Instructional Object</h5>

                        <div className='topic'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Select Knowledge</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={term}
                                    onChange={handleChange}
                                    label="Select Knowledge"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cognitive Domain Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Understanding"
                                    onChange={handleChange}
                                    label="Cognitive Domain Level"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Standard Criteria Performance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Standard Criteria Performance"
                                    onChange={handleChange}
                                    label="Standard Criteria Performance"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Instruction Material</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Audio-visual"
                                    onChange={handleChange}
                                    label="Instruction Material"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Prints</MenuItem>
                                    <MenuItem value={20}>Audio</MenuItem>
                                    <MenuItem value={30}>Visuals</MenuItem>
                                    <MenuItem value={40}>Audiovisuals</MenuItem>
                                    <MenuItem value={50}>Electronic Interactives</MenuItem>
                                    <MenuItem value={60}>Measurement tools </MenuItem>
                                </Select>
                            </FormControl>
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
                                <InputLabel id="demo-simple-select-outlined-label">Other Materials and References</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Other Materials and References"
                                    onChange={handleChange}
                                    label="Other Materials and References"
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

                    </div>
                </Tab>
                <Tab eventKey="contact" title="Attitude and Value">
                <div className='knowledge-container'>
                        <h5>Instructional Object</h5>

                        <div className='topic'>
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Select Knowledge</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value={term}
                                    onChange={handleChange}
                                    label="Select Knowledge"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Cognitive Domain Level</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Understanding"
                                    onChange={handleChange}
                                    label="Cognitive Domain Level"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Standard Criteria Performance</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Standard Criteria Performance"
                                    onChange={handleChange}
                                    label="Standard Criteria Performance"
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
                        <div className="topic">
                            <FormControl variant="outlined" className={classes.formControl}>
                                <InputLabel id="demo-simple-select-outlined-label">Instruction Material</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Audio-visual"
                                    onChange={handleChange}
                                    label="Instruction Material"
                                >
                                    <MenuItem value="">
                                        <em>None</em>
                                    </MenuItem>
                                    <MenuItem value={10}>Prints</MenuItem>
                                    <MenuItem value={20}>Audio</MenuItem>
                                    <MenuItem value={30}>Visuals</MenuItem>
                                    <MenuItem value={40}>Audiovisuals</MenuItem>
                                    <MenuItem value={50}>Electronic Interactives</MenuItem>
                                    <MenuItem value={60}>Measurement tools </MenuItem>
                                </Select>
                            </FormControl>
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
                                <InputLabel id="demo-simple-select-outlined-label">Other Materials and References</InputLabel>
                                <Select
                                    labelId="demo-simple-select-outlined-label"
                                    id="demo-simple-select-outlined"
                                    value="Other Materials and References"
                                    onChange={handleChange}
                                    label="Other Materials and References"
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

                    </div>
                </Tab>
            </Tabs>


        </div>
    )
}

export default Slide2
