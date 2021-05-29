import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
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
import { ActivitiesIntro } from '../forms/ActivitiesIntro'
import { ActivitiesDev } from '../forms/ActivitiesDev'
import { ActivitiesConc } from '../forms/ActivitiesConc'


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


export const LessonPlan_3 = ({ formData, setForm, navigation }) => {
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
    <Container maxWidth="xs">
      <div className="slide3-container">
        <Tabs
          fill={true}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="home" title="Introduction" fill={true}>
            <ActivitiesIntro formData={formData} />
          </Tab>
          <Tab eventKey="profile" title="Development" fill={true}>
          <ActivitiesDev formData={formData} />
          </Tab>
          <Tab eventKey="contact" title="Conclusion" fill={true}>
            <ActivitiesDev formData={formData} />
          </Tab>
        </Tabs>
      </div>

      <Button
        block
        onClick={() => navigation.next()}
      >
        Next
      </Button>
      {/* </div> */}
    </Container>
  );
};
