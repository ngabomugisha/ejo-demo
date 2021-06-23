import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tab from "react-bootstrap/Tab";
import { connect, useDispatch, useSelector } from "react-redux";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { v4 as uuidv4 } from "uuid";
import img from "../../../assets/img/home.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import LinearProgress from "@material-ui/core/LinearProgress";
import { Checkbox, TextField } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
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
  select: {
    backgroundColor: "#ff0",
  },
}));

export const SkillsForm = (props) => {
  const { newLessonPlan } = useSelector((state) => state);
  const dispatchLesson = useDispatch();
  console.log("new lesson plan in skills form", newLessonPlan);
  const classes = useStyles();
  let collected = {};
  const { formData, setForm, knowledgePage, setSkillsPage } = props;
  const [inputsSkills, setInputsSkills] = useState([
    {
      id: uuidv4(),
      topic: "",
      bloomTaxonomyLevel: "",
      standardCriteriaPerfomance: 0,
    },
  ]);
  const [uploadsSkills, setUploadsSkills] = useState([
    {
      id: uuidv4(),
      materialType: "",
      uploadbtn: "",
      items: [],
    },
  ]);
  const [units, setUnits] = useState(null);
  const [materialReference, setMaterialReference] = useState("");
  const [choosenMaterial, setChoosenMaterial] = useState(null);
  const [allData, setAllData] = useState({});

  const thisFormData = {
    skills: {},
  };

  const assignStatevalues = (newLessonPlan, formData) => {
    newLessonPlan.skills = formData.skills;
  };

  const handleChange = (e) => {
    if (e.target.name == "materialReference") {
      setMaterialReference(e.target.value);
      setAllData({ ...allData, materialReference: e.target.value });
    }
  };

  //change for knowledge fields
  const handleChangeInputSkills = (id, event) => {
    inputsSkills.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    setAllData({ ...allData, topics: inputsSkills });
  };

  // adding and removing additional content and uploads
  const handleChangeUploads = (id, event) => {
    uploadsSkills.map((i) => {
      if (id === i.id) {
        if (event.target.name == "materialType") {
          i[event.target.name] = event.target.value;
        } else {
          if (event.target.checked == true) {
            i.items && i.items.push({ item: event.target.name });
          } else {
            i.items &&
              i.items.splice(
                i.items.findIndex((x) => x.item === event.target.name),
                1
              );
          }
        }
      }
      return i;
    });
    setAllData({ ...allData, instructionalMaterial: uploadsSkills });
  };

  const handleAddFields = () => {
    setInputsSkills([
      ...inputsSkills,
      {
        id: uuidv4(),
        topic: "",
        bloomTaxonomyLevel: "",
        standardCriteriaPerfomance: "",
      },
    ]);
  };

  const handleAddFieldsUpload = () => {
    setUploadsSkills([
      ...uploadsSkills,
      {
        id: uuidv4(),
        instructionalMaterial: "",
        uploadbtn: "",
        items: [],
      },
    ]);
  };

  const handleRemoveInput = (id) => {
    const values = [...inputsSkills];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputsSkills(values);
    setAllData({ ...allData, topics: inputsSkills });
  };

  const handleRemoveInputUpload = (id) => {
    const values = [...uploadsSkills];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setUploadsSkills(values);
    setAllData({ ...allData, instructionalMaterial: uploadsSkills });
  };

  useEffect(() => {
    function fetchUnit() {
      const req = https
        .get(`/lessons/unit-plans/${formData.unit}`, {
          headers: { Authorization: `Basic ${localStorage.token}` },
        })
        .then((res) => {
          setUnits(res.data.content.knowledgeAndUnderstanding);
        })
        .catch(function (err) {
          console.log(err);
        });
      return req;
    }
    fetchUnit();
  }, []);

  //   useEffect(() => {
  //     console.log(
  //       "********",
  //       inputsSkills,
  //       "%%%%%%%%%%",
  //       uploadsSkills,
  //       "&&&&&&&&",
  //       allData
  //     );
  //   }, [materialReference]);

  useEffect(() => {
    thisFormData.skills = allData;
    assignStatevalues(newLessonPlan, thisFormData);
    dispatchLesson(setNewLessonplan(newLessonPlan));
    console.log(
      "********",
      inputsSkills,
      "%%%%%%%%%%",
      uploadsSkills,
      "&&&&&&&& SKILLS ADDED",
      newLessonPlan
    );
  }, [allData]);
  return (
    <>
      <div className="knowledge-container">
        <p></p>
        {inputsSkills.map((input) => (
          <>
            <div className="knowledge-container-2">
              <div className="field">
                <TextField
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={inputsSkills.topic}
                  onChange={(e) => handleChangeInputSkills(input.id, e)}
                  label="Select Skills"
                  color="primary"
                  name="topic"
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
                  {units &&
                    units.map((item) => (
                      <MenuItem key={item._id} value={item.topic}>
                        <div className="menu-option">
                          <h3>{item.topic}</h3>
                          <p>
                            <i>
                              {item.bloomTaxonomy &&
                                `Bloom Taxonomy :${item.bloomTaxonomy}`}
                            </i>
                          </p>
                          <p>
                            <i>
                              {item.standardCriteriaPerfomance &&
                                `Standard Criteria Perfomance :${item.standardCriteriaPerfomance}`}
                            </i>
                          </p>
                          <p>
                            <i>
                              {item.numberOftimesTaught >= 0 &&
                                `Number of times taught :${item.numberOftimesTaught}`}
                            </i>
                          </p>
                          {/* <img src={}/> */}
                          {/* <h3>{JSON.stringify(item)}</h3> */}
                          {item.files.length > 0 &&
                            item.files.map((im) => {
                              let imgurl = {
                                uri: `https://ejo-education.herokuapp.com\\${im.file}`,
                              };
                              return (
                                <img
                                  className="knowledge-img"
                                  src={imgurl.uri}
                                />
                              );
                            })}
                          {/* {img && <img src={`${process.env.REACT_APP_API_NORMAL}/${img.file}`} />} */}
                        </div>
                      </MenuItem>
                    ))}
                </TextField>
              </div>
              <div className="field">
                <TextField
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={inputsSkills.bloomTaxonomyLevel}
                  name="bloomTaxonomyLevel"
                  onChange={(e) => handleChangeInputSkills(input.id, e)}
                  label="Cognitive Domain Level"
                  type="text"
                  fullWidth
                  variant="outlined"
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value="Skills">Skills</MenuItem>
                </TextField>
              </div>
              <div className="field">
                <TextField
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  name="standardCriteriaPerfomance"
                  value={
                    input.standardCriteriaPerfomance &&
                    input.standardCriteriaPerfomance
                  }
                  onChange={(e) => handleChangeInputSkills(input.id, e)}
                  label="Standard Criteria Performance"
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
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={20}>20</MenuItem>
                  <MenuItem value={30}>30</MenuItem>
                  <MenuItem value={40}>40</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                  <MenuItem value={60}>60</MenuItem>
                  <MenuItem value={70}>70</MenuItem>
                  <MenuItem value={80}>80</MenuItem>
                  <MenuItem value={90}>90</MenuItem>
                  <MenuItem value={100}>100</MenuItem>
                </TextField>
                {/* <LinearProgress variant="determinate" value={input.standardCriteriaPerfomance} /> */}
              </div>
              <ProgressBar
                now={input.standardCriteriaPerfomance}
                label={`${input.standardCriteriaPerfomance}%`}
              />
              <div className="delete-btn">
                {inputsSkills.length > 1 ? (
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleRemoveInput(input.id)}
                    className="check-btn-3"
                  >
                    <RiDeleteBin6Line />
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>
          </>
        ))}
        {/* END OF KNOWLEDGE */}

        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button onClick={handleAddFields} className="check-btn">
            <PlusOneRoundedIcon />
            <br />
            New Skills
          </button>
          {/* 
              <button className="check-btn-2">
                <PlusOneRoundedIcon />
              </button> */}
        </div>

        {uploadsSkills.map((input) => (
          <>
            <div className="knowledge-container-3">
              <div className="topic">
                <TextField
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={input.materialType}
                  onChange={(e) => handleChangeUploads(input.id, e)}
                  label="Instruction Material Type"
                  name="materialType"
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
                  <MenuItem value="Prints">Prints</MenuItem>
                  <MenuItem value="Audio">Audio</MenuItem>
                  <MenuItem value="Visual">Visual</MenuItem>
                  <MenuItem value="Audio visuals">Audio visuals</MenuItem>
                  <MenuItem value="Electronic Interactives">
                    Electronic Interactives
                  </MenuItem>
                </TextField>
              </div>
              {input.materialType == "Prints" ? (
                <div>
                  <div className="forCheckBox">
                    <p>TextBooks</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="TextBooks"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Pamphlets</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Pamphlets"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Handouts</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Handouts"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Study guides</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="StudyGuides"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Manuals</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Manuals"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                </div>
              ) : input.materialType == "Audio" ? (
                <div>
                  <div className="forCheckBox">
                    <p>CD</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="CD"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>USB</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="USB"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                </div>
              ) : input.materialType == "Visual" ? (
                <div>
                  <div className="forCheckBox">
                    <p>Charts</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Charts"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Real Objects</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="realOpjects"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Photographs</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Photographs"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Transparencies</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Transparencies"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                </div>
              ) : input.materialType == "Audio visuals" ? (
                <div>
                  <div className="forCheckBox">
                    <p>Slides</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Slides"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Tapes</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Tapes"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Films</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Films"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Filmstrips</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Filmstrips"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Television</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Television"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Video</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Video"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Multimedia</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Multimedia"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                </div>
              ) : input.materialType == "Electronic Interactives" ? (
                <div>
                  <div className="forCheckBox">
                    <p>Interactives</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Interactives"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Computers</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Computers"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Calculator</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Calculator"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                  <div className="forCheckBox">
                    <p>Tablets</p>
                    <Checkbox
                      onChange={(e) => handleChangeUploads(input.id, e)}
                      name="Tablets"
                      color="primary"
                      inputProps={{ "aria-label": "secondary checkbox" }}
                    />
                  </div>
                </div>
              ) : (
                ""
              )}
              <input
                className={classes.input}
                id="contained-button-file"
                multiple
                type="file"
              />
              <label htmlFor="contained-button-file">
                <h7>
                  <TiUpload />
                  &nbsp; Upload Content
                </h7>
              </label>

              <div className="delete-btn">
                {uploadsSkills.length <= 1 ? (
                  ""
                ) : (
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleRemoveInputUpload(input.id)}
                    className="check-btn-3"
                  >
                    <RiDeleteBin6Line />
                  </button>
                )}
              </div>
            </div>
          </>
        ))}
        <div style={{ display: "flex", justifyContent: "space-evenly" }}>
          <button onClick={handleAddFieldsUpload} className="check-btn">
            <PlusOneRoundedIcon />
            <br />
            Add Instructional Material
          </button>
        </div>
        <div className="topic">
          <TextField
            variant="outlined"
            name="materialReference"
            onChange={handleChange}
            labelId="demo-simple-select-outlined-label"
            id="demo-simple-select-outlined"
            label="Other Materials and References"
            color="primary"
          />
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(SkillsForm);
