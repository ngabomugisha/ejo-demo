import React from 'react'
import './Login.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

function Login() {
    return (
        <div>
            <div className="login-form">
            <div className="login-field">
            <TextField
                label="Email"
                id="mui-theme-provider-outlined-input"
                defaultValue=""
                variant="outlined"
                size="small"
                color="primary"
                type='email'
            />
            </div>
            <div className="login-field">
            <TextField
                label="Password"
                id="outlined-size-small"
                defaultValue=""
                variant="outlined"
                size="small"
                type='password'
            />
            </div> 
            <Button  className='login-btn' 
                style={{
                    borderRadius: 5,
                    backgroundColor: "#fff",
                    padding: "8px 26px",
                    fontSize: "14px",
                    width:'120px',
                    textTransform: 'capitalize'
                }}
                variant="contained"
            >
                Sign In
            </Button>
            </div>
        </div>
    )
}

export default Login
