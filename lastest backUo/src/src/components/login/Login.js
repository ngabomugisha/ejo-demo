import React from 'react'
import './Login.css'
import TextField from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';
import {
    fade,
    ThemeProvider,
    withStyles,
    makeStyles,
    createMuiTheme,
} from '@material-ui/core/styles';
import InputBase from '@material-ui/core/InputBase';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { green } from '@material-ui/core/colors';


const CssTextField = withStyles({
    root: {
        '& label.Mui-focused': {
            color: 'green',
            backgroundColor: 'white'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: 'green',
        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: 'blue',
                backgroundColor: 'red'
            },
            '&:hover fieldset': {
                borderColor: 'yellow',
            },
            '&.Mui-focused fieldset': {
                borderColor: 'green',
            },
        },
    },
})(TextField);

function Login(props) {
    const classes = useStylesReddit();
    return (
        <div>
            <div className="login-form">
                <div className="login-field">
                    {/* <TextField
                label="Email"
                id="mui-theme-provider-outlined-input"
                defaultValue=""
                variant="outlined"
                size="small"
                color="primary"
                type='email'
            /> */}
                    <CssTextField
                        className={classes.margin} variant="outlined"
                        size="small"
                        label="Email"
                        color="primary"
                        type='email'
                        id="custom-css-outlined-input"
                    />
                </div>
                <div className="login-field">
                    {/* <TextField
                        label="Password"
                        id="outlined-size-small"
                        defaultValue=""
                        variant="outlined"
                        size="small"
                        type='password'
                    /> */}
                </div>
                <Button className='login-btn'
                    style={{
                        borderRadius: 5,
                        backgroundColor: "#fff",
                        padding: "8px 26px",
                        fontSize: "14px",
                        width: '120px',
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
