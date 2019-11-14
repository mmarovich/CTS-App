import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import { connect } from "react-redux";

import { StudentsWanted, StudentType, 
  Timezone, TimePreferences
} from './tutor-tools';
import axios from 'axios';


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

  const {email, timezone, timesAvailable} = tutor;
  return (
    <div>
      <h1>Tutor Portal!</h1>
      <div className="landing-copy col s12 center-align">
        <h4>
          <b>Hey there,</b> {user.firstName}
          <p className="flow-text grey-text text-darken-1">
            You are logged into a full-stack{" "}
            <span style={{ fontFamily: "monospace" }}>MERN</span> app 👏
              </p>
        </h4>
        {
          !loading ?
            <div>
              <Row>
                <Col xs='6'>
                  <StudentsWanted studentsWanted={tutor.studentsWanted || 0} email={tutor.email} />
                </Col>
                <Col xs='6'>
                  <StudentType curriculum={tutor.curriculum} email={tutor.email} />
                </Col>
              </Row>
              <Row>
                <Col xs='6'>
                  <Timezone savedTimezone={timezone} email={email} />
                </Col>
                <Col xs='6'>
                  <TimePreferences timesAvailable={timesAvailable} email={email} />
                </Col>
              </Row>
            </div>

            :

            <h2>Loading...</h2>
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