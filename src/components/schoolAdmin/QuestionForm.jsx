import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Link, useHistory } from 'react-router-dom';
import './style.css'
import axios from 'axios'
import https from '../../helpers/https'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { Autocomplete } from 'formik-material-ui-lab'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));
export const QuestionForm = (props) => {
    let school = null
    let role = null
    let teacherId = null
    
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { teacherId = props.state.auth.user.school; role = props.state.auth.user._id } }
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }
   

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const history = useHistory();

    const [tags, setTags] = React.useState([]);
    const classes = useStyles();
    const selectedTags = tags => {
        console.log(tags);
    };

    const removeTags = indexToRemove => {
        setTags([...tags.filter((_, index) => index !== indexToRemove)]);
    };

    const addTags = event => {
        if (event.target.value !== "") {
            setTags([...tags, event.target.value]);
            selectedTags([...tags, event.target.value]);
            event.target.value = "";
        }
    };



    const [subject, setSubject] = useState([])
    const [topic, setTopic] = useState([])
    const [subtopic, setSubtopic] = useState([])
    const [unit, setUnit] = useState([])
    const [dataTosend, setDataTosend] = useState(null)
    const [open, setOpen] = React.useState(false);

    const [difficulit, setDifficulit] = useState([])
    const [objectives, setObjectives] = useState([])
    const [cell, setCell] = useState([])
    const [village, setVillage] = useState([])

    const [sub, setSub] = useState("")
    const [top, setTop] = useState("")
    const [subT, setSubT] = useState('')
    const [uni, setUni] = useState('')


    const handlesubject = (event) => {
        setSub(event.target.value)
    }
    const handletopic = (event) => {
        setTop(event.target.value)
    }
    const handlesubtopic = (event) => {
        setSubT(event.target.value)
    }
    const handleunit = (event) => {
        setUni(event.target.value)
    }

    const onSubmit = values => {

        alert(JSON.stringify(values, null, 2))

        const options = {
            method: 'POST',
            url: '/students',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem("token")}`
            },
            data: values
        };

        https.post(options.url, options.headers, options.data).then(() => {
            return alert("data recorded")
        })
    }
    let iniData = null
    const data = props.recordForEdit

    const initialValue = {
        "subject": null,
        "unit": null,
        "difficultLevel": null,
        "questionsObjective": null,
        "question": null,
        "questionType": null,
        "possibleAnswer": [],
        "answer": []
    }

    if (!props.recordForEdit) {
        iniData = initialValue
    }

    const handleclick = (vals) => {
        if (vals != null) {
            const setDataS = {
                "subject": sub,
                "unit": uni,
                "difficultLevel": vals.difficultLevel,
                "questionsObjective": vals.questionsObjective,
                "question": vals.question,
                "questionType": vals.questionType,
                "possibleAnswer": vals.possibleAnswer.reduce(function (data, condition) {
                    var obje = { "answer": condition }
                    data.push(obje);
                    return data;
                }, [])
                ,
                "answer": tags.reduce(function (data, condition) {
                    var obje = { "answer": condition }
                    data.push(obje);

                    return data;
                }, [])
            }
            https.post('/question-banks/', setDataS, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                if (res.status == 200){
                    setOpen(true)
                    setTimeout(() => {
                        props.setOpenPopup(false)
                    }, 500); 
                }
                else
                    return alert("something went wrong")
            })
        }
    }


    useEffect(() => {
        async function fetchunit() {
            const request = await https.get(`/lessons/units/${subT}/subTopic-units`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setUnit(response.data)
                });
            return request
        }
        fetchunit()
    }, [subT])
    useEffect(() => {
        async function fetchsubtopic() {
            const request = await https.get(`/lessons/subtopics/${top}/topic-subTopics`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setSubtopic(response.data)
                });
            return request
        }
        fetchsubtopic()
    }, [top])
    useEffect(() => {
        async function fetchTopic() {
            const request = await https.get(`/lessons/topics/${sub}/subject-topics`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setTopic(response.data)
                });
            return request
        }
        fetchTopic()
    }, [sub])


    // componentDidMount()
    useEffect(() => {

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
        <>

            <Container component="main" minWidth="xl" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Formik
                        initialValues={iniData}
                        validate={(values) => {
                            const errors = {};
                            if (!values.firstName) {
                                errors.firstName = 'Required';
                            } else if (!values.lastName) {
                                errors.lastName = 'Required';
                            }
                            return errors;
                        }}
                        onSubmit={onSubmit}
                    >
                        {(formik) => (
                            <Form>
                                <Grid container spacing={2}>
                                    {/* names */}
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                label="Subject"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={sub}
                                                onChange={handlesubject}
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {subject != null ?
                                                    subject.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : ""
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                label="Topic"
                                                variant="outlined"
                                                type="text"
                                                value={top}
                                                fullWidth
                                                onChange={handletopic}
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {topic != null ?
                                                    topic.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : ""
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                label="Sub Topic"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={subT}
                                                onChange={handlesubtopic}
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {subtopic != null ?
                                                    subtopic.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : ""
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                label="Unit"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                value={uni}
                                                onChange={handleunit}
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {unit != null ?
                                                    unit.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : ""
                                                }

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                label="Difficulit level"
                                                name="difficultLevel"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                required
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >

                                                <MenuItem value="EASY">Easy</MenuItem>
                                                <MenuItem value="MEDIUM">Medium</MenuItem>
                                                <MenuItem value="DIFFICULT">Difficult</MenuItem>

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                label="Question Objective"
                                                name="questionsObjective"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                required
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >

                                                <MenuItem value="REMEMBERING">REMEMBERING</MenuItem>
                                                <MenuItem value="UNDERSTANDING">UNDERSTANDING</MenuItem>
                                                <MenuItem value="APPLYING">APPLYING</MenuItem>
                                                <MenuItem value="ANALYSING">ANALYSING</MenuItem>
                                                <MenuItem value="CREATING">CREATING</MenuItem>
                                                <MenuItem value="EVALUATING">EVALUATING</MenuItem>

                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                label="Question Type"
                                                name="questionType"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                required
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >

                                                <MenuItem value="MULTI-CHOICE">Multi choice</MenuItem>
                                                <MenuItem value="TRUE/FALSE">True/False</MenuItem>
                                                {/* <MenuItem value="MATCHING">Matching</MenuItem> */}
                                                {/* <MenuItem value="FILL-IN-THE-BANK">Fill in the Blank</MenuItem> */}
                                                <MenuItem value="SHORT-ANSWER">Short Answer</MenuItem>
                                                <MenuItem value="LONG-ANSWER">Long answer</MenuItem>


                                            </Field>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                fullWidth
                                                required
                                                label="Question"
                                                name="question"
                                            />
                                        </Grid>

                                        <Grid item xs={12} sm={12}>
                                            {/* <TagsInput selectedTags={selectedTags}  tags={['Nodejs', 'MongoDB']}/> */}


                                            <div className="tags-input">
                                                <ul id="tags">
                                                    {tags.map((tag, index) => (
                                                        <li key={index} className="tag">
                                                            <span className='tag-title'>{tag}</span>
                                                            <span className='tag-close-icon'
                                                                onClick={() => removeTags(index)}
                                                            >
                                                                x
						</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                                <input
                                                    type="text"
                                                    onKeyUp={event => event.keyCode === 16 ? addTags(event) : null}
                                                    placeholder="Press Shift to add an answer"
                                                />
                                            </div>


                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <FormControl component="fieldset" fullWidth>
                                                <Field
                                                    className="myfield"
                                                    name="possibleAnswer"
                                                    multiple
                                                    fullWidth
                                                    component={Autocomplete}
                                                    options={tags}
                                                    getOptionLabel={(option) => option}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={formik.touched['possibleAnswer'] && !!formik.errors['possibleAnswer Error']}
                                                            helperText={formik.touched['possibleAnswer'] && formik.errors['possibleAnswer Error']}
                                                            label="possibleAnswer"
                                                            variant="outlined"
                                                            fullWidth
                                                        />)} />
                                            </FormControl>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" xs={12}>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            type="button"
                                            onClick={() => handleclick(formik.values)}
                                        >
                                            Save
                            </Button>
                                    </Grid>
                                </Grid>
                                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}
                            </Form>)}
                    </Formik>
                </div>
                <Box mt={5}>
                </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                     Question is saved!
                </Alert>
            </Snackbar>
        </>
    )

}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(QuestionForm)
