import React from 'react';
import axios from 'axios';
import { Row, Col, Button } from 'reactstrap';
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
        return <Row style={styles.rowFont} key={i}>
          <Col xs='2'>{tutor.queueNum}</Col>
          <Col xs='2'>
            <span data-tip data-for={`holdTT-${i}`} data-event='click focus'>
              {`${tutor.firstName} 
              ${tutor.nickName ? `(${tutor.nickName})` : ''}
              ${tutor.middleName ? tutor.middleName : ''}
              ${tutor.lastName}`}
            </span>
          </Col>
          <Col xs='2'>{tutor.email}</Col>
          <Col xs='2'>{tutor.timezone}</Col>
          <Col xs='2'>{tutor.studentsWanted}</Col>
          <Col xs='1'>
            <Button 
              color="primary" 
              size="sm"
              onClick={() => takeOffHold(tutor.email)}
            >Activate</Button>
          </Col>
          <ReactTooltip
            globalEventOff='click'
            id={`holdTT-${i}`}
          >
            <h5>{tutor.firstName} {tutor.lastName} <span style={{ fontSize: '12px' }}> - *{tutor.accountStatus}*  {tutor.level === 'senior tutor' ? 'Senior Tutor' : 'Tutor'}</span></h5>
            <ul>
              {tutor.earlyStudentsOnly ? <li>EARLY STUDENTS ONLY</li> : null}
              <li><b>Wants</b> {tutor.PTorFTstudents.join(', ').replace(/,(?!.*,)/gmi, ' and')} students, for {tutor.curriculum.join(', ').replace(/,(?!.*,)/gmi, ' and')}</li>
              <li><b>Can Teach In-Person:</b> {tutor.Unis4InPerson.length ? tutor.Unis4InPersonjoin(', ').replace(/,(?!.*,)/gmi, ' and') : 'No'}</li>
              <li><b>Native English: {tutor.nativeEnglish ? 'Yes' : 'No'}</b></li>
              <li><b>Languages: {tutor.languages.length ? tutor.languages.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'None'}</b></li>
            </ul>

          </ReactTooltip>
        </Row>
      })
    } else {
      return;
    }
  }

  return (
    <div>
      <Row style={styles.headerStyles}>
        <Col xs='2'>Queue</Col>
        <Col xs='2'>Name</Col>
        <Col xs='2'>Email</Col>
        <Col xs='2'>Timezone</Col>
        <Col xs='2'>Wanted</Col>
      </Row>
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