import React from 'react'
import { connect } from 'react-redux'
import './style.css'
import PanelLayout from '../../../components/Layouts/PanelLayout/Index'
import Table from './Table'
import { Button, Paper, TextField } from '@material-ui/core'

export const index = (props) => {
    let school = null
    let role = null
    if (props.state.auth != undefined){if(props.state.auth.user != undefined) {school = props.state.auth.user.school; role = props.state.auth.user.role}}
    return (
        <div>
            
            <PanelLayout selected={5} role={role}>
                        <div className="report-hd">
                            <h3>Terms settings</h3>
                        </div>
                <div className="discipline-container">
                    
                <div className='hd-1'>

</div>
                <Paper className='item' elevation={0}>

                    <div className='dsci'>
                        <h3>key word 1</h3>
                        <TextField
                        defaultValue="40"
                        />
                        <Button>
                            edit
                        </Button>
                    </div>

                </Paper>
                <Paper className='item' elevation={0}>

                    <div className='dsci'>
                        <h3>key word 1</h3>
                        <TextField
                        value="40"
                        />
                        <Button>
                            edit
                        </Button>
                    </div>

                </Paper>
                <Paper className='item' elevation={0}>

                    <div className='dsci'>
                        <h3>key word 1</h3>
                        <TextField
                        value="40"
                        />
                        <Button>
                            edit
                        </Button>
                    </div>

                </Paper>

                <div className="btn-save-disc">
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

export default connect(mapStateToProps, mapDispatchToProps)(index)
