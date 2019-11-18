import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";
import LinearProgress from '@material-ui/core/LinearProgress';

import {
  MsgDisplay, StudentsWanted, StudentType,
  Timezone, DayPreferences, TimePreferences,
  PTorFT, InPerson, EarlyStudents, Languages
} from './tutor-tools';
import axios from 'axios';


const TutorPortal = (props) => {
  const { user } = props.auth;
  const [tutor, setTutor] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [msg, setMsg] = useState('');
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

  const handleShowAlert = (newMsg) => {
    setMsg(newMsg)
    setShowAlert(true);

    setTimeout(() => {
      setShowAlert(false);
    }, 4000);
  }

  const { email, timezone, daysAvailable, 
    timesAvailable, Unis4InPerson, earlyStudents, languages } = tutor;
  return (
    <div>
      <div className="landing-copy col s12 center-align">
        <Row>
          <Col xs='12' sm='4'>
            <p style={{textAlign: 'left'}}>Hi {user.firstName}!</p>
          </Col>
          <Col xs='12' sm='4'>
            <p><strong>Status:</strong> {user.accountStatus}</p>
          </Col>
          <Col xs='12' sm='4'>
            <p><strong>Level:</strong> {user.level}</p>
          </Col>
        </Row>
        {
          !loading ?
            <div>
              <Row style={{display: 'flex', justifyContent: 'space-between'}}>
                <Col xs='12'>
                  <MsgDisplay showAlert={showAlert} msg={msg} />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <StudentsWanted 
                    studentsWanted={tutor.studentsWanted || 0} 
                    email={tutor.email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <StudentType 
                    curriculum={tutor.curriculum} 
                    email={tutor.email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <PTorFT 
                    PTorFTstudents={tutor.PTorFTstudents} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <EarlyStudents 
                    earlyStudents={earlyStudents} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <Languages 
                    languages={languages} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <Timezone 
                    savedTimezone={timezone} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='4' lg='3'>
                  <InPerson 
                    Unis4InPerson={Unis4InPerson} 
                    email={email}
                    handleShowAlert={handleShowAlert}
                />
                </Col>
                <Col xs='12' sm='6'>
                  <DayPreferences 
                    daysAvailable={daysAvailable} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
                <Col xs='12' sm='6'>
                  <TimePreferences 
                    timesAvailable={timesAvailable} 
                    email={email} 
                    handleShowAlert={handleShowAlert}
                  />
                </Col>
              </Row>
            </div>

            :

            <LinearProgress />
        }

      </div>
    </div>
  )
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps
)(TutorPortal);