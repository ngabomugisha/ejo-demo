import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import { connect } from 'react-redux'
import https from '../../../helpers/https'
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from 'react-bootstrap'



const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexWrap: "wrap",
        "& > *": {
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
        width: "25ch",
    },
    input: {
        display: "none",
    },
}));


const crossCuttingIssuesArrInto = [
    { issue: 'GENOCIDE-STUDIES' },
    { issue: 'ENVIRONMENT-AND-SUSTAINABILITY' },
    { issue: 'GENDER' },
    { issue: 'COMPREHENSIVE-SEXUALITY-EDUCATION' },
    { issue: 'PEACE-AND-VALUES-EDUCATION' },
    { issue: 'FINANCIAL-EDUCATION' },
    { issue: 'STANDARDISATION-CULTURE' },
    { issue: 'INCLUSIVE-EDUCATION' }
]
const crossCuttingIssuesArrDeve = [
    { issue: 'GENOCIDE-STUDIES' },
    { issue: 'ENVIRONMENT-AND-SUSTAINABILITY' },
    { issue: 'GENDER' },
    { issue: 'COMPREHENSIVE-SEXUALITY-EDUCATION' },
    { issue: 'PEACE-AND-VALUES-EDUCATION' },
    { issue: 'FINANCIAL-EDUCATION' },
    { issue: 'STANDARDISATION-CULTURE' },
    { issue: 'INCLUSIVE-EDUCATION' }
]
const crossCuttingIssuesArrConc = [
    { issue: 'GENOCIDE-STUDIES' },
    { issue: 'ENVIRONMENT-AND-SUSTAINABILITY' },
    { issue: 'GENDER' },
    { issue: 'COMPREHENSIVE-SEXUALITY-EDUCATION' },
    { issue: 'PEACE-AND-VALUES-EDUCATION' },
    { issue: 'FINANCIAL-EDUCATION' },
    { issue: 'STANDARDISATION-CULTURE' },
    { issue: 'INCLUSIVE-EDUCATION' }
]
const competenceArrInto = [
    { competency: 'CRITICAL-THINKING' },
    { competency: 'RESEARCH-AND-PROBLEM-SOLVING' },
    { competency: 'CREATIVITY-AND-INNOVATION' },
    { competency: 'COMMUNICATION' },
    { competency: 'COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS' },
    { competency: 'LIFELONG-LEARNING' },
]
const competenceArrDeve = [
    { competency: 'CRITICAL-THINKING' },
    { competency: 'RESEARCH-AND-PROBLEM-SOLVING' },
    { competency: 'CREATIVITY-AND-INNOVATION' },
    { competency: 'COMMUNICATION' },
    { competency: 'COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS' },
    { competency: 'LIFELONG-LEARNING' },
]
const competenceArrConc = [
    { competency: 'CRITICAL-THINKING' },
    { competency: 'RESEARCH-AND-PROBLEM-SOLVING' },
    { competency: 'CREATIVITY-AND-INNOVATION' },
    { competency: 'COMMUNICATION' },
    { competency: 'COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS' },
    { competency: 'LIFELONG-LEARNING' },
]


export const ActivitiesDev = (props) => {
    const { formData } = props
    const [contentData, setContentData] = useState(null)
    const [contentDevelopmentData, setContentDevelopmentData] = useState(null)
    const [key, setKey] = React.useState("home");
    const [term, setTerm] = React.useState("");
    const classes = useStyles();
    const [values, setValues] = React.useState({
        amount: "",
        password: "",
        weight: "",
        weightRange: "",
        showPassword: false,
    });
    const [checked, setChecked] = React.useState(true);

    const handleCheck = (event) => {
        setChecked(event.target.checked);
    };

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const { phone, email } = formData;
    console.log("FORM DATA, ", formData);

    useEffect(() => {
        async function fetchUnit() {
            if (formData.unit) {
                const req = await https
                    .get(`/lessons/units/${formData.unit}`, {
                        headers: { Authorization: `Basic ${localStorage.token}` },
                    })
                    .then((res) => {
                        setContentData(res.data.activities);
                        setContentDevelopmentData(res.data.activities)
                        console.log("UNITS : ", res.data);
                    })
                    .catch(function (err) {
                        console.log(err);
                    });
                return req;
            }
        }
        fetchUnit();
    }, []);







    return (
        <>
            <div className="knowledge-container">
                <h5>Introduction</h5>

                <div className="topic">

                    <Accordion defaultActiveKey="">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <div className="accordion-title">
                                    <h3>Content</h3>
                                    <h3>
                                        <MdKeyboardArrowDown />
                                    </h3>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {!contentData ? "" : contentData.map((val) => {
                                        return (
                                            <FormControlLabel
                                                value={val._id}
                                                control={<Checkbox color="primary" />}
                                                label={val.activity}
                                                labelPlacement="start"
                                            />
                                        )
                                    })

                                    }

                                    <div className="msg-field">
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Other Activities"
                                            row={2}
                                            type="text"
                                            fullWidth
                                            color="primary"
                                            multiline={true}
                                            rowsMax="8"
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
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
                        <h7>Upload Exercises</h7>
                    </label>
                </div>

                <div className="topic">
                    <Accordion defaultActiveKey="">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <div className="accordion-title">
                                    <h3>Cross Cutting Issues</h3>
                                    <h3>
                                        <MdKeyboardArrowDown />
                                    </h3>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>
                                    {
                                        crossCuttingIssuesArrInto.map((val) => {
                                            return (
                                                <FormControlLabel
                                                    value={val.issue}
                                                    control={<Checkbox color="primary" />}
                                                    label={val.issue}
                                                    labelPlacement="start"
                                                />
                                            )
                                        })

                                    }

                                    <div className="msg-field">
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Comment"
                                            row={2}
                                            type="text"
                                            fullWidth
                                            color="primary"
                                            multiline={true}
                                            rowsMax="8"
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>

                <div className="topic">
                    <Accordion defaultActiveKey="">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0">
                                <div className="accordion-title">
                                    <h3>Competency</h3>
                                    <h3>
                                        <MdKeyboardArrowDown />
                                    </h3>
                                </div>
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Body>

                                    {
                                        competenceArrInto.map((val) => {
                                            return (
                                                <FormControlLabel
                                                    value={val.competency}
                                                    control={<Checkbox color="primary" />}
                                                    label={val.competency}
                                                    labelPlacement="start"
                                                />
                                            )
                                        })

                                    }

                                    <div className="msg-field">
                                        <TextField
                                            id="outlined-basic"
                                            variant="outlined"
                                            label="Comment"
                                            row={2}
                                            type="text"
                                            fullWidth
                                            color="primary"
                                            multiline={true}
                                            rowsMax="8"
                                        />
                                    </div>
                                </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                    </Accordion>
                </div>
            </div>

        </>
    )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesDev)
