import React from 'react';
import axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import ReactTooltip from 'react-tooltip'

const OnholdList = (props) => {

  const takeOffHold = async (email) => {
    const response = await axios.put('api/admin/tutorStatus', {
      email: email, accountStatus: 'inactive'
    })

    const msg = response.data
    console.log(msg)
    props.getOnHoldTutors()
  }

  const renderTutors = () => {
    if (props.onHoldTutors) {
      return props.onHoldTutors.map((tutor, i) => {
        return <Grid container style={styles.rowFont} key={i}>
          <Grid item xs={2}>{tutor.queueNum}</Grid>
          <Grid item xs={2}>
            <span data-tip data-for={`holdTT-${i}`} data-event='click focus'>
              {`${tutor.firstName} 
              ${tutor.nickName ? `(${tutor.nickName})` : ''}
              ${tutor.middleName ? tutor.middleName : ''}
              ${tutor.lastName}`}
            </span>
          </Grid>
          <Grid item xs={2}>{tutor.email}</Grid>
          <Grid item xs={2}>{tutor.timezone}</Grid>
          <Grid item xs={2}>{tutor.studentsWanted}</Grid>
          <Grid item xs={1}>
            <Button 
              variant="contained"
              color="primary" 
              onClick={() => takeOffHold(tutor.email)}
            >Activate</Button>
          </Grid>
          <ReactTooltip
            globalEventOff='click'
            id={`holdTT-${i}`}
          >
            <h5>{tutor.firstName} {tutor.lastName} <span style={{ fontSize: '12px' }}> - *{tutor.accountStatus}*  {tutor.level === 'senior tutor' ? 'Senior Tutor' : 'Tutor'}</span></h5>
            <ul>
              {tutor.earlyStudentsOnly ? <li>EARLY STUDENTS ONLY</li> : null}
              <li><b>Wants</b> {tutor.PTorFTstudents.join(', ').replace(/,(?!.*,)/gmi, ' and')} students, for {tutor.curriculum.join(', ').replace(/,(?!.*,)/gmi, ' and')}</li>
              <li><b>Can Teach In-Person:</b> {tutor.Unis4InPerson.length ? tutor.Unis4InPerson.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'No'}</li>
              <li><b>Native English: {tutor.nativeEnglish ? 'Yes' : 'No'}</b></li>
              <li><b>Languages: {tutor.languages.length ? tutor.languages.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'None'}</b></li>
            </ul>

          </ReactTooltip>
        </Grid>
      })
    } else {
      return;
    }
  }

  return (
    <div>
      <Grid container style={styles.headerStyles}>
        <Grid item xs={2}>Queue</Grid>
        <Grid item xs={2}>Name</Grid>
        <Grid item xs={2}>Email</Grid>
        <Grid item xs={2}>Timezone</Grid>
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

export default OnholdList;