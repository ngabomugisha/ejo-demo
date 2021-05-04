import React, { useEffect, useState } from "react";
import Container from "@material-ui/core/Container";
import "../NewLessonPlan.css";
import https from "../../../helpers/https";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "bootstrap/dist/css/bootstrap.min.css";
import PlusOneRoundedIcon from "@material-ui/icons/PlusOneRounded";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { v4 as uuidv4 } from "uuid";
import img from "../../../assets/img/home.png";
import { RiDeleteBin6Line } from "react-icons/ri";
import { TiUpload } from "react-icons/ti";
import LinearProgress from '@material-ui/core/LinearProgress';
import ProgressBar from 'react-bootstrap/ProgressBar'
import 'bootstrap/dist/css/bootstrap.min.css'

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

export const LessonPlan_2 = ({ formData, setForm, navigation }) => {
  const [img, setImg] = useState(null);
  const [inputsKnowledge, setInputsKnowledge] = useState([
    {
      id: uuidv4(),
      knowledge: "",
      bloomTaxonomyLevel: "",
      standardCriteriaPerformance: "",
    },
  ]);
  const [inputsSkills, setInputsSkills] = useState([
    {
      id: uuidv4(),
      knowledge: "",
      bloomTaxonomyLevel: "",
      standardCriteriaPerformance: "",
    },
  ]);
  const [inputsAttribute, setInputsAttribute] = useState([
    {
      id: uuidv4(),
      knowledge: "",
      bloomTaxonomyLevel: "",
      standardCriteriaPerformance: "",
    },
  ]);
  const [inputs, setInputs] = useState([
    {
      id: uuidv4(),
      knowledge: "",
      bloomTaxonomyLevel: "",
      standardCriteriaPerformance: "",
    },
  ]);
  const [uploadsIntro, setUploadsIntro] = useState([
    {
      id: uuidv4(),
      instructionalMaterial: '',
      uploadbtn: ''
    }]
  ) 
  const [uploadsSkills, setUploadsSkills] = useState([
    {
      id: uuidv4(),
      instructionalMaterial: '',
      uploadbtn: ''
    }]
  )
  const [uploadsAttribute, setUploadsAttribute] = useState([
    {
      id: uuidv4(),
      instructionalMaterial: '',
      uploadbtn: ''
    }]
  )
  const [key, setKey] = useState("home");
  const [units, setUnits] = useState(null);
  const [term, setTerm] = React.useState("");
  const [instructionalMate, setInstructionalMate] = useState("")
  const classes = useStyles();
  //to be removed
  const [values, setValues] = useState({
    amount: "",
    knowledge: "",
    bloomTaxonomyLevel: "",
    standardCriteriaPerformance: "",
    showPassword: false,
  });

  //to be removed
  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  // adding and removing additional knowledge
  const handleChangeInput = (id, event) => {
    const newInputs = inputsKnowledge.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    formData.knowledge = inputsKnowledge.knowledge;
  };
  const handleChangeInputKnowledge = (id, event) => {
    const newInputs = inputsKnowledge.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    formData.knowledge = inputsKnowledge.knowledge;
  };
  // adding and removing additional content and uploads
  const handleChangeUploads = (id, event) => {
    console.log("############",event.target.value)
    const newUploads = uploadsIntro.map((i) => {
      if (id === i.id) {
        i[event.target.name] = event.target.value;
      }
      return i;
    });
    formData.instructionalMaterial = inputs.instructionalMaterial;
  };

  const handleAddFields = () => {
    setInputsKnowledge([
      ...inputsKnowledge,
      {
        id: uuidv4(),
        knowledge: "",
        bloomTaxonomyLevel: "",
        standardCriteriaPerformance: "",
      },
    ]);
  };
  const handleAddFieldsUpload = () => {
    setUploadsIntro([
      ...uploadsIntro,
      {
        id: uuidv4(),
        instructionalMaterial: '',
        uploadbtn: ''
      },
    ]);
  };

  const handleRemoveInput = (id) => {
    const values = [...inputsKnowledge];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setInputsKnowledge(values);
  };

  const handleRemoveInputUpload = (id) => {
    const values = [...uploadsIntro];
    values.splice(
      values.findIndex((value) => value.id === id),
      1
    );
    setUploadsIntro(values);
  };

  const {
    knowledge,
    topics,
    instructionalMaterial,
    otherMaterialsReferences,
  } = formData;

  const imgSetter = (ob) => {
    setImg(ob);
  };

  useEffect(() => {
    async function fetchUnit() {
      const req = await https
        .get(`/lessons/unit-plans/6035240d55ca8b00360caf0f`, {
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
  return (
    <Container maxWidth="xs">
      <Tabs
        fill={true}
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Knowledge" fill={true}>
          <div className="knowledge-container">
            <h5>Instructional Object</h5>
            {console.log("MY INPUTS :::::::::::::::", inputs)}
            {inputsKnowledge.map((input) => (
              <>
                <div className="knowledge-container-2">
                  <div className="topic">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Select Knowledge
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={inputsKnowledge.knowledge}
                        onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                        label="Select Knowledge"
                        color="primary"
                        name="knowledge"
                        autoWidth={false}
                      >
                        {units &&
                          units.map((item) => (
                            <MenuItem key={item._id} value={item._id}>
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
                      </Select>
                    </FormControl>
                  </div>
                  <div className="topic">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Bloom Taxonomy Level
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={inputs.bloomTaxonomyLevel}
                        name='bloomTaxonomyLevel'
                        onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                        label="Cognitive Domain Level"
                      >
                        {/* {units.map(item => {
                    <MenuItem key={item._id} value={item._id}>{item.</MenuItem>
                  })} */}
                        <MenuItem value="REMEMBERING">Remembering</MenuItem>
                        <MenuItem value="UNDERSTANDING">Understanding</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <div className="topic">
                    <FormControl
                      variant="outlined"
                      className={classes.formControl}
                    >
                      <InputLabel id="demo-simple-select-outlined-label">
                        Standard Criteria Performance
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        name='standardCriteriaPerformance'
                        value={inputsKnowledge.standardCriteriaPerformance}
                        onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                        label="Standard Criteria Performance"
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
                      </Select>
                    </FormControl>

                    {/* <LinearProgress variant="determinate" value={input.standardCriteriaPerformance} /> */}
                  </div>
                  <ProgressBar now={input.standardCriteriaPerformance} label={`${input.standardCriteriaPerformance}%`} />
                  <div className="delete-btn">
                    {inputs.length <= 1 ? "" :
                      <button
                        style={{ color: "red" }}
                        onClick={() => handleRemoveInput(input.id)}
                        className="check-btn-3"
                      >
                        <RiDeleteBin6Line />
                      </button>}
                  </div>
                </div>
              </>
            ))}
            {/* END OF KNOWLEDGE */}

            <div style={{ display: "flex", justifyContent: "space-evenly" }}>
              <button onClick={handleAddFields} className="check-btn">
                <PlusOneRoundedIcon />
                <br />
                New Knowledge
              </button>
              {/* 
              <button className="check-btn-2">
                <PlusOneRoundedIcon />
              </button> */}
            </div>


            {uploadsIntro.map((input) => (
              <>
                <div className="knowledge-container-3">
                  <div className="topic">
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel id="demo-simple-select-outlined-label">
                        Instruction Material
                  </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={uploadsIntro.instructionalMaterial}
                        onChange={(e) => handleChangeUploads(input.id, e)}
                        label="Instruction Material"
                        name="instructionalMaterial"
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Prints">Prints</MenuItem>
                        <MenuItem value="Audio">Audio</MenuItem>
                        <MenuItem value="Visual">Visual</MenuItem>
                        <MenuItem value="Audio visuals">Audio visuals</MenuItem>
                        <MenuItem value="Electronic Interactives">Electronic Interactives</MenuItem>
                        <MenuItem value="Measurement tools">Measurement tools</MenuItem>
                      </Select>
                    </FormControl>
                  </div>
                  <input
                    className={classes.input}
                    id="contained-button-file"
                    multiple
                    type="file"
                  />
                  <label htmlFor="contained-button-file">
                    <h7>
                      <TiUpload />&nbsp;
                  Upload Content</h7>
                  </label>

                  {/* <Button
                    variant="contained"
                    component="label">
                    Upload File
                  <input type="file"
                      hidden
                    />
                  </Button> */}
                  <div className="delete-btn">{uploadsIntro.length <= 1 ? "" :
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleRemoveInputUpload(input.id)}
                      className="check-btn-3"
                    >
                      <RiDeleteBin6Line />
                    </button>}
                  </div>
                </div>
              </>))}
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
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                label="Other Materials and References"
                color="primary"
              />
            </div>
          </div>
        </Tab>
        <Tab eventKey="profile" title="Skills" fill={true}> <div className="knowledge-container">
          <h5>Instructional Object</h5>
          {console.log("MY INPUTS :::::::::::::::", uploadsIntro)}
          {inputs.map((input) => (
            <>
              <div className="knowledge-container-2">
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select Knowledge
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.knowledge}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Select Knowledge"
                      color="primary"
                      autoWidth={false}
                    >
                      {units &&
                        units.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
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
                    </Select>
                  </FormControl>
                </div>
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Bloom Taxonomy Level
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.bloomTaxonomyLevel}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Cognitive Domain Level"
                    >
                      {/* {units.map(item => {
                    <MenuItem key={item._id} value={item._id}>{item.</MenuItem>
                  })} */}
                      <MenuItem value="REMEMBERING">Remembering</MenuItem>
                      <MenuItem value="UNDERSTANDING">Understanding</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Standard Criteria Performance
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.standardCriteriaPerformance}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Standard Criteria Performance"
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
                    </Select>
                  </FormControl>
                </div>
                <div className="delete-btn">
                  {inputs.length <= 1 ? "" :
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleRemoveInput(input.id)}
                      className="check-btn-3"
                    >
                      <RiDeleteBin6Line />
                    </button>}
                </div>
              </div>
            </>
          ))}
          {/* END OF KNOWLEDGE */}

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={handleAddFields} className="check-btn">
              <PlusOneRoundedIcon />
              <br />
                New Knowledge
              </button>
            {/* 
              <button className="check-btn-2">
                <PlusOneRoundedIcon />
              </button> */}
          </div>


          {uploadsIntro.map((input) => (
            <>
              <div className="knowledge-container-3">
                <div className="topic">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Instruction Material
                  </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={instructionalMate}
                      onChange={e => setInstructionalMate(e.target.value)}
                      label="Instruction Material"
                      name="instructionalMaterial"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Prints</MenuItem>
                      <MenuItem value={20}>Audio</MenuItem>
                      <MenuItem value={30}>Visual</MenuItem>
                      <MenuItem value={40}>Audio visuals</MenuItem>
                      <MenuItem value={50}>Electronic Interactives</MenuItem>
                      <MenuItem value={60}>Measurement tools </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <h7>
                    <TiUpload />&nbsp;
                  Upload Content</h7>
                </label>


                <div className="delete-btn">{uploadsIntro.length <= 1 ? "" :
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleRemoveInputUpload(input.id)}
                    className="check-btn-3"
                  >
                    <RiDeleteBin6Line />
                  </button>}
                </div>
              </div>
            </>))}
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
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Other Materials and References"
              color="primary"
            />
          </div>
        </div>

        </Tab>
        <Tab eventKey="contact" title="Attitude and Value" fill={true}> <div className="knowledge-container">
          <h5>Instructional Object</h5>
          {console.log("MY INPUTS :::::::::::::::", inputs)}
          {inputs.map((input) => (
            <>
              <div className="knowledge-container-2">
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Select Knowledge
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.knowledge}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Select Knowledge"
                      color="primary"
                      autoWidth={false}
                    >
                      {units &&
                        units.map((item) => (
                          <MenuItem key={item._id} value={item._id}>
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
                    </Select>
                  </FormControl>
                </div>
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Bloom Taxonomy Level
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.bloomTaxonomyLevel}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Cognitive Domain Level"
                    >
                      {/* {units.map(item => {
                    <MenuItem key={item._id} value={item._id}>{item.</MenuItem>
                  })} */}
                      <MenuItem value="REMEMBERING">Remembering</MenuItem>
                      <MenuItem value="UNDERSTANDING">Understanding</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <div className="topic">
                  <FormControl
                    variant="outlined"
                    className={classes.formControl}
                  >
                    <InputLabel id="demo-simple-select-outlined-label">
                      Standard Criteria Performance
                      </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value={input.standardCriteriaPerformance}
                      onChange={(e) => handleChangeInputKnowledge(input.id, e)}
                      label="Standard Criteria Performance"
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
                    </Select>
                  </FormControl>
                </div>
                <div className="delete-btn">
                  {inputs.length <= 1 ? "" :
                    <button
                      style={{ color: "red" }}
                      onClick={() => handleRemoveInput(input.id)}
                      className="check-btn-3"
                    >
                      <RiDeleteBin6Line />
                    </button>}
                </div>
              </div>
            </>
          ))}
          {/* END OF KNOWLEDGE */}

          <div style={{ display: "flex", justifyContent: "space-evenly" }}>
            <button onClick={handleAddFields} className="check-btn">
              <PlusOneRoundedIcon />
              <br />
                New Knowledge
              </button>
            {/* 
              <button className="check-btn-2">
                <PlusOneRoundedIcon />
              </button> */}
          </div>


          {uploadsIntro.map((input) => (
            <>
              <div className="knowledge-container-3">
                <div className="topic">
                  <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">
                      Instruction Material
                  </InputLabel>
                    <Select
                      labelId="demo-simple-select-outlined-label"
                      id="demo-simple-select-outlined"
                      value="Audio-visual"
                      onChange={handleChange}
                      label="Instruction Material"
                    >
                      <MenuItem value="">
                        <em>None</em>
                      </MenuItem>
                      <MenuItem value={10}>Prints</MenuItem>
                      <MenuItem value={20}>Audio</MenuItem>
                      <MenuItem value={30}>Visual</MenuItem>
                      <MenuItem value={40}>Audio visuals</MenuItem>
                      <MenuItem value={50}>Electronic Interactives</MenuItem>
                      <MenuItem value={60}>Measurement tools </MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <input
                  accept="image/*"
                  className={classes.input}
                  id="contained-button-file"
                  multiple
                  type="file"
                />
                <label htmlFor="contained-button-file">
                  <h7>
                    <TiUpload />&nbsp;
                  Upload Content</h7>
                </label>


                <div className="delete-btn">{uploadsIntro.length <= 1 ? "" :
                  <button
                    style={{ color: "red" }}
                    onClick={() => handleRemoveInputUpload(input.id)}
                    className="check-btn-3"
                  >
                    <RiDeleteBin6Line />
                  </button>}
                </div>
              </div>
            </>))}
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
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              label="Other Materials and References"
              color="primary"
            />
          </div>
        </div>

        </Tab>
      </Tabs>
      <div style={{ marginTop: "1rem" }}>
        {/* <Button
          color="secondary"
          variant="contained"
          style={{ marginRight: "1rem" }}
          onClick={() => navigation.previous()}
        >
          Back
        </Button> */}
        <Button
          color="primary"
          variant="contained"
          onClick={() => navigation.next()}
        >
          Next
        </Button>
      </div>
    </Container>
  );
};
