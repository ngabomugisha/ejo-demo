import React from 'react'
import './Index.css'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Button } from '@material-ui/core';
import zIndex from '@material-ui/core/styles/zIndex';

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        marginTop: '-5px',
        width: 200,
        
    },
    formControl: {
        margin: theme.spacing(0),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(0),
    },
}));


function Index() {
    const classes = useStyles()
    const [term, setTerm] = React.useState('')
    const handleChange = (event) => {
        setTerm(event.target.value)
    };
    return(
        <div className="body-container">
            <div className='select-field'>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel id="demo-simple-select-outlined-label">Receivers</InputLabel>
                    <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        value={term}
                        onChange={handleChange}
                        label="Receivers"
                        color="primary"
                    >
                        <MenuItem value="">
                            <em>None</em>
                        </MenuItem>
                        <MenuItem value={"First Term"}>All Parents</MenuItem>
                        <MenuItem value={"Second Term"}>James</MenuItem>
                        <MenuItem value={"Third Term"}>Robert</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <div className="text-field">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Topic"
                    type="text"
                    color="primary"
                    placeholder="Payment of School Fee."
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
            </div>
            <div className="msg-field">
                <TextField
                    id="outlined-basic"
                    variant="outlined"
                    label="Message"
                    type="text"
                    placeholder=" "
                    color="primary"
                    multiline={true}
                    rowsMax="10"
                />
            </div>
            <div className="send-btn">
                <Button color='primary' className="btn-next" size="large"
                    style={{
                        borderRadius: 5,
                        backgroundColor: "#1f75c6",
                        padding: "7px 15px",
                        fontSize: "15px",
                        color: "#fff",
                        width: '200px',
                        textTransform: 'capitalize'
                    }}
                >
                    Send
                </Button>
            </div>
        </div>
    )
}

export default Index
