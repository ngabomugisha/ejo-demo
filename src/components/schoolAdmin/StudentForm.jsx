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



const permanentHealthConditionsOptions = [
    {condition:'Visual-Difficulities'},
    {condition:'Physical-Impairement'},
    {condition:'Hearing-Difficulities'},
    {condition:'Learning-Difficulities'},
    {condition:'Phsychologic-Difficulties'}]
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
    const [] = React.useState('');
    const classes = useStyles();
    const [, setClss] = useState([])
    const [classs, setClasss] = useState([])
    const [province, setProvince] = useState([])
    const [district, setDistrict] = useState([])
    const [sector, setSector] = useState([])
    const [cell, setCell] = useState([])
    const [village, setVillage] = useState([])
    const [] = useState([])
    const [] = useState([])
    const [] = useState([])
    const [p, setP] = useState("")
    const [d, setD] = useState('')
    const [s, setS] = useState("")
    const [c, setC] = useState('')
    const [, setV] = useState('')
    const [] = useState('')
    const [] = useState('')
    const [] = useState('')

    const [enableDistrict, setEnableDistrict] = useState(true)
    const [enableSector, setEnableSector] = useState(true)
    const [enableCell, setEnableCell] = useState(true)
    const [enableVillage, setEnableVillage] = useState(true)
    const [aller, setAller] = useState([])
    
    const initialValue = {
        firstName: '',
        lastName: '',
        gender: '',
        studentClass: '',
        address: '',
        scholarship: '',
        dateOfBirth: new Date(),
        allergies: `${aller}`,
        permanentHealthConditions: [
        ],
        mother: {
            firstName: "",
            lastName: "",
            identificationNumber: "",
            phone: "",
            email: "",
            maritalStatus: ""
        },
        father: {
            firstName: "",
            lastName: "",
            identificationNumber: "",
            phone: "",
            email: "",
            maritalStatus: ""
        },
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
        const [tags, setTags] = React.useState([]);
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
                    fullWidth

                    onKeyUp={event => event.keyCode === 16 ? addTags(event) : null}
                    placeholder="Press Shift to add Allergy"
                />
            </div>
        );
    };


    // const post = async (url, data, headers) => {
    //     return await request('POST', url, data, headers);
    //   };

    const onSubmit = values => {
        // alert(JSON.stringify(values, null, 2))
        // const rew = https.post('/students',values, { headers: {'Content-Type': 'application/json', 'Authorization': `Basic ${localStorage.token}` } })
        //         .then((response) => {
        //             console.log('data has been saved',response)
        //         });

        const options = {
            method: 'POST',
            url: 'http://localhost:9000/api/students/',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjYwMzM3MjJlZThkZWIxMDAzNjA2NDllZiIsImZpcnN0TmFtZSI6InNjaG9vbCIsImxhc3ROYW1lIjoiYWRtaW4iLCJlbWFpbCI6InNjaG9vbGFkbWluQGdtYWlsLmNvbSIsInJvbGUiOiJTQ0hPT0wtQURNSU4iLCJzY2hvb2wiOm51bGx9LCJpYXQiOjE2MTQ3NTgzMTl9.3qr_ZlVSUysrxQA29F7U8EmgC_IVJaKyS9gLZKudnsI'
            },
            data: values
          };
          
          axios({
              method: 'POST',
              url: options.url,
              data: options.data,
              headers: options.headers
            }).then(()=> console.log("res").catch((err)=> console.log(err))
                
            )


        }
    

    const selectedTagss = tags => {
        console.log(tags);
    };

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
                                                required
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
                                                <MenuItem value="O">other</MenuItem>

                                            </Field>
                                        </Grid>

                                        <Grid item xs={12} sm={4}>
                                            <Field
                                                as={TextField}
                                                type="text"
                                                name="studentClass"
                                                label="student Class"
                                                select
                                                required
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
                                    
                                        <FormControl component="fieldset">
                                            <FormLabel component="legend">Permanent Health Conditions</FormLabel>
                                            <FormGroup aria-label="position" row>
                                                <Grid container direction="row" justify="center" spacing={4} maxWidth="xs">
                                                    <Grid item xs={12} sm={8}>
                                                        <Field
                                                            className="myfield"
                                                            name="permanentHealthConditions"
                                                            multiple
                                                            fullWidth
                                                            component={Autocomplete}
                                                            options={permanentHealthConditionsOptions}
                                                            getOptionLabel={(option) => option.condition}
                                                            style={{ minWidth: 500 }}
                                                            renderInput={(params) => (
                                                                <TextField
                                                                    {...params}
                                                                    error={formik.touched['permanentHealthConditions'] && !!formik.errors['permanentHealthConditions']}
                                                                    helperText={formik.touched['permanentHealthConditions'] && formik.errors['permanentHealthConditions']}
                                                                    label="permanentHealthConditions"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                />)} />
                                                    </Grid>
                                                    <Grid item xs={12} sm={4}>
                                                        <Field
                                                            className="myfield"
                                                            as={TextField}
                                                            label="Scholarship"
                                                            name="scholarship"
                                                            variant="outlined"
                                                            style={{ minWidth: 250}}
                                                            type="text"
                                                            fullWidth
                                                            select
                                                        >
                                                            <MenuItem value="">
                                                                <em>None</em>
                                                            </MenuItem>
                                                            <MenuItem value="Private">Private</MenuItem>
                                                            <MenuItem value="Scholarship">Scholarship</MenuItem>
                                                            <MenuItem value="Other">Other</MenuItem>
                                                        </Field>

                                                    </Grid>
                                                </Grid>
                                <Grid container justify="center" xs={12}>
                                <div className="tags">
                                    <TagsInput selectedTags={selectedTagss} />
                                </div>
                                </Grid>
                                            </FormGroup>
                                        </FormControl>
                                    {/* parents's Details */}
                                    <Grid item xs={12} minWidth="xl">
                                        <Accordion defaultActiveKey="">

                                            {/* Father's Details */}
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="0">
                                                    Father's Details
                                        </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="0">
                                                    <Card.Body>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    name="father.firstName"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="First Name"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Last Name"
                                                                    name="father.lastName"
                                                                    type="text"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    type="text"
                                                                    label="Marital Status"
                                                                    name="father.maritalStatus"
                                                                />
                                                            </Grid>
                                                        </Grid>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    fullWidth
                                                                    label="ID Number"
                                                                    name="father.identificationNumber"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="number"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Phone Number"
                                                                    name="father.phone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="email"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Email"
                                                                    name="father.email"
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>

                                            {/* Mother's Details */}
                                            <Card>
                                                <Accordion.Toggle as={Card.Header} eventKey="1">
                                                    Mother's Details
                                        </Accordion.Toggle>
                                                <Accordion.Collapse eventKey="1">
                                                    <Card.Body> <Grid container direction="row" spacing={2}>
                                                        <Grid item xs={12} sm={4}>
                                                            <Field
                                                                as={TextField}
                                                                name="mother.firstName"
                                                                variant="outlined"
                                                                fullWidth
                                                                label="First Name"
                                                                type="text"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Field
                                                                as={TextField}
                                                                variant="outlined"
                                                                fullWidth
                                                                label="Last Name"
                                                                name="mother.lastName"
                                                                type="text"
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12} sm={4}>
                                                            <Field
                                                                as={TextField}
                                                                variant="outlined"
                                                                fullWidth
                                                                type="text"
                                                                label="Marital Status"
                                                                name="mother.maritalStatus"
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                        <Grid container direction="row" spacing={2}>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    variant="outlined"
                                                                    type="number"
                                                                    fullWidth
                                                                    label="ID Number"
                                                                    name="mother.identificationNumber"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="number"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Phone Number"
                                                                    name="mother.phone"
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <Field
                                                                    as={TextField}
                                                                    type="email"
                                                                    variant="outlined"
                                                                    fullWidth
                                                                    label="Email"
                                                                    name="mother.email"
                                                                />
                                                            </Grid>
                                                        </Grid>

                                                    </Card.Body>
                                                </Accordion.Collapse>
                                            </Card>
                                        </Accordion>
                                    </Grid>
                                </Grid>
                                <Grid container justify="center" xs={12}>
                                    <Grid item xs={4}>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    color="primary"
                                    type="submit"
                                >
                                    Submit
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
        </>
    )

}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(StudentForm)
