import React, { useState, useEffect } from 'react';

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import FormHelperText from '@material-ui/core/FormHelperText';
import Axios from 'axios';
import feedbackValidator from './feedbackValidator';

import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const SubmitFeedback = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [tutors, setTutors] = useState([])
  const [errors, setErrors] = useState({
    firstName: false, lastName: false, email: false,
    classCode: false, tutor: false, length: false
  })
  const [messages, setMessages] = useState({
    firstName: '', lastName: '', email: '',
    classCode: '', tutor: '', length: ''
  })
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    classCode: "",
    tutor: "",
    length: ""
  });
  const classes = useStyles();

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleDateChange = date => {
    setSelectedDate(date);
  };

  const getTutors = async () => {
    const response = await Axios.get("api/admin/tutorNames")

    setTutors(response.data)
  }

  useEffect(() => {
    console.log(tutors, selectedDate)
  }, [tutors, selectedDate])

  useEffect(() => {
    getTutors()
  }, [])

  useEffect(() => {
    console.log(state)
  }, [state])

  const submitFeedback = (e) => {
    e.preventDefault();
    const validations = feedbackValidator(state)

    setErrors(validations.errors)
    setMessages(validations.messages)
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Submit Feedback!</h3>
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container justify="center">
          <Grid item container xs={12} justify="center">
            <TextField
              required
              error={errors.firstName}
              style={{ minWidth: 320 }}
              name="firstName"
              className={classes.textField}
              helperText={messages.firstName}
              label="First Name"
              margin="normal"
              onChange={handleChange('firstName')}
            />
            <TextField
              required
              error={errors.lastName}
              style={{ minWidth: 320 }}
              name="lastName"
              className={classes.textField}
              helperText={messages.lastName}
              label="Last Name"
              margin="normal"
              onChange={handleChange('lastName')}
            />
          </Grid>
          <Grid item container xs={12} justify="center">
            <TextField
              required
              error={errors.email}
              style={{ minWidth: 320 }}
              name="email"
              type="email"
              className={classes.textField}
              helperText={messages.email}
              label="Email"
              margin="normal"
              onChange={handleChange('email')}
            />
          </Grid>
          <Grid item container xs={12} justify="center">
            <TextField
              required
              error={errors.classCode}
              style={{ minWidth: 320 }}
              name="classCode"
              className={classes.textField}
              helperText={
                errors.classCode ? messages.classCode + ". You can find it on the Tutor Assignment email that you received." :
                "You can find it on the Tutor Assignment email that you received."
              }
              label="Class Code"
              margin="normal"
              onChange={handleChange('classCode')}
            />
          </Grid>
          <Grid item container xs={12} justify="center">
            <FormControl required style={{ minWidth: 320 }} className={classes.formControl}>
              <InputLabel htmlFor="age-native-required">Tutor</InputLabel>
              <Select
                native
                error={errors.tutor}
                value={state.tutor}
                onChange={handleChange('tutor')}
                name="tutor"
                inputProps={{
                  id: 'age-native-required',
                }}
              >
                <option value=""></option>
                {
                  tutors.map((tutor, i) => {
                    return <option
                      value={`${tutor.firstName} ${tutor.lastName}`}
                      key={i}
                    >{tutor.firstName} {tutor.lastName}</option>
                  })
                }
              </Select>
              {errors.tutor && <FormHelperText style={{color: 'red'}}>{messages.tutor}</FormHelperText>}
            </FormControl>
          </Grid>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid item container xs={12} justify="center">
              <KeyboardDatePicker
                required
                margin="normal"
                maxDate={new Date()}
                maxDateMessage="That date hasn't happened yet..."
                style={{ minWidth: 320 }}
                id="date-picker-dialog"
                label="Session Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </Grid>
            <Grid item container xs={12} justify="center">
              <TextField
                required
                error={errors.length}
                helperText={messages.length}
                style={{ minWidth: 320 }}
                name="length"
                type="text"
                className={classes.textField}
                label="How long was the session? Total minutes:"
                margin="normal"
                onChange={handleChange('length')}
              />
            </Grid>
          </MuiPickersUtilsProvider>

        </Grid>
        <Grid item container xs={12} justify="center">
          <Button
            style={{ marginTop: 10 }}
            variant='contained'
            color="primary"
            size="small"
            onClick={submitFeedback}
          >Submit Feedback</Button>
        </Grid>
      </form>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  }
}));

export default SubmitFeedback;