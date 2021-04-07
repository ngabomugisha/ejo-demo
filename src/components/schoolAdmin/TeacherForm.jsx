import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
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
import FormGroup from '@material-ui/core/FormGroup';
import FormLabel from '@material-ui/core/FormLabel';
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
export const StudentForm = () => {

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const classes = useStyles();
    const [, setClss] = useState([])
    const [classs, setClasss] = useState([])
    const [open, setOpen] = useState(false)
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [sector, setSector] = useState([])
    const [cell, setCell] = useState([])
    const [village, setVillage] = useState([])
    const [p, setP] = useState("")
    const [d, setD] = useState('')
    const [s, setS] = useState("")
    const [c, setC] = useState('')

    const [enableDistrict, setEnableDistrict] = useState(true)
    const [enableSector, setEnableSector] = useState(true)
    const [enableCell, setEnableCell] = useState(true)
    const [enableVillage, setEnableVillage] = useState(true)

    const initialValue = {
        firstName: '',
        lastName: '',
        address: '',
        email: "",
        school: '',
        role: "TEACHER",
        phoneNumber: "",
        level: "",
        yearsOfExperience: '',
        workingStatus: ""

    }


    const handleProvince = (event) => {
        setP(event.target.value)
        setEnableDistrict(false)
    }
    const handleDistrict = (event) => {
        setD(event.target.value)
        setEnableSector(false)
    }
    const handleSector = (event) => {
        setS(event.target.value)
        setEnableCell(false)
    }
    const handleCell = (event) => {
        setC(event.target.value)
        setEnableVillage(false)
    }




    const TagsInput = props => {
        const [tags, setTags] = React.useState(props.tags);
        const removeTags = indexToRemove => {
            setTags([...tags.filter((_, index) => index !== indexToRemove)]);
        };
        const addTags = event => {
            if (event.target.value !== "") {
                setTags([...tags, event.target.value]);
                props.selectedTags([...tags, event.target.value]);
                event.target.value = "";
            }
        };
        return (
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
                    placeholder="Press Shift to add Allergy"
                />
            </div>
        );
    };

    const selectedTagss = tags => {
        console.log(tags);
    };


    const onSubmit = async values => {
        // alert(JSON.stringify(values, null, 2))
        setOpen(true)
        await https.post('/auth/signup', values, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
            if (res.status == 200)
                return setOpen(true);
            else
                return alert("something went wrong")
        })
    }


    useEffect(() => {
        async function fetchDistrict() {
            const request = await https.get(`/addresses/districts/${p}/province-districts`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setDistrict(response.data)
                });
            return request
        }
        fetchDistrict()
    }, [p])
    useEffect(() => {
        async function fetchSector() {
            const request = await https.get(`/addresses/sectors/${d}/district-sectors`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setSector(response.data)
                });
            return request
        }
        fetchSector()
    }, [d])
    useEffect(() => {
        async function fetchCell() {
            const request = await https.get(`/addresses/cells/${s}/sector-cells`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setCell(response.data)
                });
            return request
        }
        fetchCell()
    }, [s])
    useEffect(() => {
        async function fetchVillage() {
            const request = await https.get(`/addresses/villages/${c}/cell-villages`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setVillage(response.data)
                });
            return request
        }
        fetchVillage()
    }, [c])
    useEffect(() => {
        async function fetchProvinces() {
            const req = await https.get('/addresses/provinces')
                .then((response) => {
                    setProvince(response.data)
                });
            return req
        }
        async function fetchClasses() {
            const req = await https.get('/classes/602c1e8feeb9ae2820b62120/school-classes', { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((res) => {
                    setClasss(res.data)
                }).catch(function (err) {
                    console.log(err);
                });
            return req
        }
        fetchClasses()
        fetchProvinces()
    }, [])
    return (
        <>

            <Container component="main" minWidth="xl" >
                <CssBaseline />
                <div className={classes.paper}>
                    <Formik
                        initialValues={initialValue}
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
                                        <Grid item xs={6} sm={6}>
                                            <Field
                                                as={TextField}
                                                name="firstName"
                                                variant="outlined"
                                                required
                                                fullWidth
                                                id="firstName"
                                                label="First Name"
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                required
                                                fullWidth
                                                label="Last Name"
                                                name="lastName"
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* Dob gender Class */}
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                type='email'
                                                variant="outlined"
                                                fullWidth
                                                name="email"
                                                label="email"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                required
                                                as={TextField}
                                                label="working Status "
                                                name="workingStatus"
                                                variant="outlined"
                                                type="text"
                                                fullWidth
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="Part-Time">Part-Time</MenuItem>
                                                <MenuItem value="Full-Time">Full-Time</MenuItem>

                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                name="yearsOfExperience"
                                                variant="outlined"
                                                fullWidth
                                                label="years Of Experience"
                                                type="number"
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* address */}
                                    <Grid container direction="row" spacing={1} justify="space-between">
                                        <Grid item xs={12} sm={2}>
                                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Province</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={p}
                                                    onChange={handleProvince}
                                                    label="Province"
                                                    fullWidth>

                                                    <MenuItem>
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {province != null ?
                                                        province.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">District</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={d}
                                                    onChange={handleDistrict}
                                                    label="District"
                                                    fullWidth
                                                    disabled={enableDistrict}>
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {district != null ?
                                                        district.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Sector</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={s}
                                                    onChange={handleSector}
                                                    label="Sector"
                                                    fullWidth
                                                    disabled={enableSector}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {sector != null ?
                                                        sector.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <FormControl variant="outlined" fullWidth className={classes.formControl}>
                                                <InputLabel id="demo-simple-select-outlined-label">Cell</InputLabel>
                                                <Select
                                                    labelId="demo-simple-select-outlined-label"
                                                    id="demo-simple-select-outlined"
                                                    value={c}
                                                    onChange={handleCell}
                                                    label="Cell"
                                                    fullWidth
                                                    disabled={enableCell}
                                                >
                                                    <MenuItem value="">
                                                        <em>None</em>
                                                    </MenuItem>
                                                    {cell != null ?
                                                        cell.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                    }
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Field
                                                required
                                                as={TextField}
                                                type='text'
                                                name="address"
                                                label="Village"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                disabled={enableVillage}
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {village != null ?
                                                    village.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                }
                                            </Field>
                                        </Grid>

                                    </Grid>
                                    {/* health condition and SCHOLASHIP */}
                                    <Grid item xs={12} sm={12}>
                                        <Field
                                            required
                                            as={TextField}
                                            label="level of studies"
                                            name="level"
                                            variant="outlined"
                                            type="text"
                                            fullWidth
                                            select
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        >

                                            <MenuItem value="">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value="DIPLOMA">DIPLOMA(A0)</MenuItem>
                                            <MenuItem value="BACHELOR">BACHELOR</MenuItem>
                                            <MenuItem value="MASTERS">MASTERS</MenuItem>
                                        </Field>
                                    </Grid>

                                </Grid>
{/* 
                                <div className="tags">
                                    <TagsInput selectedTags={selectedTagss} tags={['Nodejs', 'MongoDB']} />
                                </div> */}
                                <Button
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
                            </Button>
                                {/* <pre>{JSON.stringify(formik.values, null, 2)}</pre> */}

                            </Form>)}
                    </Formik>
                </div>
                <Box mt={5}>
                </Box>
            </Container>
            <Snackbar open={open} autoHideDuration={4000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success">
                    Student data is saved!
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

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
