import React, { useState } from 'react';
import { withFirebase } from '../components/Firebase';
import { Link, withRouter } from 'react-router-dom';

import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Typography from '@material-ui/core/Typography';
import PasswordForget from './PasswordForget';



import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';



// notes:

// copyright starts here
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


// styling sheet starts here
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: 'purple'
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor: 'purple'
  },
}));



function SignIn(props) {
  const classes = useStyles();

  const initialUser = {id: null, email: '', password: '', error: null, auth: null}

  const [user, setUser] = useState(initialUser);

  const handleChange = e => {
    const {name, value} = e.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = () => {
    props.firebase.doSignInWithEmailAndPassword(user.email, user.password).then(authUser => {
      setUser({initialUser})
      props.history.push("/dashboard");
    })
    .catch(error => {
      setUser({...user, error: error.message})
    });
  }

  const isValidUser = user.email === '' || user.password === '';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form 
        className={classes.form} 
        noValidate 
        onSubmit={e => e.preventDefault()}>

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={isValidUser}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <PasswordForget />
            </Grid>
            <Grid item>
              <Link to="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}

export default withRouter(withFirebase(SignIn));

