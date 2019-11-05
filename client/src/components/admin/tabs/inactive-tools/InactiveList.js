import React from 'react';
import { Row, Col } from 'reactstrap';

import TutorRow from './TutorRow';

const InactiveList = (props) => {

  const renderTutors = () => {
    if (props.inactiveTutors) {
      return props.inactiveTutors.map((tutor, i) => {
        return <TutorRow tutor={tutor} key={i} id={i} getInactiveTutors={props.getInactiveTutors} />
      })
    } else {
      return;
    }
  }

  return (
    <div>
      <Row style={styles.headerStyles}>
        <Col xs='2'>Name</Col>
        <Col xs='2'>Email</Col>
        <Col xs='2'>Timezone</Col>
        <Col xs='2'>Last Assigned</Col>
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

export default InactiveList;