import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { connect } from 'react-redux'
import './style.css'
import ReactToPrint from "react-to-print";
import PrintIcon from '@material-ui/icons/Print';
import { handleFetchSchool } from '../../../store/actions/schools.actions'
import { handleFetchSubject } from '../../../store/actions/subjects.actions'
import {handleFetchClassStudent} from '../../../store/actions/student.actions'
import {handleFetchClasses} from '../../../store/actions/classes.actions'
import Button from 'react-bootstrap/Button'
import 'bootstrap/dist/css/bootstrap.min.css'


const thStyle = {
  fontFamily: "Anton",
  fontWeight: "normal",
  fontStyle: "normal"
};


class ComponentToPrint extends React.Component {
  constructor(props) {
    super(props)
  }
  render() {
    let less = null
    if (this.props.data) {
      less = this.props.data
    } else {
      alert("please select subject first")

    }
    const introKeys = Object.keys(less.teachingTechniques.introduction)
    const introValues = Object.values(less.teachingTechniques.introduction)

    const devKeys = Object.keys(less.teachingTechniques.development)
    const devValues = Object.values(less.teachingTechniques.development)

    const concKeys = Object.keys(less.teachingTechniques.conclusion)
    const concValues = Object.values(less.teachingTechniques.conclusion)

    // const intro = []
    // Object.entries(less.teachingTechniques.introduction).forEach(([key, value]) => intro.push(`${key}: ${Object.entries(value)}`))
    // console.log('$$$$#######@@@@@@!!!!!!!!:',intro)
    let teac = []
    const forRender = (k, v) => {
      if (k && v)
        for (var i = 0; i < k.length - 1; i++) {
          if (v[i][0])
            if (k[i] == "contentFocus")
              teac.push(`Content focus` + ` :  ` + v[i][0]['item'])
            else if (k[i] == "interactiveFocus")
              teac.push("Interactive focus" + " : " + v[i][0]['item'])
            else if (k[i] == "criticalThinking")
              teac.push("Critical thinking" + " : " + v[i][0]['item'])
            else if (k[i] == "production")
              teac.push("Production" + " : " + v[i][0]['item'])
            else if (k[i] == "problemSolving")
              teac.push("Problem solving" + " : " + v[i][0]['item'])
            else if (k[i] == "reflection")
              teac.push("Reflection" + " : " + v[i][0]['item'])
            else if (k[i] == "sitingArrangement")
              teac.push("Siting arrangement" + " : " + v[i][0]['item'])
        }
    }


    return (
      <div className="print-lessonPlan-container">
        <div className="print-lp-hd">
          <h4>School Name :  {this.props.school} </h4>
          <h4>Teacher's Name : {this.props.teacher.firstName} {this.props.teacher.lastName}</h4>
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
              <td>{!less ? "" : !less.time ? "" : (less.time.day).substring(0, (less.time.day).indexOf('T'))}</td>
              <td>{!less ? "" : !less.subject ? "" : this.props.subjects.reduce(function (fit, condition) {
                if (condition._id == less.subject) {
                  let keyUnit = condition.name;
                  fit = keyUnit;
                }
                return fit;
              }, "")}</td>
              <td>{this.props.classes && this.props.classes.reduce(function (fit, condition) {
                if (condition._id == less.class) {
                  let keyUnit = `${condition.level && condition.level.name} ${condition.combination && condition.combination.name} ${condition.label}`;
                  fit = keyUnit;
                }
                return fit;
              }, "")}</td>
              <td>{`1`}</td>
              <td>{`1 of 4`}</td>
              <td>{less.teachingTechniques.introduction.duration + less.teachingTechniques.development.duration + less.teachingTechniques.conclusion.duration} Minutes</td>
              <td>{less.classSize}</td>
            </tr>

            <tr>
              <td colSpan="4">Type of Special Education needs to be catered for in this lesson and numbers in each category</td>
              <td colSpan="4">{this.props.permanentHealthConditions && this.props.permanentHealthConditions.map(i => (<p>{i}</p>))}</td>
            </tr>

            <tr>
              <td colSpan="2">Lesson plan name</td>
              <td colSpan="6">{less && less.lessonName}</td>
            </tr>

            <tr>
              <td colSpan="8">
                <h4 style={{ fontWeight: "bold" }}>Learning Objectives</h4>
                <h6>knowledge :</h6>
                <p>{less.knowledge.topics.map(item => (<li>{item.topic}</li>))}</p>

                <h6>Skills :</h6>
                <p>{less.skills.topics.map(item => (<li>{item.topic}</li>))}</p>

                <h6>attitudes And Values :</h6>
                <p>{less.attitudesAndValues.topics.map(item => (<li>{item.topic}</li>))}</p>

              </td>
            </tr>

            <tr>
              <td colSpan="2">Plan for this class</td>
              <td colSpan="6">{less.teachingTechniques.introduction.contentFocus.length > 0 ? less.teachingTechniques.introduction.contentFocus[0]['item'] === "FIELD-VISIT" ? 'Outdoor' : 'In classroom' : ""}</td>
            </tr>

            <tr>
              <td colSpan="2">Learning Materials</td>
              <td colSpan="6">{less.knowledge.instructionalMaterial.map(i => i.items.map(item => (item.item + " ,")))}</td>
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
              <th>Teaching Techniques</th>
              <th>Learner activities</th>
              <th>Generic Competences and cross-cutting issues to be addressed</th>
            </tr>

            <tr>
              <td><h4>Introduction:</h4><p>{less.teachingTechniques.introduction.duration} Min</p></td>
              <td>{forRender(introKeys, introValues)}{teac && teac.map(i => (<p>{i}</p>))}</td>
              <td>{less.activities.introduction.content.activities.map(i => i.activity)}</td>
              <td>
                <li style={{ fontWeight: "700", fontSize: "large" }}>Competency :</li>{less.activities.introduction.competency.competencies.map(i => i.competency)}<br />
                <li style={{ listStyleType: "circle", }}><i><u>Comments:</u></i> <p style={{ textDecoration: "none" }}>{less.activities.introduction.competency.comment}</p><br /><br /></li>
                <li style={{ fontWeight: "700", fontSize: "large" }}>CrossCutting Issues :</li>{less.activities.introduction.crossCuttingIssues.issues.map(i => i.issue)}<br />
              </td>

            </tr>
            <tr>
              <td><h4>Development:</h4><p>{less.teachingTechniques.development.duration} Min</p></td>
              <td>{forRender(devKeys, devValues)}{teac && teac.map(i => (<p>{i}</p>))}</td>
              <td>{less.activities.development.content.activities.map(i => i.activity)}</td>
              <td>
                <li style={{ fontWeight: "700", fontSize: "large" }}>Competency :</li>{less.activities.development.competency.competencies.map(i => i.competency)}<br />
                <li style={{ listStyleType: "circle", }}><i><u>Comments:</u></i> <p style={{ textDecoration: "none" }}>{less.activities.development.competency.comment}</p><br /><br /></li>
                <li style={{ fontWeight: "700", fontSize: "large" }}>CrossCutting Issues :</li>{less.activities.development.crossCuttingIssues.issues.map(i => i.issue)}<br />
              </td>

            </tr>
            <tr>
              <td><h4>Conclusion:</h4><p>Summary and assessment {less.teachingTechniques.conclusion.duration} Min</p></td>
              <td>{forRender(concKeys, concValues)}{teac && teac.map(i => (<p>{i}</p>))}</td>
              <td>{less.activities.conclusion.content.activities.map(i => i.activity)}</td>
              <td>
                <li style={{ fontWeight: "700", fontSize: "large" }}>Competency :</li>{less.activities.conclusion.competency.competencies && less.activities.conclusion.competency.competencies.map(i => i.competency)}<br />
                <li style={{ listStyleType: "circle", }}><i><u>Comments:</u></i> <p style={{ textDecoration: "none" }}>{less.activities.conclusion.competency.comment}</p><br /><br /></li>
                <li style={{ fontWeight: "700", fontSize: "large" }}>CrossCutting Issues :</li>{less.activities.conclusion.crossCuttingIssues.issues && less.activities.conclusion.crossCuttingIssues.issues.map(i => i.issue)}<br />
              </td>

            </tr>
            <tr>
              <td><h4>Teacher self-evaluation:</h4><p></p></td>
              <td colSpan={3}></td>

            </tr>
            <tr>
              <td><h4>Students Feedback:</h4><p></p></td>
              <td colSpan={3}></td>

            </tr>

          </table>


        </div>
      </div>
    );
  }
}



