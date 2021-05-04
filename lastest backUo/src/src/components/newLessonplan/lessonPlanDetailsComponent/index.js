import React, {useState, useEffect} from 'react'
import { connect } from 'react-redux'
import './style.css'
import https from '../../../helpers/https'
import { Accordion, Card } from 'react-bootstrap'
import { makeStyles, withStyles } from '@material-ui/core/styles';
import 'bootstrap/dist/css/bootstrap.min.css'
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import InputBase from '@material-ui/core/InputBase';
import { AiFillPrinter } from "react-icons/ai";
import Popup from '../../popup/index'
import PrintlessonPlan from './PrintLessonPlan'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }));
  




export const Index = (props) => {
    const [isLoading, setIsLoading] = useState(true);
    const classes = useStyles();
    const [subject , setSubject] = useState('')
    const [subjects, setSubjects] = useState(null)
    const [openPopup, setOpenPopup] = useState(false)
    const [openPrintPopup, setOpenPrintPopup] = useState(false)
    const [recordForEdit, setRecordForEdit] = useState(null)


    const handleChange = (event) => {
        setSubject(event.target.value);
      };
    
      
    
    const openInPopup = () => {
        setRecordForEdit(props.data)
        setOpenPopup(true)
    }

useEffect(() => {
    
    async function fetchSubjects() {
        const req = await https
          .get(`/lessons/subjects`, {
            headers: { Authorization: `Basic ${localStorage.token}` },
          })
          .then((res) => {
            setSubjects(res.data);
          })
          .catch(function (err) {
            console.log(err);
          });
        return req;
      }
      fetchSubjects();
}, [])


    return (
      <>
      <div className="select-subject"> 
      <button onClick={() => openInPopup(subject)} style={{maxWidth: "250px"}} className="check-btn-2"> <AiFillPrinter/> &nbsp;Print Lesson Plan</button>
      </div>
          <div className="plan-container">
              <div className="titl">
                  <h1>Syllabus</h1>
                  <div className='titl2'><h4>1. Topic Area:</h4><h5>Trigonometry</h5></div>
                  <div className='titl2'><h4>2. Sub Topic Area:</h4><h5>Sed ut perspiciatis undeomnis iste natus error sit voluptatem</h5></div>
                  <div className='titl2'><h4>3. Unit:</h4><h5>Sed ut perspiciatis unde omnis iste</h5></div>
                  <div className='titl2'><h4>4. Unit Competency:</h4><h5>Key Unit Competency: Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium,</h5></div>
              </div>
              <div className="titl">
                  <h1>Instructional Objective</h1>
              </div>
              <Accordion defaultActiveKey="0">
                  <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                          1.Syllabus Unit Content
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                          <Card.Body>
                              <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                              <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                              <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                          </Card.Body>
                      </Accordion.Collapse>
                  </Card>
                  <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                          2.Expecting student action(s)/standard & Criteria Performance
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                          <Card.Body>
  
                              <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                              <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                              <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
  
                          </Card.Body>
                      </Accordion.Collapse>
                  </Card>
                  <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                          3.Instructional Material & References
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                          <Card.Body>
                              <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                              <div className="in-card-title"><h4>Attitude:</h4><h5> Sed ut perspiciatis </h5></div>
                              <div className="in-card-title"><h4>Skills:</h4><h5> Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                          </Card.Body>
                      </Accordion.Collapse>
                  </Card>
              </Accordion>
              <div className="titl">
                  <h1>Teaching Activity</h1>
              </div>
              <Accordion defaultActiveKey="0">
                  <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                          Introduction: 10 min
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                          <Card.Body>
                              <div className="in-card-title"><h4>Content Focus:</h4><h5>Live Lecturing Assigned Reading/Text </h5></div>
                              <div className="in-card-title"><h4>Interactivity Focus:</h4><h5> Sed ut perspiciatis </h5></div>
                              <div className="in-card-title"><h4>Critical Thinking: Production: Problem Solving: Reflection:</h4><h5></h5></div>
                         </Card.Body>
                      </Accordion.Collapse>
                  </Card>
                  <Card>
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                      Development: 20 min
                      </Accordion.Toggle>
                          <Accordion.Collapse eventKey="1">
                              <Card.Body>Hello! I'm another body</Card.Body>
                          </Accordion.Collapse>
                  </Card>
                      <Card>
                          <Accordion.Toggle as={Card.Header} eventKey="2">
                              Conclusion: 10 min
                      </Accordion.Toggle>
                          <Accordion.Collapse eventKey="2">
                              <Card.Body>Hello! I'm another body</Card.Body>
                          </Accordion.Collapse>
                      </Card>
              </Accordion>
                  <div className="titl">
                      <h1>Learning Activities</h1>
                  </div>
                  <Accordion defaultActiveKey="0">
                      <Card>
                          <Accordion.Toggle as={Card.Header} eventKey="0">
                              Introduction: 10 min
                      </Accordion.Toggle>
                          <Accordion.Collapse eventKey="0">
                              <Card.Body> </Card.Body>
                          </Accordion.Collapse>
                      </Card>
                      <Card>
                          <Accordion.Toggle as={Card.Header} eventKey="1">
                              Development: 20 min
                      </Accordion.Toggle>
                          <Accordion.Collapse eventKey="1">
                              <Card.Body>
                                  <div className="in-card-title"><h4>Knowledge:</h4><h5>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo Attitude: Sed ut perspiciatis Skills: Sed ut perspiciat unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo</h5></div>
                              </Card.Body>
                          </Accordion.Collapse>
                      </Card>
                      <Card>
                          <Accordion.Toggle as={Card.Header} eventKey="2">
                              Conclusion: 10 min
                      </Accordion.Toggle>
                          <Accordion.Collapse eventKey="2">
                              <Card.Body>Hello! I'm another body</Card.Body>
                          </Accordion.Collapse>
                      </Card>
                  </Accordion>
          </div>
  
  
          <Popup
                          title="Lesson Plan"
                          print={true}
                          openPopup={openPopup}
                          setOpenPopup={setOpenPopup}>
                          <PrintlessonPlan recordForEdit={recordForEdit} />
                      </Popup>
  
          </>)
}

const mapStateToProps = (state) => ({

            })

const mapDispatchToProps = {

            }

export default connect(mapStateToProps, mapDispatchToProps)(Index)
