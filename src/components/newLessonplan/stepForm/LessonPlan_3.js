import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import Container from "@material-ui/core/Container";
import TextField from "@material-ui/core/TextField";
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
import { Button } from "react-bootstrap";
import { ActivitiesIntro } from "../forms/ActivitiesIntro";
import { ActivitiesDev } from "../forms/ActivitiesDev";
import { ActivitiesConc } from "../forms/ActivitiesConc";
import { useSelector, useDispatch } from "react-redux";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";

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
  const { newLessonPlan } = useSelector((state) => state);
  const dispatchLesson = useDispatch();
  const [key, setKey] = React.useState("activitiesIntro");

  const moveToNext = () => {
    if (key === "activitiesIntro") setKey("activitiesDev");
    else if (key === "activitiesDev") setKey("activitiesConc");
  };

  return (
    <Container maxWidth="xs">
      <div className="slide3-container">
        <h5>Learning Activities</h5>
        <Tabs
          fill={true}
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
        >
          <Tab eventKey="activitiesIntro" title="Introduction" fill={true}>
            <ActivitiesIntro newLessonPlan={newLessonPlan} />
            <Button block onClick={moveToNext}>
              Next
            </Button>
          </Tab>
          <Tab eventKey="activitiesDev" title="Development" fill={true}>
            <ActivitiesDev newLessonPlan={newLessonPlan} />
            <Button block onClick={moveToNext}>
              Next
            </Button>
          </Tab>
          <Tab eventKey="activitiesConc" title="Conclusion" fill={true}>
            <ActivitiesConc newLessonPlan={newLessonPlan} />
          </Tab>
        </Tabs>
      </div>
      <div style={{ marginTop: "1rem" }}>
        {key === "activitiesConc" ? (
          <Button block onClick={() => navigation.next()}>
            Next
          </Button>
        ) : (
          ""
        )}
      </div>
    </Container>
  );
};
