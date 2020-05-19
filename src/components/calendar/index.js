import React, { useState, useEffect } from 'react';
import moment from 'moment';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
import CalendarBody from './calendarbody';
import CalendarHead from './calendarhead';
import AddWorkout from '../AddWorkout';
import WorkoutList from '../WorkoutList';


function Calendar(props) {

    const {firebase, authUser} = props;
    
    let defaultSelectedDay = {
        day: moment().format("D"),
        month: moment().month()
    };
    
    
    const [dateObject, setdateObject] = useState(moment());
    const [showMonthTable, setShowMonthTable] = useState(false);
    const [selectedDay, setSelected] = useState(defaultSelectedDay);
    
    
    const allMonths = moment.months();
    const currentMonth = () => dateObject.format("MMMM");
    const currentYear = () => dateObject.format("YYYY");
    
    const setMonth = month => {
        let monthNo = allMonths.indexOf(month);
        let newDateObject = Object.assign({}, dateObject);
        newDateObject = moment(dateObject).set("month", monthNo);
        setdateObject(newDateObject);
        setShowMonthTable(false);
    }
    
    const toggleMonthSelect = () => setShowMonthTable(!showMonthTable);
    
    const setSelectedDay = day => {
        setSelected({
            day,
            month: currentMonthNum()
        });
    };
    
    const currentMonthNum = () => dateObject.month();
    const daysInMonth = () => dateObject.daysInMonth();
    const currentDay = () => dateObject.format("D");
    const actualMonth = () => moment().format("MMMM");
    
    const firstDayOfMonth = () => moment(dateObject).startOf('month').format("d");
    
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMsg, setSnackbarMsg] = useState(null);
    
    const [workouts, setWorkouts] = useState(true);
    const [loading, setLoading] = useState([]);
    const [activeDays, setActiveDays] = useState([]);
    
    
    const retrieveData = () => {

        let queryDate = `${selectedDay.day}-${selectedDay.month}-${selectedDay.year}`;

        let ref = firebase.db.ref().child(`users/${authUser.uid}/workouts`);
        ref.orderByChild("date").equalTo(queryDate).on("value", snapshot => {
            let data = snapshot.val()
            setWorkouts(data);
            setLoading(false);
            setEditing(false);
        });
        retrieveActiveDays();
    };
    
    const retrieveActiveDays = () = {
        
    }


    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
                    <CalendarHead
                        allMonths={allMonths}
                        currentMonth={currentMonth}
                        currentYear={currentYear}
                        setMonth={setMonth}
                        showMonthTable={showMonthTable}
                        toggleMonthSelect={toggleMonthSelect}
                    />
                    <CalendarBody firstDayOfMonth={firstDayOfMonth} daysInMonth={daysInMonth} currentDay={currentDay} currentMonth={currentMonth} currentMonthNum={currentMonthNum} actualMonth={actualMonth} setSelectedDay={setSelectedDay} selectedDay={selectedDay} weekdays={moment.weekdays()} 
                    />
            </Grid>
            <Grid item xs={12} md={7}>
                <Paper className="paper">
                    <h3>Workout on {selectedDay.day}-{selectedDay.month + 1}</h3>
                    <WorkoutList loading={loading} workouts={workouts} authUser={props.authUser} setOpenSnackbar={setOpenSnackbar} setSnackbarMsg={setSnackbarMsg} />
                </Paper>
            </Grid>
        </Grid>
    )
};

export default Calendar;