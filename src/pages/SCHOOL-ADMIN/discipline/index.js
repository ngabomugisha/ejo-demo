import React, { useEffect } from 'react'
import { connect,useSelector } from 'react-redux'
import './style.css'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Table from './Table'
import { Button, Paper, TextField } from '@material-ui/core'
import Discipline from './Discipline'
import {handleFetchDisciplines, handleUpdateDiscipline} from '../../../store/actions/discipline.actions'

export const Index = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined) { if (props.state.auth.user != undefined) { school = props.state.auth.user.school; role = props.state.auth.user.role } }

    useEffect(() => {
        props.handleFetchDisciplines()
    }, [])
    return (
        <div>

            <PanelLayout selected={5} role={role}>
                <div className="report-hd">
                    <h3>Discipline settings</h3>
                </div>
                <div className="discipline-container">

                    <Discipline  />

                </div>
            </PanelLayout>
        </div>
    )
}


const mapStateToProps = (state) => {
    const { discipline } = state
    const list = discipline.list
    return {
        state, list
    }
}

const mapDispatchToProps = dispatch => ({
    handleFetchDisciplines: async () => {
        await dispatch(handleFetchDisciplines())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(Index)
