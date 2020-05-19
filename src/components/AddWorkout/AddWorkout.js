import React, { useState } from 'react';
import { withFirebase } from '../Firebase';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Slider from '@material-ui/core/Slider';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles (theme => ({
    formControl: {
        minWidth: '100%',
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));



function AddWorkout(props) {
    const classes = useStyles();

    const { authUser, firebase, selectedDay, setOpenSnackbar, setSnackbarMsg } = props;
    const uid = authUser.uid;

    selectedDay.year = new Date().getFullYear();
    let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

    const defaultWorkout = {
        name = '',
        type: 1,
        duration: 60,
        date: queryDate
    }

    const [workout, setWorkout] = useState(defaultWorkout);

    const handleChange = e => {
        const { name, value } = e.target
        setWorkout({
            ...workout,
            date: queryDate,
            [name]: value
        });
    }

    const handleSlider = e => {
        const duration = e.target.getAttribute('aria-valuenow');
        setWorkout({...workout, duration: duration});
    }

    const isValidWorkout = workout.name === '';

    const handleSubmit = () => {
        if (authUser) {
            firebase.addWorkout(uid, workout);
            setWorkout(defaultWorkout);
            setOpenSnackbar(true);
            setSnackbarMsg('Workout added! Great job!');
            setTimeout(() => {
                setOpenSnackbar(false)
            }, 3000)
        }
    }



    return (
        <form noValidate onSubmit={e => e.preventDefault()}>
            <FormControl className={classes.formControl}>
                <TextField 
                style={{marginTop: '5px'}}
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Workout name"
                value={workout.name}
                name="name"
                onChange={handleChange}
                />
                <div style={{marginTop: '20px', marginBottom: '30px'}}>
                    <Typography id="discrete-slider" gutterBottom>
                        Type
                    </Typography>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={workout.type}
                    style={{minWidth: '100&'}}
                    name="type"
                    onChange={handleChange}
                    >
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
                <Slider 
                defaultValue={workout.duration}
                aria-labelledby="discrete-slider"
                valueLabelDisplay="auto"
                step={10}
                marks
                min={10}
                max={120}
                name="duration"
                onChange={handleSlider}
                style={{marginBottom: '20px'}}
                />
            </FormControl>
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={isValidWorkout}
            >
                Add Workout
            </Button>
        </form>
    )
};

export default withFirebase(AddWorkout);