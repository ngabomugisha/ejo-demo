import React, { useState, useEffect } from 'react'
import './Index.css'
import { connect } from 'react-redux'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { handleFetchQuestion } from '../../../store/actions/question.actions'
import { useDispatch, useSelector } from 'react-redux';
import QuestionTable from '../../../components/parts/QuestionTable'
import https from '../../../helpers/https'


export const Index = (props) => {

    const school = props.state.auth.user.school;
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { list: ALL_QUESTION } = useSelector((state) => state.questions);
    const [subject, setSubject] = React.useState([])

    const headCells = [
        { id: 'question', label: 'Question' },
        { id: 'subject', label: 'Subject' },
        { id: 'unit', label: 'Unit' },
        { id: 'type', label: 'Question-Types' },
        { id: 'actions', label: 'Actions', disableSorting: true }
    ]
    
    //get student from selected class
    const fetchQuestionData = async () => {
        try {
            await dispatch(handleFetchQuestion("602c349dfd1613203834880d"));
        } catch (error) {
            alert(error)
        } 
    };

    async function fetchSubjects() {
        const req = await https.get(`/lessons/subjects`, { headers: { 'content-type' : 'application/json', 'Authorization': `Basic ${localStorage.token}` } })
            .then((res) => {
                setSubject(res.data)
                console.log("SUBJECTS : ", res.data)
            }).catch(function (err) {
                console.log(err);
            });
        return req
    }

    useEffect(() => {
        fetchQuestionData();
        fetchSubjects()
    }, []);
    console.log('data from ALL_QUESTION',ALL_QUESTION)

    setTimeout(() => {
        console.log('after timed out ',ALL_QUESTION)
        setIsLoading(false)
    }, 1000);

console.log('data from localstorage',JSON.parse(localStorage.getItem("students")))
    return (
        <>
            <PanelLayout selected={7} role={props.state.auth.user.role}>

        {ALL_QUESTION.length > 0 ?
            <QuestionTable data={ALL_QUESTION} head={headCells}/>:
            // console.log(ALL_QUESTION):
            <h3>loading......</h3>
        }
                  

            </PanelLayout>
        </>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
