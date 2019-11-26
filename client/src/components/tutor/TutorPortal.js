import React, { useState, useEffect } from 'react';
import { Provider as AlertProvider } from 'react-alert'
import AlertTemplate from 'react-alert-template-basic'
import Grid from '@material-ui/core/Grid';
import { connect } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  StudentsWanted, StudentType,
  Timezone, DayPreferences, TimePreferences,
  PTorFT, InPerson, EarlyStudents, Languages
} from './tutor-tools';
import axios from 'axios';

const options = {
  // you can also just use 'bottom center'
  position: 'bottom center',
  timeout: 5000,
  offset: '30px',
  type: 'success',
  transition: 'scale'
}


const TutorPortal = (props) => {
  const { user } = props.auth;
  const [tutor, setTutor] = useState({});
  const [loading, setLoading] = useState(false);

  const getTutor = async () => {
    setLoading(true)
    const response = await axios.post('api/account/tutor', {
      email: user.email
    })
    const tutorInfo = response.data;
    setTutor(tutorInfo)
    setLoading(false)
  }

  useEffect(() => {
    getTutor();
  }, [])

  useEffect(() => {
    console.log(tutor)
  }, [tutor])

  const { email, timezone, daysAvailable,
    timesAvailable, Unis4InPerson, earlyStudents, languages } = tutor;
  return (
    <AlertProvider template={AlertTemplate} {...options}>
      <div style={{ margin: 10 }}>
        {
          !loading ?
            <div>
              <Grid container justify="space-around">
                <Grid item xs={12} sm={3}>
                  <p style={{ textAlign: 'left' }}>Hi {user.firstName}!</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <p><strong>Status:</strong> {user.accountStatus}</p>
                </Grid>
                <Grid item xs={12} sm={3}>
                  <p><strong>Level:</strong> {user.level}</p>
                </Grid>
              </Grid>
              <Grid container style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center' }}>
                <Grid item xs={12} sm={4} lg={3}>
                  <StudentsWanted
                    studentsWanted={tutor.studentsWanted || 0}
                    email={tutor.email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <StudentType
                    curriculum={tutor.curriculum}
                    email={tutor.email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <PTorFT
                    PTorFTstudents={tutor.PTorFTstudents}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <EarlyStudents
                    earlyStudents={earlyStudents}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <Languages
                    languages={languages}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <Timezone
                    savedTimezone={timezone}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={4} lg={3}>
                  <InPerson
                    Unis4InPerson={Unis4InPerson}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <DayPreferences
                    daysAvailable={daysAvailable}
                    email={email}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TimePreferences
                    timesAvailable={timesAvailable}
                    email={email}
                  />
                </Grid>
              </Grid>
            </div>
            :

            <LinearProgress />
        }
      </div>
    </AlertProvider>

  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(TutorPortal);