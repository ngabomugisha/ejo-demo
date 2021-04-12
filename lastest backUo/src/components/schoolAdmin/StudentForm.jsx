import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.css'
import axios from 'axios'
import https from '../../helpers/https'
import CssBaseline from '@material-ui/core/CssBaseline';
import { FormGroup, TextField } from '@material-ui/core'
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Formik, Field, Form } from 'formik'
import * as Yup from 'yup'
import { Autocomplete } from 'formik-material-ui-lab'
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import { handleAddStudent } from '../../store/actions/student.actions'

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
export const StudentForm = (props) => {


    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const permanentHealthConditionsOptionss = [
        { 'condition': 'VISUAL-DIFFICULTIES' },
        { 'condition': 'PHYSICAL-IMPAIREMENT' },
        { 'condition': 'HEARING-DIFFICULTIES' },
        { 'condition': 'LEARNING-DIFFICULTIES' },
        { 'condition': 'PHSYCHOLOGICAL-DIFFICULTIES' }]
    const school = props.state.auth.user.school;
    const [] = React.useState('');
    const classes = useStyles();
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
    const [v, setV] = useState('')


    const [enableDistrict, setEnableDistrict] = useState(true)
    const [enableSector, setEnableSector] = useState(true)
    const [enableCell, setEnableCell] = useState(true)
    const [enableVillage, setEnableVillage] = useState(true)
    const [aller, setAller] = useState([])

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

    const onSubmit = async (values) => {

        //  alert(JSON.stringify(values, null, 2))

        // await https.post('/students', values, { headers: { 'Authorization': `Basic ${localStorage.token}` } }).then((res) => {
        //     if (res.status == 200)
        //         return setOpen(true);
        //     else
        //         return alert("something went wrong")
        // })
        console.log("VALUES::::::::::::", values)
        props.handleAddStudent(values)
        setOpen(true)
        props.close()
        // const options = {
        //     method: 'POST',
        //     url: '/students',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${localStorage.getItem("token")}`
        //     },
        //     data: values
        // };

        // https.post(options.url,options.headers,options.data).then(() => {
        //     return alert("data recorded")
        // })

    }
    let iniData = null
    const data = props.recordForEdit
    console.log('DATAFOREDIT:', data)

    if (data !== null && data.address !== undefined) {
        async function fetchV() {
            const request = await https.get(`/addresses/villages/${data.address}`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setVillage(response.data)
                });
            return request
        }
        fetchV()
        console.log('AFTER REQUEST', village)
    }

    const initialValue = {
        firstName: null,
        lastName: null,
        gender: null,
        studentClass: null,
        address: null,
        scholarship: null,
        studentProgram: null,
        dateOfBirth: null,
        ngo: {
            name: null,
            contactPerson: {
                title: null,
                name: null,
                phone: null
            }
        },
        allergies: null,
        permanentHealthConditions: [],
        guardians: [{
            firstName: null,
            lastName: null,
            identificationNumber: null,
            phone: null,
            email: null,
            maritalStatus: null,
            relationship: null
        },
        {
            firstName: null,
            lastName: null,
            identificationNumber: null,
            phone: null,
            email: null,
            maritalStatus: null,
            relationship: null
        }]
    }

    if (!props.recordForEdit) {
        iniData = initialValue
    } else {

        const initialValuesforEdit = {
            firstName: data.firstName,
            lastName: data.lastName,
            gender: data.gender ? data.gender : "",
            studentClass: data.studentClass ? data.studentClass : '',
            studentProgram: data.studentProgram ? data.studentProgram : '',
            address: data.address ? data.address : '',
            scholarship: data.scholarship ? data.scholarship : '',
            dateOfBirth: data.dateOfBirth ? (data.dateOfBirth).substring(0, 10) : '',
            allergies: data.allergies ? data.allergies : '',
            permanentHealthConditions: data.permanentHealthConditions ? data.permanentHealthConditions : '',
            guardians: [{
                firstName: !data.guardians ? '' : data.guardians[0].firstName ? data.guardians[0].firstName : '',
                lastName: !data.guardians ? '' : data.guardians[0].lastName ? data.guardians[0].lastName : '',
                identificationNumber: !data.guardians ? '' : data.guardians[0].identificationNumber ? data.guardians[0].identificationNumber : '',
                phone: !data.guardians ? '' : data.guardians[0].phone ? data.guardians[0].phone : '',
                email: !data.guardians ? '' : data.guardians[0].email ? data.guardians[0].email : '',
                maritalStatus: !data.guardians ? '' : data.guardians[0].maritalStatus ? data.guardians[0].maritalStatus : ''
            },
            {
                firstName: !data.guardians ? '' : data.guardians[1].firstName ? data.guardians[1].firstName : '',
                lastName: !data.guardians ? '' : data.guardians[1].lastName ? data.guardians[1].lastName : '',
                identificationNumber: !data.guardians ? '' : data.guardians[1].identificationNumber ? data.guardians[1].identificationNumber : '',
                phone: !data.guardians ? '' : data.guardians[1].phone ? data.guardians[1].phone : '',
                email: !data.guardians ? '' : data.guardians[1].email ? data.guardians[1].email : '',
                maritalStatus: !data.guardians ? '' : data.guardians[1].maritalStatus ? data.guardians[1].maritalStatus : ''
            }]
        }

        iniData = initialValuesforEdit
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


    // componentDidMount()
    useEffect(() => {

        async function fetchVillage() {
            const request = await https.get(`/addresses/villages`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setVillage(response.data)
                });
            return request
        }
        fetchVillage()

        async function fetchCell() {
            const request = await https.get(`/addresses/cells`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setCell(response.data)
                });
            return request
        }
        fetchCell()

        async function fetchSector() {
            const request = await https.get(`/addresses/sectors`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setSector(response.data)
                });
            return request
        }
        fetchSector()

        async function fetchDistrict() {
            const request = await https.get(`/addresses/districts`, { headers: { 'Authorization': `Basic ${localStorage.token}` } }
            )
                .then((response) => {
                    setDistrict(response.data)
                });
            return request
        }
        fetchDistrict()

        async function fetchProvinces() {
            const req = await https.get('/addresses/provinces', { headers: { 'Authorization': `Basic ${localStorage.token}` } })
                .then((response) => {
                    setProvince(response.data)
                });
            return req
        }
        async function fetchClasses() {
            const req = await https.get(`/classes/${school}/school-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
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
                        initialValues={iniData}
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
                                                label="First Name"
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                fullWidth
                                                required
                                                label="Last Name"
                                                name="lastName"
                                            />
                                        </Grid>
                                        <Grid item xs={6} sm={6}>
                                            <Field
                                                as={TextField}
                                                variant="outlined"
                                                fullWidth
                                                required
                                                label="Registration Number"
                                                name="registrationNumber"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Field
                                                as={TextField}
                                                label="student Program"
                                                name="studentProgram"
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
                                                <MenuItem value="BOARDING">BOARDING</MenuItem>
                                                <MenuItem value="DAY">DAY</MenuItem>

                                            </Field>
                                        </Grid>
                                    </Grid>

                                    {/* Dob gender Class */}
                                    <Grid container direction="row" spacing={2}>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                type='date'
                                                variant="outlined"
                                                fullWidth
                                                name="dateOfBirth"
                                                label="Date of birth"
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                label="Gender"
                                                name="gender"
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
                                                <MenuItem value="F">Female</MenuItem>
                                                <MenuItem value="M">Male</MenuItem>

                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                type="text"
                                                name="studentClass"
                                                label="student Class"
                                                select
                                                helperText="Please select studentClass"
                                                variant="outlined"
                                                fullWidth
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>NONE</em>
                                                </MenuItem>
                                                {classs != null ?
                                                    classs.map(item => (<MenuItem key={item._id} value={item._id}>{item.level.name}</MenuItem>)) : null
                                                }
                                            </Field>
                                        </Grid>
                                    </Grid>
                                    {/* address */}
                                    <Grid container direction="row" spacing={1} justify="space-between" className="grouped">
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
                                                >
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
                                                as={TextField}
                                                type='text'
                                                name="address"
                                                label="Village"
                                                fullWidth
                                                variant="outlined"
                                                select
                                                InputLabelProps={{
                                                    shrink: true,
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>

                                                {
                                                    village == null ? null : village.length > 0 ?
                                                        village.map(item => (<MenuItem key={item._id} value={item._id}>{item.name}</MenuItem>)) : null
                                                }
                                            </Field>
                                        </Grid>
                                    </Grid>
                                    {/* health condition and SCHOLASHIP */}

                                    <Grid container direction="row" justify="center" spacing={4} maxWidth="xs">
                                        <Grid item xs={12} sm={8}>
                                            <FormControl component="fieldset" fullWidth>
                                                <Field
                                                    className="myfield"
                                                    name="permanentHealthConditions"
                                                    multiple
                                                    fullWidth
                                                    component={Autocomplete}
                                                    options={permanentHealthConditionsOptionss}
                                                    getOptionLabel={(option) => option.condition}
                                                    renderInput={(params) => (
                                                        <TextField
                                                            {...params}
                                                            error={formik.touched['permanent Health Conditions'] && !!formik.errors['permanent Health Conditions Error']}
                                                            helperText={formik.touched['permanent Health Conditions'] && formik.errors['permanent Health Conditions Error']}
                                                            label="permanent Health Conditions"
                                                            variant="outlined"
                                                            fullWidth
                                                        />)} />
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                className="myfield"
                                                as={TextField}
                                                label="Scholarship"
                                                name="scholarship"
                                                variant="outlined"
                                                style={{ minWidth: 250 }}
                                                type="text"
                                                fullWidth
                                                select
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value="PRIVATE">Private</MenuItem>
                                                <MenuItem value="SCHOOL">Scholarship</MenuItem>
                                                <MenuItem value="GOVERMENT">Goverment</MenuItem>
                                            </Field>

                                        </Grid>
                                    </Grid>


                                    <Grid container justify="center" xs={12} minWidth="xs" width="xs">
                                        <Grid item xs={12} sm={12}>
                                            <Field
                                                as={TextField}
                                                name="allergies"
                                                variant="outlined"
                                                fullWidth
                                                label="allergies"
                                            />
                                        </Grid>
                                    </Grid>
                                    {/* NGO details */}
                                    <Grid container direction="row" spacing={1} justify="space-between" className="grouped">
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                as={TextField}
                                                name="ngo.name"
                                                variant="outlined"
                                                fullWidth
                                                label="NGO (Non-government organization)"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Field
                                                as={TextField}
                                                name="ngo.contactPerson.title"
                                                variant="outlined"
                                                fullWidth
                                                label="Title"
                                                helperText="Contact Person"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <Field
                                                as={TextField}
                                                name="ngo.contactPerson.name"
                                                variant="outlined"
                                                fullWidth
                                                label="Name"
                                                helperText="Contact Person"
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <Field
                                                as={TextField}
                                                name="ngo.contactPerson.phone"
                                                variant="outlined"
                                                fullWidth
                                                label="Phone"
                                                helperText="Contact Person"
                                            />
                                        </Grid>
                                    </Grid>

                                    {/* parents's Details */}
                                    <Grid item xs={12} minWidth="xl">
                                        <Accordion defaultActiveKey="">

                                            {/* guardians's Details */}
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    guardians's Details
                                        </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    name="guardians[0].firstName"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="First Name"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Last Name"
                                                                    name="guardians[0].lastName"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>

                                                                <Field
                                                                    className="myfield"
                                                                    as={TextField}
                                                                    label="marital Status"
                                                                    name="guardians[0].maritalStatus"
                                                                    variant="outlined"
                                                                    style={{ minWidth: 250 }}
                                                                    type="text"
                                                                    fullWidth
                                                                    select
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    <MenuItem value="SINGLE">Single</MenuItem>
                                                                    <MenuItem value="MARIED">Maried</MenuItem>
                                                                    <MenuItem value="DIVORCED">Divorced</MenuItem>
                                                                </Field>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    fullWidth
                                                                    label="ID Number"
                                                                    name="guardians[0].identificationNumber"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="number"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Phone Number"
                                                                    name="guardians[0].phone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="email"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Email"
                                                                    name="guardians[0].email"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Relationship"
                                                                    name="guardians[0].relationship"
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
                                                                    <MenuItem value="FATHER">FATHER</MenuItem>
                                                                    <MenuItem value="MOTHER">MOTHER</MenuItem>
                                                                    <MenuItem value="GUARDIAN">GUARDIAN</MenuItem>
                                                                </Field>
                                                            </Grid>
                                                        </Grid>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>



                                            {/* guardians's Details */}
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    guardians's Details
                                        </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    name="guardians[1].firstName"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="First Name"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Last Name"
                                                                    name="guardians[1].lastName"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>

                                                                <Field
                                                                    className="myfield"
                                                                    as={TextField}
                                                                    label="marital Status"
                                                                    name="guardians[1].maritalStatus"
                                                                    variant="outlined"
                                                                    style={{ minWidth: 250 }}
                                                                    type="text"
                                                                    fullWidth
                                                                    select
                                                                >
                                                                    <MenuItem value="">
                                                                        <em>None</em>
                                                                    </MenuItem>
                                                                    <MenuItem value="SINGLE">Single</MenuItem>
                                                                    <MenuItem value="MARIED">Maried</MenuItem>
                                                                    <MenuItem value="DIVORCED">Divorced</MenuItem>
                                                                </Field>
                                                            </Grid>
                                                            <Grid item xs={12} sm={6}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    fullWidth
                                                                    label="ID Number"
                                                                    name="guardians[1].identificationNumber"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="number"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Phone Number"
                                                                    name="guardians[1].phone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="email"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Email"
                                                                    name="guardians[1].email"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Relationship"
                                                                    name="guardians[1].relationship"
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
                                                                    <MenuItem value="FATHER">FATHER</MenuItem>
                                                                    <MenuItem value="MOTHER">MOTHER</MenuItem>
                                                                    <MenuItem value="GUARDIAN">GUARDIAN</MenuItem>
                                                                </Field>
                                                            </Grid>
                                                        </Grid>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <div style={{ display: "flex" }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        onClick={() => props.close()}
                                    >
                                        Cancel
                            </Button>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        color="primary"
                                        type="submit"
                                    >
                                        Save
                            </Button>
                                </div>
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

const mapDispatchToProps = dispatch => ({
    handleAddStudent: async (data) => {
        await dispatch(handleAddStudent(data))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
