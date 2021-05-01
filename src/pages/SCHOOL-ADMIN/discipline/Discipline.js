import React,{useState, useEffect} from 'react'
import { connect } from 'react-redux'
import Tree from 'react-animated-tree'
import { TextField, Grid, Snackbar, Switch, Select, MenuItem, Paper, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControlLabel, InputLabel } from '@material-ui/core'
import https from '../../../helpers/https'
import Button from 'react-bootstrap/Button'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import {handleFetchDisciplines, handleUpdateDiscipline} from '../../../store/actions/discipline.actions'
import { makeStyles } from '@material-ui/core/styles';
import MuiAlert from '@material-ui/lab/Alert';
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
const useStyles = makeStyles((theme) => ({
  root: {
      '& .MuiTextField-root': {
          margin: theme.spacing(1),
          width: '25ch',
      },

      width: '100%',
      '& > * + *': {
          marginTop: theme.spacing(2),
      },
  },
  container: {
      display: 'flex',
      flexWrap: 'wrap',
  },
  textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      marginTop: '-5px',
      width: 200,

  },
  formControl: {
      margin: theme.spacing(0),
      minWidth: 120,
  },
  selectEmpty: {
      marginTop: theme.spacing(0),
  },
  form: {
      display: 'flex',
      flexDirection: 'column',
      margin: 'auto',
      width: 'fit-content',
  },
  formControl: {
      marginTop: theme.spacing(2),
      minWidth: 120,
  },
  formControlLabel: {
      marginTop: theme.spacing(1),
  },
}));


const treeStyles = {
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}


