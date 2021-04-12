import React, { Component } from 'react'
import { connect } from 'react-redux'
import './style.css'
import ReactToPrint from "react-to-print";
import lyceLogo from '../../../assets/img/lyceLogo.jpeg'
import { Avatar } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import PrintIcon from '@material-ui/icons/Print';



const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal"
};


class ComponentToPrint extends React.Component {
  render() {
    return (
      <div className="schoolReport-container">
        {/* report header */}
        <div className="report-hd">
          <div className="school-details">
            <p >REPUBLIC OF RWANDA</p>
            <p>MINISTRY OF EDUCATION</p>
            <p>LYCE DE KIGALI</p>
            <img className="report-logo" src={lyceLogo} />
            <p>P.O.Box 637 KIGALI | Tel: +250788302539</p>
            <p>Email:&nbsp;masabomartin@yahoo.com</p>
          </div>

          <div className="student-details">
            <div className='student-img'>
              <Avatar variant="square" style={{ minWidth: "140px", minHeight: "230px" }} src="/static/images/avatar/1.jpg" />
            </div>
            <div className="student-hd-columns-1">
              <p>OPTION</p>
              <p>ACADEMIC YEAR</p>
              <p>CLASS</p>
              <p>NAMES</p>
              <p>REG N<sup>o</sup></p>
            </div>
            <div className="student-hd-columns-2">
              <p>:Ordinary Level</p>
              <p>:2021</p>
              <p>:Senior 4</p>
              <p>:<b>KARABYO Sonia</b></p>
              <p>:20187012</p>
            </div>
          </div>
          <div>
          </div>
        </div>

        {/* report body */}

        <div className='report-body'>
          <div className="doc-hd">STUDENT ACADEMIC REPORT</div>
          <div></div>
          <div className='report-table'>
            <table style={{ width: "100%" }} border={1}>
              <tr>
                <td rowSpan="2">COURSES</td>
                <td colSpan="3" style={{ textAlign: "center" }}>MAXIMUM</td>
                <td colSpan="4" style={{ textAlign: "center" }}>1<sup>st</sup>TERM</td>
                <td colSpan="4" style={{ textAlign: "center" }}>2<sup>nd</sup>TERM</td>
                <td colSpan="4" style={{ textAlign: "center" }}>3<sup>rd</sup>TERM</td>
                <td colSpan="4" style={{ textAlign: "center" }}>GENERAL TOTAL</td>
                <td width="2" rowSpan="3" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}>2<sup>nd</sup><br />sitting<br />(%)</td>
              </tr>

              <tr>
                <td style={{ textAlign: "center" }}>CAT</td>
                <td style={{ textAlign: "center" }}>EX</td>
                <td style={{ textAlign: "center" }}>TOT</td>


                <td>CAT</td>
                <td >EX</td>
                <td >TOT</td>
                <td >GR</td>


                <td >CAT</td>
                <td>EX</td>
                <td>TOT</td>
                <td>GR</td>

                <td >CAT</td>
                <td>EX</td>
                <td>TOT</td>
                <td>GR</td>

                <td ><b>MAX</b></td>
                <td style={{ textAlign: "right" }}>TOT</td>
                <td style={{ textAlign: "right" }}>%</td>
                <td style={{ textAlign: "center" }}>GR</td>
              </tr>

              <tr>
                <td>CONDUCT</td>
                <td style={{ textAlign: "right" }} colSpan="3">40</td>
                <td style={{ textAlign: "right" }} colSpan="4">32</td>
                <td style={{ textAlign: "right" }} colSpan="4">32</td>
                <td style={{ textAlign: "right" }} colSpan="4">32</td>


                <td ><b>120</b></td>
                <td style={{ textAlign: "right" }}>98</td>
                <td colSpan="2" style={{ textAlign: "right" }}>81.7%</td>
              </tr>
              <tr>
                <td bgcolor="#dadada" colSpan="21">
                  <p>PRINCIPAL SUBJECTS</p>
                </td>
              </tr>

              <tr>
                <td>History</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>Mathematics</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>Kinyarwanda</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>Biology</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>Physics</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>English</td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>60</b></td>
                <td style={{ textAlign: "center" }}><b>120</b></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>S</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>ICT</td>
                <td style={{ textAlign: "center" }}><b>50</b></td>
                <td style={{ textAlign: "center" }}><b>50</b></td>
                <td style={{ textAlign: "center" }}><b>100</b></td>

                <td style={{ textAlign: "center" }}>30.6</td>
                <td style={{ textAlign: "center" }}>25.0</td>
                <td style={{ textAlign: "center" }}>55.6</td>
                <td style={{ textAlign: "center" }}>D</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>Geography</td>
                <td style={{ textAlign: "center" }}><b>50</b></td>
                <td style={{ textAlign: "center" }}><b>50</b></td>
                <td style={{ textAlign: "center" }}><b>100</b></td>

                <td style={{ textAlign: "center" }}>30.6</td>
                <td style={{ textAlign: "center" }}>25.0</td>
                <td style={{ textAlign: "center" }}>55.6</td>
                <td style={{ textAlign: "center" }}>D</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td>French</td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>40</b></td>

                <td style={{ textAlign: "center" }}>10.6</td>
                <td style={{ textAlign: "center" }}>15.0</td>
                <td style={{ textAlign: "center" }}>25.6</td>
                <td style={{ textAlign: "center" }}>B</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>


              <tr>
                <td>Kiswahili</td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>40</b></td>

                <td style={{ textAlign: "center" }}>10.6</td>
                <td style={{ textAlign: "center" }}>15.0</td>
                <td style={{ textAlign: "center" }}>25.6</td>
                <td style={{ textAlign: "center" }}>B</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>


              <tr>
                <td>Religion</td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>40</b></td>

                <td style={{ textAlign: "center" }}>10.6</td>
                <td style={{ textAlign: "center" }}>15.0</td>
                <td style={{ textAlign: "center" }}>25.6</td>
                <td style={{ textAlign: "center" }}>B</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>


              <tr>
                <td bgcolor="#dadada" colSpan="21">
                  <p>ELECTIVE SKILLS SUBJECTS</p>
                </td>
              </tr>

              <tr>
                <td>Religion</td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>20</b></td>
                <td style={{ textAlign: "center" }}><b>40</b></td>

                <td style={{ textAlign: "center" }}>10.6</td>
                <td style={{ textAlign: "center" }}>15.0</td>
                <td style={{ textAlign: "center" }}>25.6</td>
                <td style={{ textAlign: "center" }}>B</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>



              <tr>
                <td bgcolor="#dadada" colSpan="21">
                  <p>CO-CURRICULAR ACTIVITIES</p>
                </td>
              </tr>

              <tr>
                <td>Physical<br />Education &<br />sport</td>
                <td style={{ textAlign: "center" }}><b>10</b></td>
                <td style={{ textAlign: "center" }}><b>10</b></td>
                <td style={{ textAlign: "center" }}><b>20</b></td>

                <td style={{ textAlign: "center" }}>6.6</td>
                <td style={{ textAlign: "center" }}>5.0</td>
                <td style={{ textAlign: "center" }}>11.6</td>
                <td style={{ textAlign: "center" }}>C</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>360</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>B</td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr height="3" style={{ minHeight: "15px" }}>
                <td bgcolor="#dadada" ><p></p></td>
                <td bgcolor="#dadada" colSpan="3"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" ></td>

              </tr>


              <tr>
                <td><b>TOTAL</b></td>
                <td style={{ textAlign: "center" }}><b>440</b></td>
                <td style={{ textAlign: "center" }}><b>440</b></td>
                <td style={{ textAlign: "center" }}><b>880</b></td>

                <td style={{ textAlign: "center" }}>6.6</td>
                <td style={{ textAlign: "center" }}>5.0</td>
                <td style={{ textAlign: "center" }}>11.6</td>
                <td style={{ textAlign: "center" }}></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}></td>

