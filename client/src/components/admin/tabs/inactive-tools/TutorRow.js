import React, { useState, useEffect } from 'react';
import { Row, Col } from 'reactstrap';
import ReactTooltip from 'react-tooltip';
const moment = require('moment-timezone');

const TutorRow = (props) => {
  const [wanted, setWanted] = useState(props.tutor.studentsWanted)
  console.log(props.tutor.studentsWanted)

  useEffect(() => {
    console.log(wanted)
  }, [wanted])

  const handleChange = (e) => {
    setWanted(e.target.value)
  }

  const handleClick = () => {
    setWanted('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(wanted)
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

  const { tutor, id } = props;
  return (
    <Row style={styles.rowFont}>
      <Col xs='2'>
        <span data-tip data-for={`inactiveTT-${id}`} data-event='click focus'>
          {`${tutor.firstName} 
              ${tutor.nickName ? `(${tutor.nickName})` : ''}
              ${tutor.middleName ? tutor.middleName : ''}
              ${tutor.lastName}`}
        </span>
      </Col>
      <Col xs='2'>{tutor.email}</Col>
      <Col xs='2'>{tutor.timezone}</Col>
      <Col xs='2'>{moment(tutor.lastAssigned).format('M/D/YY')}</Col>
      <Col xs='2'>
        <form onSubmit={handleSubmit}>
          <input
            type='text'
            value={wanted}
            onChange={(e) => handleChange(e)}
            onClick={() => handleClick()}
          />
          <button>Throw In!</button>
        </form>
      </Col>
      <ReactTooltip
        globalEventOff='click'
        id={`inactiveTT-${id}`}
      >
        <h5>{tutor.firstName} {tutor.lastName} <span style={{ fontSize: '12px' }}> - *{tutor.accountStatus}*  {tutor.level === 'senior tutor' ? 'Senior Tutor' : 'Tutor'}</span></h5>
        <ul>
          {tutor.earlyStudentsOnly ? <li>EARLY STUDENTS ONLY</li> : null}
          <li><b>Wants</b> {tutor.PTorFTstudents.join(', ').replace(/,(?!.*,)/gmi, ' and')} students, for {tutor.curriculum.join(', ').replace(/,(?!.*,)/gmi, ' and')}</li>
          <li><b>Can Teach In-Person:</b> {tutor.Unis4InPerson.length ? tutor.Unis4InPersonjoin(', ').replace(/,(?!.*,)/gmi, ' and') : 'No'}</li>
          <li><b>Native English: {tutor.nativeEnglish ? 'Yes' : 'No'}</b></li>
          <li><b>Languages: {tutor.languages.length ? tutor.languages.join(', ').replace(/,(?!.*,)/gmi, ' and') : 'None'}</b></li>
          <li><b>Available: {convertAMPM(tutor.timesAvailable, tutor.timezone).join(', ')} {tutor.timezone}</b></li>
          <li><b>Available: {convert2Greenwich(tutor.timesAvailable, tutor.timezone).join(', ')} UTC</b></li>
        </ul>

      </ReactTooltip>
    </Row >
  )
}

const styles = {
  rowFont: {
    fontSize: '10px',
    marginBottom: '0',
    overflowWrap: 'break-word',
    backgroundColor: 'lightgrey',
    margin: '0 0 1px 0'
  }
}

export default TutorRow;