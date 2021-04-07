import React from 'react'
import { Button, makeStyles } from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
        minWidth: 0,
        margin: theme.spacing(0.5)
    },
    secondary: {
        backgroundColor: theme.palette.secondary.dark,
        '& .MuiButton-label': {
            color: theme.palette.secondary.main,
        },
        '&:hover':{

            color: 'red',
            backgroundColor: '#f35b5b',
        }
    },
    primary: {
        backgroundColor: "#1f72c7",
        color: "red",
        '& .MuiButton-label': {
            color: theme.palette.primary.main,
        }
    },
}))

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
        <Button
            className={`${classes.root} ${classes[color]}`}
            onClick={onClick}>
            {children}
        </Button>
    )
}
