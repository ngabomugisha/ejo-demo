import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import https from "../../../helpers/https";
import {
  Container,
  TextField,
  Button,
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

export const LessonPlan_start = ({ formData, setForm, navigation }) => {
  const teacherId = useSelector((state) => state.auth.user._id);
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const [scroll, setScroll] = React.useState("paper");
  const [slot, setSlot] = useState(null);
  const handleClickOpen = () => {
    setOpen(true);
    setScroll("paper");
  };

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = React.useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  // HANDLE THE SUBJECT, TOPIC, SUBTOPIC, UNIT

  const [teacher, setTeacher] = React.useState([]);
  const [subj, setSubj] = React.useState([]);
  const [topics, setTopics] = useState([]);
  const [subtopic, setSubtopic] = useState([]);
  const [units, setUnits] = useState([]);

  const [sub, setSub] = useState("");
  const [top, setTop] = useState("");
  const [subT, setSubT] = useState("");
  const [uni, setUni] = useState("");

  const handlesubject = (event) => {
    setSub(event.target.value);
    formData.subject = event.target.value;
  };
  const handletopic = (event) => {
    setTop(event.target.value);
  };
  const handlesubtopic = (event) => {
    setSubT(event.target.value);
  };
  const handleunit = (event) => {
    setUni(event.target.value);
    formData.unit = event.target.value;
    // formData.keyUnitCompetency = event.target.value
    setKeyUnitComp(
      units.reduce(function (fit, condition) {
        if (condition._id == uni) {
          let keyUnit = condition.keyCompetency;
          fit.push(keyUnit);
        }
        return fit;
      }, [])
    );
    {
      if (keyUnitComp) {
        formData.keyUnitCompetency = keyUnitComp[0];
      }
    }
  };

  //END OF HANDLE SUBJ............................

  const [classs, setClasss] = React.useState([]);
  const [selectedDate, setSelectedDate] = React.useState(
    new Date("2014-08-18T21:11:54")
  );
  const [mon, setMon] = useState([]);
  const [tue, setTue] = useState([]);
  const [wed, setWed] = useState([]);
  const [thu, setThu] = useState([]);
  const [fri, setFri] = useState([]);
  const [keyUnitComp, setKeyUnitComp] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    time.day = date;
    handleClickOpen();
  };
  const {
    unit,
    unitPlanId,
    lessonNumber,
    keyUnitCompetency,
    lessonName,
    time,
    subject,
  } = formData;
  // const { firstName, lastName, nickName } = formData;
  console.log("FORM DATA, ", formData);
  let timetabledata = {
    events: {
      monday: mon,
      tuesday: tue,
      wednesday: wed,
      thursday: thu,
      friday: fri,
    },
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
        console.log("RETURNED OBJECT:", fit);
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
        console.log("RETURNED OBJECT:", fit);
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
        console.log("RETURNED OBJECT:", fit);
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
        console.log("RETURNED OBJECT:", fit);
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

  function fetchSlots() {
    const req = https
      .get(`/timetables/602b9cfc49ce7a0be4a35fc7/teacher`, {
        headers: { Authorization: `Basic ${localStorage.token}` },
      })
      .then((res) => {
        console.log("RETURNED DATA:", res.data);
        putMon(res.data);
      })
      .catch(function (err) {
        console.log(err);
      });
    return req;
  }

  useEffect(() => {
    formData.time.slotOnTimetable = slot;
    setOpen(false);
  }, [slot]);

  useEffect(() => {
    fetchSlots();

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
    fetchSubjects();

    async function fetchClasses() {
      const req = await https
        .get(`/classes/602c1e8feeb9ae2820b62120/school-classes`, {
          headers: { Authorization: `Basic ${localStorage.token}` },
        })
        .then((res) => {
          setClasss(res.data);
          console.log("CLASSES : ", res.data);
        })
        .catch(function (err) {
          console.log(err);
        });
      return req;
    }
    fetchClasses();
  }, []);

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

  return (
    <Container maxWidth="xs">
      {/* subject */}
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label="Subject"
            variant="outlined"
            value={formData.subject}
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
            {subj.map((item) => (
              <MenuItem key={item._id} value={item._id}>
                {item.name}
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
              label="Date picker dialog"
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
            <DialogTitle id="scroll-dialog-title">Subscribe</DialogTitle>
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
            variant="outlined"
            value={uni}
            onChange={handleunit}
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
            defaultValue="Key Unit Competency"
            value={keyUnitComp}
            multiline
            margin="normal"
            variant="outlined"
            disabled
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          {/* topic */}

          <TextField
            label="Lesson"
            variant="outlined"
            type="text"
            fullWidth
            select
            InputLabelProps={{
              shrink: true,
            }}
          >
            <MenuItem value="">1</MenuItem>
          </TextField>
        </Grid>

        <Grid item xs={12}>
          <TextField
            type="text"
            label="Lesson Name"
            name="lessonName"
            value={lessonName}
            onChange={setForm}
            margin="normal"
            variant="outlined"
            autoComplete="off"
            fullWidth
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            color="primary"
            style={{ marginTop: "1rem" }}
            onClick={() => navigation.next()}
          >
            Next
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state) => ({
  state: state,
});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(LessonPlan_start);
