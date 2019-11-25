import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import ReactTooltip from 'react-tooltip';
import axios from 'axios';
import moment from 'moment-timezone';

const InactiveRow = (props) => {
  const { tutor, id } = props;
  const {studentsWanted, email} = props.tutor;
  const [wanted, setWanted] = useState('');
  const [changed, setChanged] = useState()

  const handleChange = (e) => {
    setChanged(true)
    setWanted(e.target.value)
  }

  useEffect(() => {
    setChanged(false)
    setWanted(studentsWanted)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await axios.put("api/admin/inactiveTutors", {
      email,
      studentsWanted: wanted
    })

    const msg = response.data
    console.log(msg)
    setWanted(studentsWanted)
    props.getInactiveTutors()
  }

  const convertAMPM = (times, timezone) => {
    const convertedTimes = times.map((time) => {
      return moment.tz(time, "HH", timezone).format("ha")
    })

    return convertedTimes;
  }

  const convert2Greenwich = (times, timezone) => {
    const isDST = moment().isDST();
    const convertedTimes = times.map((time, i) => {
      time = parseInt(time)
      time = !isDST ? time - 1 : time;
      return moment.tz(time, "HH", timezone).tz('UTC').format("ha")
    })

    return convertedTimes;
  }

  return (
    <Grid container style={styles.rowFont} alignItems="center">
      <Grid item xs={2}>
        <span data-tip data-for={`inactiveTT-${id}`} data-event='click focus'>
          {`${tutor.firstName} 
              ${tutor.nickName ? `(${tutor.nickName})` : ''}
              ${tutor.middleName ? tutor.middleName : ''}
              ${tutor.lastName}`}
        </span>
      </Grid>
      <Grid item xs={2}>{tutor.email}</Grid>
      <Grid item xs={2}>{tutor.timezone}</Grid>
      <Grid item xs={2}>{moment(tutor.lastAssigned).format('M/D/YY')}</Grid>
      <Grid item xs={1}>
          <TextField
            style={{ width: "100%" }}
            type="text"
            value={changed ? wanted : studentsWanted}
            onChange={(e) => handleChange(e)}
          />
      </Grid>
      <Grid item xs={1}>
      <Button
            variant='contained'
            color="primary"
            type="submit"
            style={styles.inactiveButton}
            id="search"
            value="FSF"
            onClick={handleSubmit}
          >Throw In!</Button>
          {/* <button type="submit" onClick={handleSubmit}>Throw In!</button> */}
      </Grid>
      <ReactTooltip
        globalEventOff='click'
        id={`inactiveTT-${id}`}
      >
        <h5>{tutor.firstName} {tutor.lastName} <span style={{ fontSize: '12px' }}> - *{tutor.accountStatus}*  {tutor.level === 'senior tutor' ? 'Senior Tutor' : 'Tutor'}</span></h5>
        <ul>
          {tutor.earlyStudentsOnly ? <li>EARLY STUDENTS ONLY</li> : null}
          <li><b>Wants</b> {tutor.PTorFTstudents.join(', ').replace(/,(?!.*,)/gmi, ' and')} students, for {tutor.curriculum.join(', ').replace(/,(?!.*,)/gmi, ' and')}</li>
          <li><b>Can Teach In-Person:</b> {tutor.Unis4InPerson.length ? tutor.Unis4InPerson.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'No'}</li>
          <li><b>Native English: {tutor.nativeEnglish ? 'Yes' : 'No'}</b></li>
          <li><b>Languages: {tutor.languages.length ? tutor.languages.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'None'}</b></li>
          <li><b>Available: {convertAMPM(tutor.timesAvailable, tutor.timezone).join(', ')} {tutor.timezone}</b></li>
          <li><b>Available: {convert2Greenwich(tutor.timesAvailable, tutor.timezone).join(', ')} UTC</b></li>
        </ul>

      </ReactTooltip>
    </Grid>
  )
}

const styles = {
  rowFont: {
    fontSize: '10px',
    marginBottom: '0',
    overflowWrap: 'break-word',
    backgroundColor: 'lightgrey',
    margin: '0 0 1px 0'
  },
  inactiveButton: {
    width: 75, 
    height: 25, 
    fontSize: 8
  }
}

export default InactiveRow;