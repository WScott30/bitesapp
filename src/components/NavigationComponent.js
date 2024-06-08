// src/components/NavigationComponent.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { logoutUser } from '../actions/authActions';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    link: {
        textDecoration: 'none',
        color: 'inherit',
    },
}));



const NavigationComponent = () => {
    const classes = useStyles();
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();
    const logoutFunction=()=>{
        dispatch(logoutUser());
    }
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        Recipe Finder
                    </Typography>
                    <Button color="inherit" component={Link} to="/" className={classes.link}>
                        Home
                    </Button>
                    <Button color="inherit" component={Link} to="/dashboard" className={classes.link}>
                        Dashboard
                    </Button>
                    {!user && <Button color="inherit" component={Link} to="/login" className={classes.link}>
                        Login
                    </Button>}
                    {user && <Button onClick={logoutFunction} color="inherit" component={Link}  className={classes.link}>
                        Logout
                    </Button>}

                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationComponent;
