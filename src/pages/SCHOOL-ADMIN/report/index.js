import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './style.css'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import { Grid, Paper } from '@material-ui/core'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import https from '../../../helpers/https'
import TextField from '@material-ui/core/TextField';
import { Formik, Field, Form } from 'formik'
import { handleFetchTerms, handleUpdateTerm } from '../../../store/actions/term.action'
import { useDispatch, useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));

export const Index = (props) => {
    const classes = useStyles();
    const { list: ALL_TERMS } = useSelector((state) => state.terms);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const [start, setStart] = useState('')
    const [end, setEnd] = useState('')
    const [term1, setTerm1] = useState(null)
    const [term2, setTerm2] = useState(null)
    const [term3, setTerm3] = useState(null)
    const [updateData, setUpdateData] = useState({})

    const fetchTermsData = async () => {
        try {
            await dispatch(handleFetchTerms());
        } catch (error) {
            console.log(error)
        } finally {

            setIsLoading(false)
        }
    };

    const submitData = async (id, name) => {
        console.log('id form', id)
        const data = {
            'name': name,
            'starts': term1.starts,
            'ends': term1.ends
        }
        console.log('this is data to pass', data, typeof (data))
        try {
            setIsLoading(true)
            await dispatch(handleUpdateTerm(id, data));
            setTimeout(() => {
                fetchTermsData()
            }, 2000);
        } catch (error) {
            console.log(error)
        }
        // https.put(`/terms/${id}`, data, { headers: { 'Authorization': `Basic ${localStorage.token}` } })

    }

    const onChange_start = (e) => {
        if (e.target.name === 'Term 1') {
            setTerm1({ ...term1, 'starts': e.target.value })
            console.log('data from term1', term1)
        }
        else if (e.target.name === 'Term 2') {
            setTerm1({ ...term2, 'starts': e.target.value })
            console.log('data from term2', term1)
        }

        else if (e.target.name === 'Term 3') {
            setTerm1({ ...term3, 'starts': e.target.value })
            console.log('data from term3', term1)
        }
    }

    const onChange_end = (e) => {
        if (e.target.name === 'Term 1') {
            setTerm1({ ...term1, 'ends': e.target.value })
            console.log('data from term1', term1)
        }
        else if (e.target.name === 'Term 2') {
            setTerm1({ ...term2, 'ends': e.target.value })
            console.log('data from term2', term1)
        }

        else if (e.target.name === 'Term 3') {
            setTerm1({ ...term3, 'ends': e.target.value })
            console.log('data from term3', term1)
        }
    }
    useEffect(() => {
        fetchTermsData()

    }, [])

    useEffect(() => {

        fetchTermsData()
    }, [dispatch])
    useEffect(() => {
        if (term1 == null || term2 == null || term3 == null) {
            setTerm1(ALL_TERMS[0])
            setTerm2(ALL_TERMS[1])
            setTerm3(ALL_TERMS[2])
        }
    }, [ALL_TERMS])
    console.log(ALL_TERMS);

    return (
        <div>

            <PanelLayout selected={8} role={props.state.auth.user.role}>
                <div className="report-container">
                    <div className="report-hd">
                        <h3>Report</h3>
                    </div>


                </div>
            </PanelLayout>
        </div>
    )
}

const mapStateToProps = (state) => ({
    state: state
})

const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Index)
