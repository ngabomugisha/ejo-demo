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
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">First Name</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {data.firstName}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">Last Name</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {data.lastName}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">gender</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {(!data.gender) ?  "-" : data.gender}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">student Class</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.studentClass ? "-" : data.studentClass}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">address</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.address ? "-" : data.address}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">scholarship</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.scholarship  ? "-" : data.scholarship}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title"> date Of Birth</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.dateOfBirth  ? "-" : data.dateOfBirth}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">allergies</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.allergies  ? "-" : data.allergies}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">permanent Health Conditions</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.permanentHealthConditions ? "-" : data.permanentHealthConditions.length === 0 ? "-" : (data.permanentHealthConditions.map((item)=> (`${item.condition},  `)))}
            </h6>
            </div>
          </Paper>
        </Grid>
      </Grid>
      <div></div>
      <h4>Parents </h4>
      <h3 style={{color : "#1f72c7",backgroundColor: "whiteSmoke", padding: "3px"}}>Mother</h3>
      <Grid container xs={12} minWidth="xs" spacing={2}>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">First Name</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : data.mother.firstName == "" ? "-" : data.mother.firstName}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">Last Name</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : data.mother.lastName == "" ? "-" : data.mother.lastName}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">ID Number</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : (!data.mother.identificationNumber ? "-" : data.mother.identificationNumber)}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">phone</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : (!data.mother.phone ? "-" : data.mother.phone)}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">email</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : (!data.mother.email ? "-" : data.mother.email)}
            </h6>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper elevation={2}>
            <div className="card-inner">
            <h6 className="paper-title">marital Status</h6>
            <div className="paper-line"></div>
            <h6 className="papaer-content">
              {!data.mother ? "-" : (!data.mother.maritalStatus ? "-" : data.mother.maritalStatus)}
            </h6>
            </div>
          </Paper>
        </Grid>
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

