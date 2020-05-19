import React from 'react';
import { withFirebase } from '../Firebase';
import loader from './pacmanLoad.gif'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import DeleteIcon from '@material-ui/core/Delete';
import EditIcon from '@material-ui/core/Edit';

function WorkoutList(props) {
    const {loading, workouts, editWorkout, setOpenSnackbar, setSnackbarMsg, setEditing} = props;

    const deleteWorkout = (z) => {
        const workoutKey = Object.keys(workouts)[z];
        const emptyWorkout = {
            date: null,
            duration: null,
            type: null,
            name: null
        };

        props.firebase.updateWorkout(props.authUser.uid, emptyWorkout, workoutKey);

        setOpenSnackbar(true);
        setSnackbarMsg('Deleted workout!');
        setTimeout(() => {
            setOpenSnackbar(false)
        }, 3000)
        setEditing(false);
    }

    return (
        <>
        {
            loading === true
            ? <img src={loader} alt={loader}></img>
            : ''
        }
        {
            workouts === 'not set' || workouts === null
            ? <p>No workouts added. Get moving!</p>
            :
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Duration</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            Object.values(workouts).map((workout, i) => {
                                let {name, type, duration}= workout;
                                switch(workout.type){
                                    case 1:
                                    case 2:
                                    case 3:
                                    case 4:
                                    case 5:
                                }
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        }
        </>
    )
};

export default withFirebase(WorkoutList);