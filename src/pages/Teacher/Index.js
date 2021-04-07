import React, { useState, useEffect } from "react";
import "./style.css";
import https from "../../helpers/https"
import { connect, useDispatch, useSelector } from "react-redux";
import PanelLayout from "../../components/Layouts/PanelLayout/Index";
import Feed from "../../components/feed/Feed";
import { useHistory } from "react-router-dom";
import Mixed from "../../components/feedCards/Mixed";
import { makeStyles } from "@material-ui/core/styles";
import {handleFetchTeacherData, handleSetTeacherData} from '../../store/actions/data/teacher.data.actions'

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function Main(props) {

  const SELECTED = useSelector(state => state.teacherData)
  const dispatch = useDispatch()
    const teacher = props.auth.user._id;
    console.log("TEACHER",teacher)
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [classs, setClasss] = React.useState("");
  const [clas, setClas] = React.useState("");
  const [subject, setSubject] = React.useState("");
  const [sub, setSub] = React.useState("");
  const [topic, setTopic] = React.useState("");
  const [top, setTop] = React.useState("");
  const [subTopic, setSubTopic] = React.useState("");
  const [subTop, setSubTop] = React.useState("");
  const [unit, setUnit] = useState("")
  const [uni, setUni] = useState("")
 
  const history = useHistory();
  const [page, setPage] = useState(null);


  let classSelected = null
  let subjectSelected = null
  let topicSelected = null
  let subTopSelected = null
  let unitSelected = null

  if (SELECTED != undefined && SELECTED.data != undefined) {
    classSelected = (SELECTED.data.class)
    subjectSelected = (SELECTED.data.subject)
    topicSelected = (SELECTED.data.topic)
    subTopSelected = (SELECTED.data.subtopic)
    unitSelected = (SELECTED.data.unit)
  }

  const fetchClasses = async () => {
    const req = await https.get(`/class-teachers/${teacher}/teacher-classes`, { headers: { 'Authorization': `Basic ${localStorage.token}` } })
        .then((res) => {
            console.log("CLASSES",res.data)
            setClasss(res.data)
        }).catch(function (err) {
            console.log(err);
        });
    return req
}

  useEffect(() => {

    fetchClasses()
    setSubject()

    if(classSelected) setClas(classSelected)
    if(subjectSelected) setSub(subjectSelected)
    if(topicSelected) setTop(topicSelected)
    if(subTopSelected) setSubTop(subTopSelected)
    if(unitSelected) setUni(unitSelected)
}, [])

  return (
    <>
      {sessionStorage.getItem("isloggedin") ? (
        <PanelLayout selected={1} role={props.auth.user.role}>
         
          <Feed>
            <Mixed DATA={uni}/>
          </Feed>
        </PanelLayout>
      ) : (
        history.replace("/")
      )}
    </>
  );
}

function mapStateToProps(state){
  const {auth} = state
  const {teacherData} = state
  return{
      auth : auth,
      teacherData : teacherData
  }
}

const mapDispatchToProps =  ({
  handleFetchTeacherData,
  handleSetTeacherData
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);