export const Discipline = (props) => {
  const [updateMark, setUpdateMark] = useState(null)
  const [msg, setMsg] = useState(null)
  const [ type, setType] = useState(null)
  const [ openMsg, setOpenMsg] = useState(false)
  const [ levelOne, setLevelOne] = useState('')
  const [ levelTwo, setLevelTwo] = useState('')
  const [ levelThree, setLevelThree] = useState('')
  const handleCloseMsg= () => {
    setOpenMsg(false)
  }
  const handleOpenMsg = (ty, msg) => {
    setMsg(msg)
    setType(ty)
    setOpenMsg(true)
}
  const handleChange = e => {
    setLevelOne(e.target.value)
  }
  const handleChanges = (e) => {
    setUpdateMark(parseInt(e.target.value))
  }
  const handleUpdate = id => {
    const selected = props.list.find(i => i._id == id)
    const formated = {firstLevel:selected.firstLevel,secondLevel:selected.secondLevel,thirdLevel:selected.thirdLevel,forthLevel:selected.forthLevel,marks:updateMark}
    // console.log("FORMATTED:",formated)
    
    https.put(`/school-discipline/${id}`, formated, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
    .then((res) => {
        handleOpenMsg('success', `disciplen Marks for ${selected.forthLevel} Updated`)
    })
    .catch(function (erro) {
        handleOpenMsg('warning', erro.message)
    })



  }

  // console.log("WHIT IS GOING ON:", props.list)

  useEffect(() => {
    props.handleFetchDisciplines()
}, [])
  return (
    <>
    {/* <div>

    <TextField
                  label="Sub-topic"
                  variant="outlined"
                  type="text"
                  name="subTopic"
                  fullWidth="true"
                  onChange={handleChange}
                  minWidth="xl"
                  value={levelOne}
                  select
                  InputLabelProps={{
                    shrink: true,
                  }}
                >
                  <MenuItem value=''>
                  </MenuItem>
                  <MenuItem value="responsibility and cleanliness">
                  responsibility and cleanliness
                  </MenuItem>
                  <MenuItem value="indiscipline and rudeness">
                  indiscipline and rudeness
                  </MenuItem>
                </TextField>
                
    </div> */}

      <Tree content="Discipline Marks" open visible style={treeStyles}>
        {/* first level */}
        <Tree content="responsibility and cleanliness" className="treeItem" style={{color:"#3194f6", backgroundColor: "#eef6ff",marginTop: "5px", padding: "8px", borderRadius: "5px"}} type={<span style={typeStyles}>👍🏾</span>} >
          <Tree content="attention to school equipment" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "attention to school equipment" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    defaultValue={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "attention to school equipment" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
         
          </Tree>
          <Tree content="cleaning activities" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleaning activities" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="cleaning activities" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleaning activities" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
         
          </Tree>

          <Tree content="careful work" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "careful work" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "careful work" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>


          <Tree content="cleanliness of clothes" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of clothes" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of clothes" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>
          <Tree content="cleanliness of the body" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of the body" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of the body" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>


          <Tree content="fulfilling commitments" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "fulfilling commitments" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "fulfilling commitments" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="note book update" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "note book update" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "note book update" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>





          <Tree content="possession of school materials" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "possession of school materials" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "possession of school materials" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="respect of procedures" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of procedures" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of procedures" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="respect of school activities timetable" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of school activities timetable" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of school activities timetable" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>





          <Tree content="storage of personal equipment" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "storage of personal equipment" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "storage of personal equipment" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>





          <Tree content="storage of school equipment" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "storage of school equipment" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "storage of school equipment" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>

        </Tree>

        {/* second level */}
        <Tree content="indiscipline and rudeness" style={{color:"#ef471c",marginTop: "5px", backgroundColor: "#ffece7", padding: "8px", borderRadius: "5px"}} type={<span style={typeStyles}>👎🏾</span>} >
         



        <Tree content="accompanied by a visitor without permission" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "accompanied by a visitor without permission" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "accompanied by a visitor without permission" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="challenging authority" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "challenging authority" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
                    </Tree>





          <Tree content="change of authorize hairdressing" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "change of authorize hairdressing" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
           
          </Tree>





          <Tree content="change of dress code" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "change of dress code" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
         
          </Tree>




          <Tree content="chat" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "chat" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
          
          </Tree>




          <Tree content="cheating" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "cheating" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
          
          </Tree>






          <Tree content="damaging school materials" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "damaging school materials" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
         
          </Tree>








          <Tree content="displacement without permission" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "displacement without permission" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
         
          </Tree>







          <Tree content="disrespectful language" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "disrespectful language" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
          
          </Tree>




          <Tree content="fighting" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "fighting" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "fighting" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="lying" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "lying" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "lying" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>






          <Tree content="possession of a prohibited item" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "possession of a prohibited item" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "possession of a prohibited item" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>




          <Tree content="provocative action" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "provocative action" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "provocative action" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>






          <Tree content="provocative tone" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "provocative tone" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "provocative tone" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>








          <Tree content="sexual related issues" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "sexual related issues" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "sexual related issues" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>












          <Tree content="smelling cosmetic product" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "smelling cosmetic product" && item.thirdLevel == "infraction" && item.forthLevel == 'reduction of discipline marks')
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "smelling cosmetic product" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>











          <Tree content="speaking without the authorization" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "speaking without the authorization" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "speaking without the authorization" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>









          <Tree content="stealing" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "stealing" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "stealing" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>









          <Tree content="taking illicit substances" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "taking illicit substances" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "taking illicit substances" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>






          <Tree content="wearing jewelry" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "wearing jewelry" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree> */}
            {/* <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "wearing jewelry" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>







          <Tree content="wrong time to play" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "wrong time to play" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "wrong time to play" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>








          <Tree content="unauthorised food" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "unauthorised food" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "unauthorised food" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>



          <Tree content="vandalism" >
            {/* <Tree content="infraction" > */}
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "vandalism" && item.forthLevel == 'reduction of discipline marks' && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            {/* </Tree>
            <Tree content="Motivation" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "indiscipline and rudeness" && item.secondLevel == "vandalism" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    
                    defaultvalue={item.marks}
                    placeholder={item.marks}
                    aria-label={item.marks}
                    
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => handleUpdate(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree> */}
          </Tree>







        </Tree>
      </Tree>

      <Snackbar open={openMsg} autoHideDuration={6000} onClose={handleCloseMsg}>
                    <Alert onClose={handleCloseMsg} severity={type}>
                        {msg}
                    </Alert>
                </Snackbar>
    </>
  )
}

const mapStateToProps = (state) => {
  const { discipline } = state
  const list = discipline.list
  return {
      state, list
  }
}

const mapDispatchToProps = dispatch => ({
  handleFetchDisciplines: async () => {
      await dispatch(handleFetchDisciplines())
  },
  handleUpdateDiscipline: async (id) => {
      await dispatch(handleFetchDisciplines(id))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Discipline)


