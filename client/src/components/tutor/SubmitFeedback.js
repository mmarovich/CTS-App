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
  const [sessionDate, setSessionDate] = useState(new Date());
  const [tutors, setTutors] = useState([])
  const [errors, setErrors] = useState({
    firstName: false, lastName: false, email: false,
    classCode: false, tutor: false, length: false,
    topics: false, helped: false, tutorInterest: false,
    continueTopic: false, studyHours: false, officeHours: false,
    comments: false
  })
  const [messages, setMessages] = useState({
    firstName: '', lastName: '', email: '',
    classCode: '', tutor: '', length: '',
    topics: '', comments: ''
  })
  const [state, setState] = useState({
    firstName: "",
    lastName: "",
    email: "",
    classCode: "",
    tutor: "",
    length: "",
    topics: "",
    helped: "",
    tutorInterest: "",
    continueTopic: "",
    studyHours: "",
    officeHours: "",
    comments: "",
    privateComments: ""
  });
  const classes = useStyles();

  const handleChange = name => event => {
    setState({
      ...state,
      [name]: event.target.value,
    });
  };

  const handleDateChange = date => {
    setSessionDate(date);
  };

  const getTutors = async () => {
    const response = await Axios.get("api/admin/tutorNames")

    setTutors(response.data)
  }

  // useEffect(() => {
  //   console.log(tutors, sessionDate)
  // }, [tutors, sessionDate])

  useEffect(() => {
    getTutors()
  }, [])

  // useEffect(() => {
  //   console.log(state)
  // }, [state])

  const submitFeedback = async (e) => {
    e.preventDefault();
    const validations = feedbackValidator(state)

    setErrors(validations.errors)
    setMessages(validations.messages)

    var noErrors = Object.keys(validations.errors).every(function(k){ return validations.errors[k] === false });
    
    if (noErrors) {
      console.log(sessionDate)
      const response = await Axios.post("api/admin/feedback", {
        ...state,
        sessionDate
      })
      console.log(response.data)
    }
  }

  return (
    <div>
      <h3 style={{ textAlign: 'center' }}>Submit Feedback!</h3>
      <form className={classes.container} noValidate autoComplete="off">
        <Grid container justify="center">
          <Grid item container xs={12} justify="center" alignItems="center">
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
                      value={tutor.id}
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
                value={sessionDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  'aria-label': 'change date',
                }}
              />
            </MuiPickersUtilsProvider>
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
            <FormControl style={{ width: 320, border: errors.helped ? "2px solid red" : null, padding: 5 }} component="fieldset" className={classes.formControl}>
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
            <FormControl style={{ width: 320, border: errors.tutorInterest ? "2px solid red" : null, padding: 5 }} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Do you feel the tutor was genuinely interested in helping you?</FormLabel>
              <FormHelperText><br />No!</FormHelperText>
              <RadioGroup aria-label="tutorInterest" name="tutorInterest" value={state.tutorInterest} onChange={handleChange('tutorInterest')}>
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
            <FormControl style={{ width: 320, border: errors.continueTopic ? "2px solid red" : null, padding: 5 }} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Do you feel that you can pick up from where the session left off and continue to gain more understanding of the topic?</FormLabel>
              <FormHelperText><br />Nope</FormHelperText>
              <RadioGroup aria-label="continueTopic" name="continueTopic" value={state.continueTopic} onChange={handleChange('continueTopic')}>
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
              <FormHelperText>Definitely!</FormHelperText>
            </FormControl>
            <FormControl style={{ width: 400, border: errors.studyHours ? "2px solid red" : null, padding: 5 }} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Are you spending the minimal recommended time studying, practicing, coding, etc. outside of going to class? 20+ hrs per week for 6 month boot camps / 40+ hrs per week for 3 month boot camps?</FormLabel>
              <RadioGroup aria-label="studyHours" name="studyHours" value={state.studyHours} onChange={handleChange('studyHours')}>
                <FormControlLabel
                  value="Yes, I spend that much time or more each week!"
                  control={<Radio color="primary" />}
                  label="Yes, I spend that much time or more each week!"
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="No, I don't have that much time to study, practice, code, etc. every week outside of going to class."
                  control={<Radio color="primary" />}
                  label="No, I don't have that much time to study, practice, code, etc. every week outside of going to class."
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="I didn't know that those are the recommended minimal hours outside of class hours."
                  control={<Radio color="primary" />}
                  label="I didn't know that those are the recommended minimal hours outside of class hours."
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={""}
                  control={<Radio color="primary" />}
                  label={
                    <TextField
                      id="standard-bare"
                      label="Other"
                      defaultValue={""}
                      margin="normal"
                      onChange={handleChange('studyHours')}
                    />
                  }
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            <FormControl style={{ width: 400, border: errors.officeHours ? "2px solid red" : null, padding: 5 }} component="fieldset" className={classes.formControl}>
              <FormLabel component="legend">Regular attendance at Office Hours is mandatory for any student that is assigned a tutor in Central Support. Tutoring is not a replacement for working with your TA's during Office Hours.</FormLabel>
              <RadioGroup aria-label="officeHours" name="officeHours" value={state.officeHours} onChange={handleChange('officeHours')}>
                <FormControlLabel
                  value="I attend Office Hours consistently."
                  control={<Radio color="primary" />}
                  label="I attend Office Hours consistently."
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="I will start attending Office Hours more consistently. I did not realize it is mandatory."
                  control={<Radio color="primary" />}
                  label="I will start attending Office Hours more consistently. I did not realize it is mandatory."
                  labelPlacement="end"
                />
                <FormControlLabel
                  value="I am unable to attend Office Hours due to outside obligations, etc."
                  control={<Radio color="primary" />}
                  label="I am unable to attend Office Hours due to outside obligations, etc."
                  labelPlacement="end"
                />
                <FormControlLabel
                  value={""}
                  control={<Radio color="primary" />}
                  label={
                    <TextField
                      id="standard-bare"
                      label="Other"
                      defaultValue={""}
                      margin="normal"
                      onChange={handleChange('officeHours')}
                    />
                  }
                  labelPlacement="end"
                />
              </RadioGroup>
            </FormControl>
            <Grid item container xs={12} justify="space-around" alignItems="center">
              <TextField
                required
                variant="outlined"
                multiline
                rowsMax={5}
                inputProps={{ maxLength: 600 }}
                error={errors.comments}
                helperText={messages.comments}
                style={{ minWidth: 320 }}
                name="comments"
                type="text"
                className={classes.textField}
                label="Comments"
                margin="normal"
                onChange={handleChange('comments')}
              />
              <TextField
                variant="outlined"
                multiline
                rowsMax={5}
                helperText="Your tutor will not see these comments"
                inputProps={{ maxLength: 600 }}
                style={{ minWidth: 320 }}
                name="privateComments"
                type="text"
                className={classes.textField}
                label="Comments (Private)"
                margin="normal"
                onChange={handleChange('privateComments')}
              />
            </Grid>
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