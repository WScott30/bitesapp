// src/components/NavigationComponent.js
import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Link } from 'react-router-dom';

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
                    <Button color="inherit" component={Link} to="/login" className={classes.link}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default NavigationComponent;
