import React, { useState, useEffect } from "react";
import "../NewLessonPlan.css";
import { connect, useDispatch, useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { Accordion, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { MdKeyboardArrowDown } from "react-icons/md";
import Checkbox from "@material-ui/core/Checkbox";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";
import Modal from "react-bootstrap/Modal";

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
  { issue: "GENOCIDE-STUDIES" },
  { issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
  { issue: "GENDER" },
  { issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
  { issue: "PEACE-AND-VALUES-EDUCATION" },
  { issue: "FINANCIAL-EDUCATION" },
  { issue: "STANDARDISATION-CULTURE" },
  { issue: "INCLUSIVE-EDUCATION" },
];
const crossCuttingIssuesArrDeve = [
  { issue: "GENOCIDE-STUDIES" },
  { issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
  { issue: "GENDER" },
  { issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
  { issue: "PEACE-AND-VALUES-EDUCATION" },
  { issue: "FINANCIAL-EDUCATION" },
  { issue: "STANDARDISATION-CULTURE" },
  { issue: "INCLUSIVE-EDUCATION" },
];
const crossCuttingIssuesArrConc = [
  { issue: "GENOCIDE-STUDIES" },
  { issue: "ENVIRONMENT-AND-SUSTAINABILITY" },
  { issue: "GENDER" },
  { issue: "COMPREHENSIVE-SEXUALITY-EDUCATION" },
  { issue: "PEACE-AND-VALUES-EDUCATION" },
  { issue: "FINANCIAL-EDUCATION" },
  { issue: "STANDARDISATION-CULTURE" },
  { issue: "INCLUSIVE-EDUCATION" },
];
const competenceArrInto = [
  { competency: "CRITICAL-THINKING" },
  { competency: "RESEARCH-AND-PROBLEM-SOLVING" },
  { competency: "CREATIVITY-AND-INNOVATION" },
  { competency: "COMMUNICATION" },
  { competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
  { competency: "LIFELONG-LEARNING" },
];
const competenceArrDeve = [
  { competency: "CRITICAL-THINKING" },
  { competency: "RESEARCH-AND-PROBLEM-SOLVING" },
  { competency: "CREATIVITY-AND-INNOVATION" },
  { competency: "COMMUNICATION" },
  { competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
  { competency: "LIFELONG-LEARNING" },
];
const competenceArrConc = [
  { competency: "CRITICAL-THINKING" },
  { competency: "RESEARCH-AND-PROBLEM-SOLVING" },
  { competency: "CREATIVITY-AND-INNOVATION" },
  { competency: "COMMUNICATION" },
  { competency: "COOPERATION-INTERPERSONAL-MANAGEMENT-AND-LIFE-SKILLS" },
  { competency: "LIFELONG-LEARNING" },
];

export const ActivitiesIntro = () => {
  const { newLessonPlan } = useSelector((state) => state);
  const dispatchLesson = useDispatch();
  console.log("new lesson plan in activitiesIntro form", newLessonPlan);
  const [content, setContent] = useState("");
  const [crossCuttingIssues, setCrossCuttingIssues] = useState("");
  const [competency, setCompetency] = useState("");
  const [issueComment, setIssueComment] = useState("");
  const [competencyComment, setCompetencyComment] = useState("");
  const [otherActivity, setOtherActivity] = useState("");
  const thisFormData = {
    introduction: {
      content: {
        activities: [
          {
            activity: null,
          },
        ],
        otherActivity: "",
      },
      crossCuttingIssues: {
        issues: [
          {
            issue: null,
          },
        ],
        omment: null,
      },
      competency: {
        competencies: [
          {
            competency: null,
          },
        ],
        comment: null,
      },
    },
    exercises: {},
  };

  const exercises = {
    questions: [],
  };

  const questionBank = [
    {
      difficultLevel: "MEDIUM",
      questionsObjective: "REMEMBERING",
      question: "What is the answer",
      questionType: "MULTI-CHOICE",
      possibleAnswer: [
        {
          answer: "answer",
        },
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      answers: [
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      points: 10,
    },
    {
      difficultLevel: "MEDIUM",
      questionsObjective: "REMEMBERING",
      question: "What is your name",
      questionType: "MULTI-CHOICE",
      possibleAnswer: [
        {
          answer: "answer",
        },
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      answers: [
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      points: 10,
    },
    {
      difficultLevel: "MEDIUM",
      questionsObjective: "REMEMBERING",
      question: "What is my name",
      questionType: "MULTI-CHOICE",
      possibleAnswer: [
        {
          answer: "answer",
        },
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      answers: [
        {
          answer: "answer2",
        },
        {
          answer: "answer3",
        },
      ],
      points: 10,
    },
  ];
  const [contentData, setContentData] = useState(null);
  const classes = useStyles();
  const [show, setShow] = useState(false);

  const assignStatevalues = (newLessonPlan, formData) => {
    newLessonPlan.activities.introduction = formData.introduction;
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (e) => {
    if (e.target.checked) {
      handleAddChange(e);
    } else {
      handleRemoveChange(e);
    }
  };

  const handleAddChange = (e) => {
    if (e.target.name === "content") {
      setContent(e.target.value);
    } else if (e.target.name == "crossCuttingIssues") {
      setCrossCuttingIssues(e.target.value);
    } else if (e.target.name == "competency") {
      setCompetency(e.target.value);
    }
    // console.log("form about to be completete", thisFormData);
  };

  const handleRemoveChange = (e) => {
    console.log(e.target.checked);
    if (e.target.name === "content") {
      setContent("");
    } else if (e.target.name == "crossCuttingIssues") {
      setCrossCuttingIssues("");
    } else if (e.target.name == "competency") {
      setCompetency("");
    }
    // console.log("form about to be completete", thisFormData);
  };

  const handleClick = (e) => {
    if (e.target.checked) {
      exercises.questions.push({ 1: e.target.value });
    } else {
      if (exercises.questions.includes(e.target.value))
        exercises.questions.pop({ 1: e.target.value });
    }
  };

  useEffect(() => {
    thisFormData.introduction.content.activities.push({
      activity: content,
    });

    thisFormData.introduction.crossCuttingIssues.issues.push({
      issue: crossCuttingIssues,
    });

    thisFormData.introduction.competency.competencies.push({
      competency: competency,
    });

    thisFormData.introduction.crossCuttingIssues.omment = issueComment;
    thisFormData.introduction.competency.comment = competencyComment;
    thisFormData.introduction.content.otherActivity = otherActivity;
    thisFormData.introduction.content.otherActivity = otherActivity;
    thisFormData.exercises = exercises;

    assignStatevalues(newLessonPlan, thisFormData);
    //dispatchLesson(setNewLessonplan(newLessonPlan));

    console.log("data ready for state: ", thisFormData);
  }, [
    content,
    crossCuttingIssues,
    competency,
    issueComment,
    competencyComment,
    otherActivity,
    exercises,
  ]);

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
                  {!contentData
                    ? ""
                    : contentData.map((val) => {
                        return (
                          <FormControlLabel
                            value={val._id}
                            control={
                              <Checkbox
                                onChange={(e) => {
                                  if (e.target.checked) {
                                    handleAddChange(e);
                                  } else {
                                    handleRemoveChange(e);
                                  }
                                }}
                                color="primary"
                                name="content"
                                value
                              />
                            }
                            label={val.activity}
                            labelPlacement="start"
                          />
                        );
                      })}

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
                      onChange={(e) => {
                        setOtherActivity(e.target.value);
                      }}
                    />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
        <div className={classes.root}>
          <Button block onClick={handleShow}>
            Upload Exercises
          </Button>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <Modal.Header closeButton>
            <Modal.Title>Pick Exercises</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>Available exercises</h3>
            {questionBank.map((q) => {
              return (
                <FormControlLabel
                  value={q.question}
                  control={
                    <Checkbox
                      color="primary"
                      name="exercises"
                      onChange={handleClick}
                    />
                  }
                  label={q.question}
                  labelPlacement="end"
                />
              );
            })}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Done
            </Button>
          </Modal.Footer>
        </Modal>

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
                  {crossCuttingIssuesArrInto.map((val) => {
                    return (
                      <FormControlLabel
                        value={val.issue}
                        control={
                          <Checkbox
                            color="primary"
                            name="crossCuttingIssues"
                            onChange={handleChange}
                          />
                        }
                        label={val.issue}
                        labelPlacement="start"
                      />
                    );
                  })}

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
                      onChange={(e) => {
                        setIssueComment(e.target.value);
                      }}
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
                  {competenceArrInto.map((val) => {
                    return (
                      <FormControlLabel
                        value={val.competency}
                        control={
                          <Checkbox
                            onChange={handleChange}
                            color="primary"
                            name="competency"
                          />
                        }
                        label={val.competency}
                        labelPlacement="start"
                      />
                    );
                  })}

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
                      onChange={(e) => {
                        setCompetencyComment(e.target.value);
                      }}
                    />
                  </div>
                </Card.Body>
              </Accordion.Collapse>
            </Card>
          </Accordion>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch) => {
  return{
  setNewLessonplan: (newLessonPlan) => dispatch(setNewLessonplan(newLessonPlan))}
};

export default connect(mapStateToProps, mapDispatchToProps)(ActivitiesIntro);
