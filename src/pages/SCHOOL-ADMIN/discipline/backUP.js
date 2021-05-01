import React from 'react'
import { connect } from 'react-redux'
import ReactDOM from 'react-dom'
import Tree from 'react-animated-tree'
import { } from '@material-ui/core'
import Button from 'react-bootstrap/Button'
import './style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import InputGroup from 'react-bootstrap/InputGroup'
import FormControl from 'react-bootstrap/FormControl'

const treeStyles = {
}

const typeStyles = {
  fontSize: '2em',
  verticalAlign: 'middle'
}


export const Discipline = (props) => {


  const handleChanges = (e) => {
    console.log("CHANGES:", e.target.value)
  }


console.log(props.list)
  return (
    <>
      <Tree content="main" open visible style={treeStyles}>
        {/* first level */}
        <Tree content="responsibility and cleanliness" type={<span style={typeStyles}>👍🏾</span>} >
          <Tree content="attention to school equipment" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "attention to school equipment" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "attention to school equipment" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
         
          </Tree>
          <Tree content="cleaning activities" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleaning activities" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="cleaning activities" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleaning activities" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
         
          </Tree>

          <Tree content="careful work" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "careful work" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "careful work" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>


          <Tree content="cleanliness of clothes" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of clothes" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of clothes" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>
          <Tree content="cleanliness of the body" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of the body" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "cleanliness of the body" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>


          <Tree content="fulfilling commitments" canHide>
            <Tree content="infraction" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "fulfilling commitments" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "fulfilling commitments" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>




          <Tree content="note book update" >
            <Tree content="infraction" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "note book update" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "note book update" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>





          <Tree content="possession of school materials" >
            <Tree content="infraction" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "possession of school materials" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "possession of school materials" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>




          <Tree content="respect of procedures" >
            <Tree content="infraction" >
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of procedures" && item.thirdLevel == "infraction")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
            <Tree content="Motivation" canHide>
              {
                props.list &&
                props.list.map(item => {
                  if(item.firstLevel == "responsibility and cleanliness" && item.secondLevel == "respect of procedures" && item.thirdLevel == "motivation")
                  { 
                    return(
                <div className="itemUpdate"><p>{item.forthLevel}</p>
                <InputGroup className="mb-3">
                  <FormControl
                    placeholder={item.marks}
                    aria-label={item.marks}
                    aria-describedby="basic-addon2"
                    onChange={handleChanges}
                  />
                  <InputGroup.Append>
                    <Button onClick={() => alert(item._id)}  variant="info">Update</Button>
                  </InputGroup.Append>
                </InputGroup>
              </div>)
                  }
              })
              }
            </Tree>
          </Tree>


        </Tree>

        {/* second level */}
        <Tree content="indiscipline and rudeness" type={<span style={typeStyles}>👎🏾</span>} >
          <Tree content="hello" />
          <Tree content="sub-subtree with children">
            <Tree content="child 1" style={{ color: '#63b1de', backgroundColor: "red", maxWidth: "min-Content", padding: "10px" }} />
            <Tree content="child 2" style={{ color: '#63b1de' }} >test</Tree>
            <Tree content="child 3" style={{ color: '#63b1de' }} />
          </Tree>
          <Tree content="hello" />
        </Tree>
      </Tree>
    </>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Discipline)


