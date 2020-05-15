import React , { useState } from 'react';
import { withFirebase } from '../components/Firebase';
import { Link, withRouter } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import FitnessCenterIcon from '@material-ui/icons/FitnessCenter';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        fitBuddy
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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



function Register(props) {

  const classes = useStyles();

  const initialUser = {id: null, email: '', password: '', error: null, auth: null}

  const [user, setUser] = useState(initialUser);

  const handleChange = z => {
    const {name, value} = z.target;
    setUser({...user, [name]: value})
  }

  const handleSubmit = z => {
    props.firebase.auth.createUserWithEmailAndPassword(user.email, user.password)
    .then(authUser => {
      setUser(initialUser);
      props.history.push("/dashboard");
    })
    .catch(error => {
      setUser({...user, error: error.message})
    });
  }

  const isValidUser = user.name === '' || user.email === '' || user.password === '';

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FitnessCenterIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
         Register
        </Typography>
        <form className={classes.form} noValidate onSubmit={z => z.preventDefault()}>
        <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="Name"
              name="name"
              autoFocus
              value={user.name}
              onChange={handleChange}
            />
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
          <Typography className={classes.error}>
            {user.error ? user.error : ''}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
            disabled={isValidUser}
          >
            Register Account
          </Button>

          <Grid container>
            <Grid item>
              <Link to='/'>
                {"Already have an account? Sign In"}
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

export default withRouter(withFirebase(Register));