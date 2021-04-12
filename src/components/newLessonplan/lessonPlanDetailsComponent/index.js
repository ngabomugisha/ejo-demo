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


    return(
    <div>
    <div className="select-subject"> 
    <button onClick={() => openInPopup(subject)} style={{maxWidth: "250px"}} className="check-btn-2"> <AiFillPrinter/> &nbsp;Print Lesson Plan</button>
    </div>
        <div className="plan-container">
            <div className="titl">
                <h1>Syllabus</h1>
            </div>
            <p>......................</p>
            </div>
    </div>)
}

const mapStateToProps = (state) => ({
  state: state
            })

const mapDispatchToProps = {

            }

export default connect(mapStateToProps, mapDispatchToProps)(Index)