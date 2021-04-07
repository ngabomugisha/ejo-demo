import React, { Component, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import {bindActionCreators} from 'redux'
import './style.css'
import ReactToPrint from "react-to-print";
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';



const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal"
};


class ComponentToPrint extends React.Component {
constructor(props){
  super(props)
}

  render() {
    let less=null
    if(this.props.data){
     less = this.props.data[0]
    }else{
      alert("please select subject first")
      
    }
    return (
      <div className="print-lessonPlan-container">
      <div className="print-lp-hd">
        <h4>School Name :</h4>
        <h4>Teacher's Name :</h4>
        </div>
        <div className="print-ls-table">

      <table border="1" className="ls-table">
        <tr>
          <th>Term</th>
          <th>Date</th>
          <th>Subject</th>
          <th>Class</th>
          <th>Unit</th>
          <th>Lesson N<sup><u>o</u></sup></th>
          <th>Duration</th>
          <th>Class Size</th>
        </tr>

        <tr>
          <td>1</td>
          <td>{less && less.time && (less.time.day).substring(0,(less.time.day).indexOf('T'))}</td>
          <td>{less && less.subject && less.subject}</td>
          <td>{`S1`}</td>
          <td>{`1`}</td>
          <td>{`1 of 4`}</td>
          <td>{`40 min`}</td>
          <td>{`24`}</td>
        </tr>

        <tr>
          <td colSpan="4">Type of Special Education needs to be catered for in this lesson and numbers in each category</td>
          <td colSpan="4">{}</td>
        </tr>

        <tr>
          <td colSpan="2">Unit title</td>
          <td colSpan="6">{less && less.lessonName}</td>
        </tr>

<tr>
  <td colSpan="8">
    <h8 style={{fontWeight:"bold"}}>Learning Objectives</h8>
    <p>{}</p>
  </td>
</tr>

<tr>
  <td colSpan="2">Plan for this class</td>
  <td colSpan="6">{`Groups in classroom/laboratory or outdoors`}</td>
</tr>

<tr>
  <td colSpan="2">Learning Materials</td>
  <td colSpan="6"></td>
</tr>

<tr>
  <td colSpan="2">References</td>
  <td colSpan="6"></td>
</tr>



      </table>

      <table border="1" className="ls-table">
          <tr>
            <th>Timing for each step</th>
            <th colSpan="2">Description of taching and leaning activity</th>
            <th></th>
          </tr>
          <tr>
            <th></th>
            <th>Teacher activities</th>
            <th>Learner activities</th>
            <th>Generic Compotences and cross-cutting issues to be addressed</th>
          </tr>

          <tr>
            <td><h3>Introduction:</h3><p>5 Min</p></td>
            <td></td>
            <td></td>
            <td></td>
            
          </tr>

      </table>


      </div>
            </div>
    );
  }
}



export function Index(){
  let componentRef = useRef()
  const dispatch = useDispatch();


  const { list: PLAN } = useSelector((state) => state.lessonPlans);




    return (
      <div>
        <ReactToPrint
          trigger={() => <button className="print-btn"> Print This School Report <PrintIcon/></button>}
          content={() => componentRef}
        />
        <ComponentToPrint ref={(el) => (componentRef = el)} data={PLAN}/>
      </div>
    )
  
}

function mapStateToProps(state){
  return {
    state2 : state
  }
}

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