export function Index(props) {
  let componentRef = useRef()
  const dispatch = useDispatch();
  let schl = null
  let role = null
  if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { schl = props.state.auth.user.school; role = props.state.auth.user.role } }


  const f =[]
  const [subjects, setSubjects] = useState([])
  const [classses, setClassses] = useState([])
  const [students, setStudents] = useState([])
  const { list: PLAN } = useSelector((state) => state.lessonPlans);
  const { user } = useSelector((state) => state.auth)
  const { list: schools } = useSelector((state) => state.schools)
  const school = schools.reduce(function (fit, condition) {
    if (condition._id == user.school) {
      let keyUnit = condition.name;
      fit = keyUnit;
    }
    return fit;
  }, "")
  useEffect(() => {
    props.handleFetchClasses(schl)
    if(props.classesList)
      setClassses(props.classesList)

    props.handleFetchSubject()
    if (props.subjectsList)
      setSubjects(props.subjectsList)

    if(props.lessonPlan.class)
      props.handleFetchClassStudent(props.lessonPlan.class)

    if(props.studentsList)
      setStudents(props.studentsList)
  }, [])
    if(students){
      const permanent = students.reduce(function(res, con){
        if(true)
        {
          let a = con.permanentHealthConditions && con.permanentHealthConditions.map(i => i.condition)
          res.push(a)
        }
        return(res)
      },[])
        const flatList = permanent !== null ? permanent.map(item => item.map(i => {
                f.push(i)
            })): null
    }
    // const finalList = f.filter((value,index)=> f.indexOf(value) === index)
  return (
    <div>
      <ReactToPrint
        trigger={() => <Button className="check-btn"> Print This Lesson Plan <PrintIcon /></Button>}
        content={() => componentRef}
      />
      <ComponentToPrint ref={(el) => (componentRef = el)} data={props.lessonPlan} school={school} teacher={user} subjects={subjects} classes={classses} permanentHealthConditions={f.filter((value,index)=> f.indexOf(value) === index)}/>
    </div>
  )

}

const mapStateToProps = (state) => {
  const { auth } = state
  const { list: schools } = state
  const user = auth.user
  const { subjects } = state
  const subjectsList = subjects.list
  const {classes} = state
  const classesList = classes.list
  const {students} = state
  const studentsList = students.list
  return {
    state, user, schools, subjectsList, classesList, studentsList
  }
}


const mapDispatchToProps = dispatch => ({
  handleFetchSchool: async () => {
    await dispatch(handleFetchSchool())
  },
  handleFetchSubject: async () => {
    await dispatch(handleFetchSubject())
  },
  handleFetchClassStudent: async (clas) => {
    await dispatch(handleFetchClassStudent(clas))
  },
  handleFetchClasses: async (school) => {
    await dispatch(handleFetchClasses(school))
  }
})


export default connect(mapStateToProps, mapDispatchToProps)(Index)
