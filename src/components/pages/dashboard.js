import React from 'react';
import { Switch, Route, useRouteMatch, withRouter } from "react-router-dom";
import { BrowserRouter as Router } from 'react-router-dom';
import clsx from 'clsx';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Box from '@material-ui/core/Box';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { makeStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import Sidebar from '../sidebar/index'
import useStyles from '../../config/dashboard.config';
// import Calendar from '../componenets/calendar';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" to="https://material-ui.com/">
        fitBuddy    
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

  

function Dashboard(props) {
let match = useRouteMatch();


  const classes = useStyles();

  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => setOpen(true);
  
  const handleDrawerClose = () => setOpen(false);


  const signOut = () => {
      props.firebase.auth.signOut()
      props.history.push("/");
  }

  return (
    //   <AuthUserContext.Consumer>

    //   </AuthUserContext.Consumer>
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            Dashboard
          </Typography>
          <IconButton color="inherit">
            <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
        </Toolbar>
      </AppBar>

    <Sidebar 
    signOut={signOut} open={open} handleDrawerClose={handleDrawerClose}

    />

     
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container maxWidth="lg" className={classes.container}>
          {/* <Calendar /> */}
          <Box pt={4}>
            <Copyright />
          </Box>
        </Container>
      </main>
    </div>
  );
}

export default withRouter(withFirebase(Dashboard));