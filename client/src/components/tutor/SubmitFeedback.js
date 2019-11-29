import React, { useState, useEffect } from 'react';

import {
  Grid, TextField, Button, FormControl, FormControlLabel,
  InputLabel, Select, FormHelperText, FormLabel, RadioGroup,
  Radio
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles';

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
    classCode: false, tutor: false, length: false,
    topics: false, helped: false, tutorInterest: false
  })
  const [messages, setMessages] = useState({
    firstName: '', lastName: '', email: '',
    classCode: '', tutor: '', length: '',
    topics: '', helped: '', tutorInterest: ''
  })
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    classCode: "",
    tutor: "",
    length: "",
    topics: "",
    helped: '',
    tutorInterest: ''
  });
  const classes = useStyles();

  const handleChange = name => event => {
    console.log(event.target.value)
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

  // useEffect(() => {
  //   console.log(tutors, selectedDate)
  // }, [tutors, selectedDate])

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
              variant="outlined"
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
              variant="outlined"
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
              variant="outlined"
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
            <TextField
              required
              variant="outlined"
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
          <Grid item container xs={12} justify="center" alignItems="center">
            <FormControl required style={{ minWidth: 320, marginBottom: 30 }} className={classes.formControl}>
              <InputLabel htmlFor="age-native-required">Tutor</InputLabel>
              <Select
                variant="outlined"
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
              {errors.tutor && <FormHelperText style={{ color: 'red' }}>{messages.tutor}</FormHelperText>}
            </FormControl>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <KeyboardDatePicker
                required
                inputVariant="outlined"
                margin="normal"
                maxDate={new Date()}
                maxDateMessage="That date hasn't happened yet..."
                style={{ minWidth: 320, marginBottom: 30 }}
                id="date-picker-dialog"
                label="Session Date"
                format="MM/dd/yyyy"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
          </Grid>
          <Grid item container xs={12} justify="center">
            <TextField
              required
              variant="outlined"
              error={errors.length}
              helperText={messages.length}
              style={{ minWidth: 320 }}
              name="length"
              type="text"
              className={classes.textField}
              label="How long was the session? (minutes):"
              margin="normal"
              onChange={handleChange('length')}
            />
            <TextField
              required
              variant="outlined"
              multiline
              rowsMax={5}
              inputProps={{ maxLength: 600 }}
              error={errors.topics}
              helperText={messages.topics}
              style={{ minWidth: 320 }}
              name="topics"
              type="text"
              className={classes.textField}
              label="Briefly, What did you discuss/learn?"
              margin="normal"
              onChange={handleChange('topics')}
            />
          </Grid>
          <Grid item container xs={12} justify="center">
            <FormControl style={{ width: 320, border: errors.helped ? "2px solid red" : null, padding: 5}} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Did the session help you?</FormLabel>
              <FormHelperText><br />It didn't! I need to spend more time on it.</FormHelperText>
              <RadioGroup aria-label="helped" name="helped" value={state.helped} onChange={handleChange('helped')}>
                {
                  ['1', '2', '3', '4', '5'].map((num, i) => {
                    return <FormControlLabel
                      key={i}
                      value={num}
                      control={<Radio color="primary" />}
                      label={num}
                      labelPlacement="end"
                    />
                  })
                }
              </RadioGroup>
              <FormHelperText>A lot!</FormHelperText>
            </FormControl>
            <FormControl style={{ width: 320, border: errors.tutorInterest ? "2px solid red" : null, padding: 5}} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Do you feel the tutor was genuinely interested in helping you?</FormLabel>
              <FormHelperText><br />No!</FormHelperText>
              <RadioGroup aria-label="helped" name="helped" value={state.tutorInterest} onChange={handleChange('tutorInterest')}>
                {
                  ['1', '2', '3', '4', '5'].map((num, i) => {
                    return <FormControlLabel
                      key={i}
                      value={num}
                      control={<Radio color="primary" />}
                      label={num}
                      labelPlacement="end"
                    />
                  })
                }
              </RadioGroup>
              <FormHelperText>The tutor was great!</FormHelperText>
            </FormControl>
          </Grid>
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
    marginBottom: theme.spacing(5),
    width: 200,
  },
  formControl: {
    margin: theme.spacing(1),
    marginBottom: theme.spacing(5),
    minWidth: 120,
  }
}));

export default SubmitFeedback;