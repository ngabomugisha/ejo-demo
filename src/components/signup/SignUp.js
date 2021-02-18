import React from 'react'
import './SignUp.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

function SignUp() {
    return (
        <div>
            <div className="register-form">
            <div className="register-field">
            <TextField
                label="first Name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                color="primary"
                type='email'
            />
            </div>
            <div className="register-field">
            <TextField
                label="last name"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                color="primary"
                type='email'
            />
            </div>
            <div className="register-field">
            <TextField
                label="Email"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                color="primary"
                type='email'
            />
            </div>
            <div className="register-field">
            <TextField
                label="Password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type='password'
            />
            </div>
            <div className="register-field">
            <TextField
                label="Confirm-Password"
                id="outlined-size-small"
                variant="outlined"
                size="small"
                type='password'
            />
            </div>
            <Button className='register-btn'
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
                Sign Up
            </Button>
            </div>
        </div>
    )
}

export default SignUp
