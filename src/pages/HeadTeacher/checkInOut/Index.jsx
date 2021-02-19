import React, { useState } from 'react'
import './Index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button'

export const Index = (props) => {
  const [key, setKey] = useState('guest');
  return (
    <div>
      <PanelLayout selected={2} role="headteacher">
        <div className="checkio-hd"><h3>Check In/Out</h3></div>
        <div className="checkio-container">
          <div className="checkio-tabs">
            <Tabs
              id="controlled-tab-example"
              activeKey={key}
              onSelect={(k) => setKey(k)}
            >
              <Tab eventKey="guest" title="Guest">
                <div className="guest-form">

                  <div className="question-field">
                    <TextField id="outlined-basic" label="Guest Name" variant="outlined" placeholder="Guest Name" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" label="Target Club/Class" variant="outlined" placeholder="Target Club/Class" />
                  </div>
                  <div className="question-field">
                    <TextField id="outlined-basic" label="Topic" variant="outlined" placeholder="Topic" />
                  </div>
                  <div className="question-field">
                    <TextField
                      id="outlined-basic"
                      variant="outlined"
                      label="Reason"
                      type="text"
                      placeholder="Enter Reason"
                      color="primary"
                      multiline={true}
                      rowsMax="5"
                    />  </div>
                  <div className='send-btn'><Button color='primary' className="btn-next" size="large"
                    style={{
                      borderRadius: 5,
                      backgroundColor: "#1f75c6",
                      padding: "7px 15px",
                      fontSize: "15px",
                      color: "#fff",
                      width: '200px',
                      textTransform: 'capitalize'
                    }}
                  >
                    CHECK IN
                </Button></div>
            </div>
          </Tab>
            <Tab eventKey="student" title="Student">
              <h1>what</h1>
            </Tab>
        </Tabs>
        </div>
        </div>
      </PanelLayout>
    </div >
  )
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