                <td style={{ textAlign: "center" }}><u>10.6</u></td>
                <td style={{ textAlign: "center" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}>E</td>

                <td style={{ textAlign: "left" }}><b>2640</b></td>
                <td style={{ textAlign: "right" }}><u>15.0</u></td>
                <td style={{ textAlign: "center" }}><u>25.6</u></td>
                <td style={{ textAlign: "center" }}></td>
                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>


              <tr height="3" style={{ minHeight: "15px" }}>
                <td bgcolor="#dadada" ><p></p></td>
                <td bgcolor="#dadada" colSpan="3"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" ></td>

              </tr>



              <tr>
                <td><b>PERCENTAGE</b></td>
                <td colSpan="3" style={{ textAlign: "right" }}><b></b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>70.82%</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>70.82%</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>70.82%</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>70.82%</b></td>


                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr>
                <td><b>POSITION</b></td>
                <td colSpan="3" style={{ textAlign: "right" }}><b></b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>21 OUF OF 41</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>21 OUF OF 41</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>21 OUF OF 41</b></td>

                <td colSpan="4" style={{ textAlign: "right" }}><b>21 OUF OF 41</b></td>



                <td width="2" style={{ fontSize: "8px", maxWidth: "30px", verticalAlign: "top" }}></td>
              </tr>

              <tr height="3" style={{ minHeight: "15px" }}>
                <td bgcolor="#dadada" ><p></p></td>
                <td bgcolor="#dadada" colSpan="3"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" colSpan="4"></td>
                <td bgcolor="#dadada" ></td>

              </tr>
              <tr>
                <td>Class teacher's<br/>Names &<br/>Comments</td>
                <td  colSpan="20"></td>
              </tr>

            </table>
            </div>

            <div></div>
            <div className="report-ft">
              <table >
                <tr>
                  <td style={{ textAlign: "center" }} rowSpan="7"><b><u>DECISION TAKEN</u></b></td>
                </tr>
                <tr>

                  <td colSpan="2"><u> 1 <sup>st</sup> SESSION</u></td>
                                      
                  <td colSpan="2"><u> 2 <sup>nd</sup> SESSION</u></td>
                  
                  <td style={{ textAlign: "center" }} ><b>Martin M, MASABO</b></td>
                    

                </tr>

                <tr>
                  <td>PROMOTED</td>
                    <td><input type="checkbox"/></td>   
                  <td>PROMOTED</td>
                    <td><input type="checkbox"/></td>  
                  <td style={{ textAlign: "center" }} >Head Master</td>              
                </tr>
                <tr>
                  <td>PROMOTED ELSEWHERE</td>
                    <td><input type="checkbox"/></td>            
                </tr>
                <tr>
                  <td>2<sup>nd</sup>SITTING</td>
                    <td><input type="checkbox"/></td>   
                  <td>REPEAT</td>
                    <td><input type="checkbox"/></td>              
                </tr>
                <tr>
                  <td>REPEAT</td>
                    <td><input type="checkbox"/></td>    
                    <td></td> <td></td> 
                  <td style={{ textAlign: "center" }} >SIGNATURE & STAMP</td>       
                </tr>
                <tr>
                  <td>DISCONTINUED</td>
                    <td><input type="checkbox"/></td>     
                </tr>  



                </table>
          </div>
          <div className="grade">
            <table border="1">
              <tr>
                <th style={{ textAlign: "left" }}>Grade</th>
                <th style={{ textAlign: "left" }}>B</th>
                <th style={{ textAlign: "left" }}>C</th>
                <th style={{ textAlign: "left" }}>D</th>
                <th style={{ textAlign: "left" }}>E</th>
                <th style={{ textAlign: "left" }}>S</th>
                <th style={{ textAlign: "left" }}>F</th>
              </tr>

              <tr>
                <th style={{ textAlign: "left" }}>SCORE RANGE</th>
                <th style={{ textAlign: "left" }}>100-80</th>
                <th style={{ textAlign: "left" }}>79-70</th>
                <th style={{ textAlign: "left" }}>69-60</th>
                <th style={{ textAlign: "left" }}>59-40</th>
                <th style={{ textAlign: "left" }}>49-30</th>
                <th style={{ textAlign: "left" }}>29-0</th>
              </tr>
            </table>
          </div>
        </div>

      </div>
    );
  }
}
export class index extends Component {
  render() {
    return (
      <div>
        <ReactToPrint
          trigger={() => <button className="print-btn"> Print This School Report <PrintIcon/></button>}
          content={() => this.componentRef}
        />
        <ComponentToPrint ref={(el) => (this.componentRef = el)} />
      </div>
    )
  }
}

const mapStateToProps = (state) => ({

})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(index)
