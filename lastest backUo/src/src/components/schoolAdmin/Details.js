import React from 'react'
import { connect } from 'react-redux'
import './style.css'

import {Paper, Grid} from '@material-ui/core';


export const Details = (props) => {
  console.log(props.recordForEdit)
  const data = props.recordForEdit
  return (
    <div className="details-container">
      <Paper elevation={5} className='paper-container'>
      <Grid container xs={12} minWidth="xs" spacing={2}>
        <Grid item xs={12}>
          <Paper elevation={2}>
      <h3 style={{color : "#1f72c7",backgroundColor: "whiteSmoke", padding: "3px"}}>Student Information</h3>
         
            <div className="card-inner">
            <h6 className="paper-title">First Name  :</h6>
            <h6 className="papaer-content">
              {data.firstName}
            </h6>
            <h6 className="paper-title">Last Name  :</h6>
            <h6 className="papaer-content">
              {data.lastName}
            </h6>
            <h6 className="paper-title">Registration Number  :</h6>
            <h6 className="papaer-content">
              {!data.registrationNumber ? "-" : data.registrationNumber}
            </h6>
            <h6 className="paper-title">gender  :</h6>
            <h6 className="papaer-content">
              {(!data.gender) ?  "-" : data.gender}
            </h6>
            <h6 className="paper-title">student Class  :</h6>
            <h6 className="papaer-content">
              {!data.studentClass ? "-" : data.studentClass}
            </h6>
            <h6 className="paper-title">address  :</h6>
            <h6 className="papaer-content">
              {!data.address ? "-" : data.address}
            </h6>
            <h6 className="paper-title">scholarship  :</h6>
            <h6 className="papaer-content">
              {!data.scholarship  ? "-" : data.scholarship}
            </h6>
            <h6 className="paper-title"> date Of Birth  :</h6>
            <h6 className="papaer-content">
              {!data.dateOfBirth  ? "-" : (data.dateOfBirth).substring(0.11)}
            </h6>
            <h6 className="paper-title">allergies  :</h6>
            <h6 className="papaer-content">
              {!data.allergies  ? "-" : data.allergies}
            </h6>
            <h6 className="paper-title">permanent Health Conditions  :</h6>
            <h6 className="papaer-content">
              {!data.permanentHealthConditions ? "-" : data.permanentHealthConditions.length === 0 ? "-" : (data.permanentHealthConditions.map((item)=> (`${item.condition},  `)))}
            </h6>

            <br/>
          <Grid className="more-details" item xs={8}>
            <Paper>
            <h3 style={{color : "#1f72c7",backgroundColor: "whiteSmoke", padding: "3px"}}>NGO (Non-Governmental Organization) </h3>       
                  <h6 className="papaer-content">
              {!data.ngo ? "-" : data.ngo.name == "" ? "-" : data.ngo.name}
                    </h6>
              <div className="space"></div>
            <h6 className="paper-title2"><u>contact person  </u></h6>
            <div className="paper-title">Title  :</div>            
                  <h6 className="papaer-content">
              {!data.ngo ? "-" : data.ngo.contactPerson.title == "" ? "-" : data.ngo.contactPerson.title}
                    </h6>
            <h6 className="paper-title">Name  :</h6>            
                  <h6 className="papaer-content">
              {!data.ngo ? "-" : data.ngo.contactPerson.name == "" ? "-" : data.ngo.contactPerson.name}
                    </h6>
            <h6 className="paper-title">Phone  :</h6>            
                  <h6 className="papaer-content">
              {!data.ngo ? "-" : data.ngo.contactPerson.phone == "" ? "-" : data.ngo.contactPerson.phone}
                    </h6>
            </Paper>
            </Grid>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div></div>
      <h4>Guardians </h4>
      <Grid container xs={12} minWidth="xs" spacing={2}>
        {console.log("DATA :",data)}
        {!data.guardians ? "-" : data.guardians.map((item) => (

<Grid item xs={6}>
<Paper elevation={4}>
<h3 style={{color : "#1f72c7",backgroundColor: "whiteSmoke", padding: "3px"}}> guadian</h3>
  <div className="card-inner">
  <h6 className="paper-title">First Name  :</h6>
  <h6 className="papaer-content">
    { item.firstName == "" ? "-" : item.firstName}
  </h6>
  <h6 className="paper-title">Last Name  :</h6>
  <h6 className="papaer-content">
    { item.lastName == "" ? "-" : item.lastName}
  </h6>
  <h6 className="paper-title">ID Number  :</h6>
  <h6 className="papaer-content">
    { item.identificationNumber == "" ? "-" : item.identificationNumber}
  </h6>
  <h6 className="paper-title">phone  :</h6>
  <h6 className="papaer-content">
    { item.phone == "" ? "-" : item.phone}
  </h6>
  <h6 className="paper-title">email  :</h6>
  <h6 className="papaer-content">
    { item.email == "" ? "-" : item.email}
  </h6>
  <h6 className="paper-title">marital Status  :</h6>
  <h6 className="papaer-content">
    { item.maritalStatus == "" ? "-" : item.maritalStatus}
  </h6>
  <h6 className="paper-title">Relationship  :</h6>
  <h6 className="papaer-content">
    { item.relationship == "" ? "-" : item.relationship}
  </h6>
  </div>
</Paper>
</Grid>

        ))}
    
      </Grid>

      </Paper>
    </div>
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}
export default connect(mapStateToProps, mapDispatchToProps)(Details)

