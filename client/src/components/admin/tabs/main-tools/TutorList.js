import React from 'react';
import Grid from '@material-ui/core/Grid';

import ReactTooltip from 'react-tooltip'

const moment = require('moment-timezone');

const TutorList = (props) => {

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
      time = !isDST ? time-1 : time;
      return moment.tz(time, "HH", timezone).tz('UTC').format("ha")
    })

    return convertedTimes;
  }

  const renderTutors = () => {
  
    if (props.allTutors) {
      return props.allTutors.map((tutor, i) => {
        return <Grid container style={styles.rowFont} key={i}>
          <Grid item xs={2}>
            <span data-tip data-for={`mainTT-${i}`} data-event='click focus'>
              {`${tutor.firstName} 
              ${tutor.nickName ? `(${tutor.nickName})` : ''}
              ${tutor.middleName ? tutor.middleName : ''}
              ${tutor.lastName}`}
            </span>
          </Grid>
          <Grid item xs={2}>{tutor.email}</Grid>
          <Grid item xs={2}>{tutor.timezone}</Grid>
          <Grid item xs={2}>{moment(tutor.lastAssigned).format('M/D/YY')}</Grid>
          <Grid item xs={2}>{tutor.studentsWanted}</Grid>
          <ReactTooltip 
            globalEventOff='click'
            id={`mainTT-${i}`}  
          >
            <h5>{tutor.firstName} {tutor.lastName} <span style={{fontSize: '12px'}}> - *{tutor.accountStatus}*  {tutor.level === 'senior tutor' ? 'Senior Tutor' : 'Tutor'}</span></h5>
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
      })
    } else {
      return;
    }
  }

  return (
    <div style={{marginTop: 10}}>
      <Grid container style={styles.headerStyles}>
        <Grid item xs={2}>Name</Grid>
        <Grid item xs={2}>Email</Grid>
        <Grid item xs={2}>Timezone</Grid>
        <Grid item xs={2}>Last Assigned</Grid>
        <Grid item xs={2}>Wanted</Grid>
      </Grid>
      {renderTutors()}
    </div>
  )
}

const styles = {
  headerStyles: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  rowFont: {
    fontSize: '10px',
    marginBottom: '0',
    overflowWrap: 'break-word',
    backgroundColor: 'lightgrey',
    margin: '0 0 1px 0'
  }
}

export default TutorList;