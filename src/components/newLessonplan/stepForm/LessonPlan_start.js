import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import https from "../../../helpers/https";
import {
  Container,
  TextField,
  Dialog,
  Grid,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
} from "@material-ui/core";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import TimeTable from "../../../pages/SCHOOL-ADMIN/timeTable/TimeTable";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { setNewLessonplan } from "../../../store/actions/newLessonPlan.actions";

export const LessonPlan_start = (props) => {
  const { auth, newLessonPlan } = useSelector((state) => state);
  const dispatchLesson = useDispatch();
  console.log("new lesson plan", newLessonPlan);
  let school = null;
  let role = null;
  let teacherId;

  if (auth != undefined) {
    if (auth.user != undefined) {
      teacherId = auth.user._id;
    }
  }
  if (auth != undefined) {
    if (auth.user != undefined) {
      school = auth.user.school;
      role = auth.user.role;
      teacherId = auth.user._id;
    }
  }

  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [slot, setSlot] = useState(null);
  const [lessonNum, setLessonNum] = useState(null);

  const [unique, setUnique] = React.useState(null);
  const [teacher, setTeacher] = React.useState([]);
  const [subj, setSubj] = React.useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopic, setSubtopic] = useState([]);
  const [units, setUnits] = useState([]);

  const [clas, setClas] = React.useState(null);
  const [sub, setSub] = useState("");
  const [top, setTop] = useState("");
  const [subT, setSubT] = useState("");
  const [uni, setUni] = useState("");

  const [classs, setClasss] = React.useState([]);
  const [sublist, setSublist] = useState(null);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [keyUnitComp, setKeyUnitComp] = useState(null);

  const descriptionElementRef = React.useRef(null);

  let timetabledata = {
    events: {
      monday: mon,
      tuesday: tue,
      wednesday: wed,
      thursday: thu,
      friday: fri,
    },
  };

  const assignStatevalues = (newLessonPlan, formData) => {
    newLessonPlan.unit = formData.unit;
    newLessonPlan.unitPlanId = formData.unitPlanId;
    newLessonPlan.lessonNumber = formData.lessonNumber;
    newLessonPlan.keyUnitCompetency = formData.keyUnitCompetency;
    newLessonPlan.lessonName = formData.lessonName;
    newLessonPlan.time = formData.time;
    newLessonPlan.subject = formData.subject;
  };

  const {
    unit,
    unitPlanId,
    lessonNumber,
    keyUnitCompetency,
    lessonName,
    time,
    subject,
  } = props.formData;

  //My functions
  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handlesubject = (event) => {
    setSub(event.target.value);
    props.formData.subject = event.target.value;
  };

  const handletopic = (event) => {
    setTop(event.target.value);
  };

  const handlesubtopic = (event) => {
    setSubT(event.target.value);
  };

  const handleunit = (event) => {
    setUni(event.target.value);
    props.formData.unit = event.target.value;
    // props.formData.keyUnitCompetency = event.target.value
    setKeyUnitComp(
      units.reduce(function (fit, condition) {
        if (condition._id == uni) {
          let keyUnit = condition.keyCompetency;
          fit = keyUnit;
        }
        return fit;
      }, "")
    );
    {
      if (keyUnitComp) {
        props.formData.keyUnitCompetency = keyUnitComp;
      }
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "class") {
      setClas(e.target.value);
      setSublist(classs.filter((el) => el.class._id === e.target.value));
    }
    if (e.target.name == "lessonNum") setLessonNum(e.target.value);
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    time.day = date;
    handleClickOpen();
  };

  const fetchClasses = async () => {
    const req = await https
      .get(`/class-teachers/${teacherId}/teacher-classes`, {
        headers: { Authorization: `Basic ${localStorage.token}` },
      })
      .then((res) => {
        setClasss(res.data);
      })
      .catch(function (err) {
        console.log(err, "***********ERRRORR***********");
      });
    return req;
  };

  const putMon = (dt) => {
    //this is for monday events
    let sub = null;
    setMon(
      dt.reduce(function (fit, opt) {
        if (opt.time.dayOfWeek == 1) {
          var sm = {
            id: 1,
            _id: opt._id,
            name:
              "Subject : \n" +
              "" +
              subj.reduce(function (done, cond) {
                if (cond._id === opt.subj) {
                  var yes = cond.name;
                  done = yes;
                }
                return done;
              }, []) +
              "& Teacher :" +
              teacher.reduce(function (done2, cond2) {
                if (cond2._id === opt.teacher) {
                  var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                  done2 = yes2;
                }
                return done2;
              }, []),
            type: "custom",
            startTime: moment(
              "2018-02-23T" +
                opt.time.starts.substring(0, 2) +
                ":" +
                opt.time.starts.substring(2, 4) +
                ":00"
            ),
            endTime: moment(
              "2018-02-23T" +
                opt.time.ends.substring(0, 2) +
                ":" +
                opt.time.ends.substring(2, 4) +
                ":00"
            ),
          };
          fit.push(sm);
        }
        return fit;
      }, [])
    );

    //this is for tuesday events
    setTue(
      dt.reduce(function (fit, opt) {
        if (opt.time.dayOfWeek == 2) {
          var sm = {
            id: 2,
            _id: opt._id,
            name:
              subj.reduce(function (done, cond) {
                if (cond._id === opt.subj) {
                  var yes = cond.name;
                  done = yes;
                }
                return done;
              }, "") +
              "& Teacher :" +
              teacher.reduce(function (done2, cond2) {
                if (cond2._id === opt.teacher) {
                  var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                  done2 = yes2;
                }
                return done2;
              }, ""),
            type: "custom",
            startTime: moment(
              "2018-02-23T" +
                opt.time.starts.substring(0, 2) +
                ":" +
                opt.time.starts.substring(2, 4) +
                ":00"
            ),
            endTime: moment(
              "2018-02-23T" +
                opt.time.ends.substring(0, 2) +
                ":" +
                opt.time.ends.substring(2, 4) +
                ":00"
            ),
          };
          fit.push(sm);
        }
        // console.log("RETURNED OBJECT:", fit);
        {
          unique &&
            unique.map((item) => (
              <MenuItem key={item.class._id} value={item.class._id}>
                {!item.class.level ? "" : item.class.level.name}&nbsp;
                {!item
                  ? ""
                  : !item.class
                  ? ""
                  : !item.class.combination
                  ? ""
                  : !item.class.combination
                  ? ""
                  : item.class.combination.name}
                &nbsp;
                {!item
                  ? ""
                  : !item.class
                  ? ""
                  : item.class.label
                  ? item.class.label
                  : ""}
              </MenuItem>
            ));
        }
        return fit;
      }, [])
    );

    //this for wensday
    setWed(
      dt.reduce(function (fit, opt) {
        if (opt.time.dayOfWeek == 3) {
          var sm = {
            id: 3,
            _id: opt._id,
            name:
              subj.reduce(function (done, cond) {
                if (cond._id === opt.subj) {
                  var yes = cond.name;
                  done = yes;
                }
                return done;
              }, []) +
              "& Teacher :" +
              teacher.reduce(function (done2, cond2) {
                if (cond2._id === opt.teacher) {
                  var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                  done2 = yes2;
                }
                return done2;
              }, []),
            type: "custom",
            startTime: moment(
              "2018-02-23T" +
                opt.time.starts.substring(0, 2) +
                ":" +
                opt.time.starts.substring(2, 4) +
                ":00"
            ),
            endTime: moment(
              "2018-02-23T" +
                opt.time.ends.substring(0, 2) +
                ":" +
                opt.time.ends.substring(2, 4) +
                ":00"
            ),
          };
          fit.push(sm);
        }
        // console.log("RETURNED OBJECT:", fit);
        return fit;
      }, [])
    );

    //this is for thursday
    setThu(
      dt.reduce(function (fit, opt) {
        if (opt.time.dayOfWeek == 4) {
          var sm = {
            id: 4,
            _id: opt._id,
            name:
              subj.reduce(function (done, cond) {
                if (cond._id === opt.subj) {
                  var yes = cond.name;
                  done = yes;
                }
                return done;
              }, []) +
              "& Teacher :" +
              teacher.reduce(function (done2, cond2) {
                if (cond2._id === opt.teacher) {
                  var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                  done2 = yes2;
                }
                return done2;
              }, []),
            type: "custom",
            startTime: moment(
              "2018-02-23T" +
                opt.time.starts.substring(0, 2) +
                ":" +
                opt.time.starts.substring(2, 4) +
                ":00"
            ),
            endTime: moment(
              "2018-02-23T" +
                opt.time.ends.substring(0, 2) +
                ":" +
                opt.time.ends.substring(2, 4) +
                ":00"
            ),
          };
          fit.push(sm);
        }
        // console.log("RETURNED OBJECT:", fit);
        return fit;
      }, [])
    );

    //this is for friday
    setFri(
      dt.reduce(function (fit, opt) {
        if (opt.time.dayOfWeek == 5) {
          var sm = {
            id: 5,
            _id: opt._id,
            name:
              subj.reduce(function (done, cond) {
                if (cond._id === opt.subj) {
                  var yes = cond.name;
                  done = yes;
                }
                return done;
              }, []) +
              "& Teacher :" +
              teacher.reduce(function (done2, cond2) {
                if (cond2._id === opt.teacher) {
                  var yes2 = cond2.firstName + " " + "" + cond2.lastName;
                  done2 = yes2;
                }
                return done2;
              }, []),
            type: "custom",
            startTime: moment(
              "2018-02-23T" +
                opt.time.starts.substring(0, 2) +
                ":" +
                opt.time.starts.substring(2, 4) +
                ":00"
            ),
            endTime: moment(
              "2018-02-23T" +
                opt.time.ends.substring(0, 2) +
                ":" +
                opt.time.ends.substring(2, 4) +
                ":00"
            ),
          };
          fit.push(sm);
        }
        // console.log("RETURNED OBJECT:", fit);
        return fit;
      }, [])
    );

    if (mon.length > 0) {
      timetabledata = {
        events: {
          ...timetabledata.events,
          monday: mon,
        },
      };
    }

    if (tue.length > 0) {
      timetabledata = {
        events: {
          ...timetabledata.events,
          tuesday: tue,
        },
      };
    }

    if (wed.length > 0) {
      timetabledata = {
        events: {
          ...timetabledata.events,
          wednesday: wed,
        },
      };
    }

    if (fri.length > 0) {
      timetabledata = {
        events: {
          ...timetabledata.events,
          friday: fri,
        },
      };
    }
  };

  async function fetchSubjects() {
    const req = await https
      .get(`/lessons/subjects`, {
        headers: { Authorization: `Basic ${localStorage.token}` },
      })
      .then((res) => {
        setSubj(res.data);
        console.log("SUBJECTS : ", res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    return req;
  }

  function fetchSlots() {
    const req = https
      .get(`/timetables/${teacherId}/teacher`, {
        headers: { Authorization: `Basic ${localStorage.token}` },
      })
      .then((res) => {
        // console.log("RETURNED DATA:", res.data);
        putMon(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    return req;
  }
  //END of functions

  //UseEffects
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  useEffect(() => {
    units &&
      setKeyUnitComp(
        units.reduce(function (fit, condition) {
          if (condition._id == uni) {
            let keyUnit = condition.keyCompetency;
            fit = keyUnit;
          }
          return fit;
        }, "")
      );
  }, [uni]);

  useEffect(() => {
    props.formData.time.slotOnTimetable = slot;
    setOpen(false);
  }, [slot]);

  useEffect(() => {
    classs != null &&
      setUnique(
        classs.reduce((acc, current) => {
          const x = acc.find((item) => item.class._id === current.class._id);
          if (!x) {
            return acc.concat([current]);
          } else {
            return acc;
          }
        }, [])
      );
  }, [classs]);

  useEffect(() => {
    async function fetchTopics() {
      const req = await https
        .get(`/lessons/topics/${sub}/subject-topics`, {
          headers: { Authorization: `Basic ${localStorage.token}` },
        })
        .then((res) => {
          setTopics(res.data);
          console.log("TOPICS : ", res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      return req;
    }
    fetchTopics();
  }, [sub]);

  useEffect(() => {
    async function fetchSubTopic() {
      const req = await https
        .get(`/lessons/subtopics/${top}/topic-subTopics`, {
          headers: { Authorization: `Basic ${localStorage.token}` },
        })
        .then((res) => {
          setSubtopic(res.data);
          console.log("SUBTOPICS UNIT : ", res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      return req;
    }
    fetchSubTopic();
  }, [top]);

  useEffect(() => {
    async function fetchUnit() {
      const req = await https
        .get(`/lessons/units/${subT}/subTopic-units`, {
          headers: { Authorization: `Basic ${localStorage.token}` },
        })
        .then((res) => {
          setUnits(res.data);
          console.log("UNITS : ", res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      return req;
    }
    fetchUnit();
  }, [subT]);
  // END of useEffects
  useEffect(() => {
    console.log("________________", unique);
  }, [unique]);

  useEffect(() => {
    fetchClasses();
    fetchSlots();
    dispatchLesson(setNewLessonplan(newLessonPlan));
  }, []);
  return (
    <>
      {/* subject */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Classes"
            variant="outlined"
            value={clas}
            onChange={handleChange}
            type="text"
            fullWidth
            name="class"
            select
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
            {unique &&
              unique.map((item) => (
                <MenuItem key={item.class._id} value={item.class._id}>
                  {!item.class.level ? "" : item.class.level.name}&nbsp;
                  {!item
                    ? ""
                    : !item.class
                    ? ""
                    : !item.class.combination
                    ? ""
                    : !item.class.combination
                    ? ""
                    : item.class.combination.name}
                  &nbsp;
                  {!item
                    ? ""
                    : !item.class
                    ? ""
                    : item.class.label
                    ? item.class.label
                    : ""}
                </MenuItem>
              ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Subject"
            variant="outlined"
            value={props.formData.subject}
            onChange={handlesubject}
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
            {sublist &&
              sublist.map((item) => (
                <MenuItem
                  key={item.subject && item.subject._id}
                  value={item.subject && item.subject._id}
                >
                  {item.subject && item.subject.name}
                </MenuItem>
              ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          {/* date */}

          <MuiPickersUtilsProvider variant="outlined" utils={DateFnsUtils}>
            <KeyboardDatePicker
              margin="normal"
              id="date-picker-dialog"
              label="Date"
              format="MM/dd/yyyy"
              variant="outlined"
              value={time.day}
              fullWidth
              onChange={handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </MuiPickersUtilsProvider>

          <Dialog
            open={open}
            fullWidth
            maxWidth="xl"
            onClose={handleClose}
            scroll={scroll}
            aria-labelledby="scroll-dialog-title"
            aria-describedby="scroll-dialog-description"
          >
            <DialogTitle id="scroll-dialog-title">
              Select a slot on timetable
            </DialogTitle>
            <DialogContent dividers={scroll === "paper"}>
              <DialogContentText
                id="scroll-dialog-description"
                ref={descriptionElementRef}
                tabIndex={-1}
              >
                <TimeTable
                  data={timetabledata}
                  onChange={(value) => setSlot(value)}
                />
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </Grid>

        <Grid item xs={12}>
          {/* topic */}

          <TextField
            label="Topic"
            variant="outlined"
            value={top}
            onChange={handletopic}
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
            {!topics
              ? ""
              : topics.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          {/* subtopic */}

          <TextField
            label="SubTopic"
            variant="outlined"
            value={subT}
            onChange={handlesubtopic}
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
            {!subtopic
              ? ""
              : subtopic.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          {/* unit */}

          <TextField
            label="Unit"
            value={uni}
            onChange={handleunit}
            type="text"
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
            {!units
              ? ""
              : units.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            label="Key Unit Competency"
            name="keyUnitCompetency"
            value={
              uni &&
              units.reduce(function (fit, condition) {
                if (condition._id == uni) {
                  let keyUnit = condition.keyCompetency;
                  fit = keyUnit;
                }
                return fit;
              }, "")
            }
            multiline
            margin="normal"
            variant="outlined"
            disabled
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>

        <Grid item xs={12}>
          {/* topic */}

          <TextField
            label="Lesson"
            variant="outlined"
            type="text"
            fullWidth
            value={lessonNum}
            name="lessonNum"
            select
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem key="1" value="1">
              1
            </MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="text"
            label="Lesson Name"
            name="lessonName"
            value={lessonName}
            onChange={props.setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            block
            style={{ marginTop: "1rem" }}
            onClick={() => {
              assignStatevalues(newLessonPlan, props.formData);
              console.log(
                "this denzo at work ari kumva usiende mbali old school",
                newLessonPlan
              );
              props.navigation.next();
            }}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </>
  );
};

const mapStateToProps = (state, OwnProps) => {
  // const { navigation } = OwnProps
  // const { formData } = OwnProps
  // const { setForm } = OwnProps
  // return {
  //   state, navigation, formData, setForm
  // }
};

const mapDispatchToProps = (dispatch) => ({
  // handleFetchTeacherData: () => {
  //   dispatch(handleFetchTeacherData())
  // },
  // handleFetchLessonPlanSubject: (sub, classs) => {
  //   dispatch(handleFetchLessonPlanSubject(sub, classs))
  // }
});

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlan_start);
