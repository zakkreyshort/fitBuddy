import React, {useState} from 'react';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

function EditWorkout(props) {
    const classes = useStyles();

    const {authUser, firebase, workout, workoutKey, setEditing, setOpenSnackbar, setSnackbarMsg} = props;
    const uid = authUser.uid;

    const defaultWorkout = {
        name: workout.name,
        type: workout.type,
        duration: workout.duration,
        date: workout.date
    }

    const [newWorkout, setNewWorkout] = useState(defaultWorkout);

    const handleChange = e => {
        const { name, value } = e.target
        setNewWorkout({
            ...newWorkout,
            [name]: value
        });
    }

    const handleSlider = e => {
        const duration = e.target.getAttribute('aria-valuenow');
        setNewWorkout({...newWorkout, duration: duration});
    }

    const isValidWorkout = newWorkout.name === '';

    const handleSubmit = action => {
        if (authUser){
            firebase.updateWorkout(uid, newWorkout, workoutKey);
            setEditing(false);
            setOpenSnackbar(true);
            setSnackbarMsg('Updated workout');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 4000)
        };
    }

    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField style={{marginTop: '5px'}} variant="outlined" margin="normal" required fullWidth value={newWorkout.name} label="Workout name" name="name" onChange={handleChange} />
                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select labelId="demo-simple-select-label" id="demo-simple-select-label" value={newWorkout.type} style={{minWidth: '100%'}} name="type" onChange={handleChange}>
                    <MenuItem value={1}>Weightlifting</MenuItem>
                    <MenuItem value={2}>Running</MenuItem>
                    <MenuItem value={3}>Swimming</MenuItem>
                    <MenuItem value={4}>Biking</MenuItem>
                    <MenuItem value={5}>Hiking</MenuItem>
                    </Select>
                </div>
                <Typography id="discrete-slider" gutterBottom>
                    Duration
                </Typography>
                <Slider />
            </FormControl>
            <Button>
                Save Workout
            </Button>
        </form>
    )
}

export default withFirebase(EditWorkout);