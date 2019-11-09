import React from 'react';
import { Row, Col } from 'reactstrap';

import ActiveRow from './ActiveRow';

const ActiveList = (props) => {

  const renderTutors = () => {
    if (props.activeTutors) {
      return props.activeTutors.map((tutor, i) => {
        return <ActiveRow tutor={tutor} i={i} key={i} getActiveTutors={props.getActiveTutors} />
      })
    } else {
      return;
    }
  }

  return (
    <div>
      <Row style={styles.headerStyles}>
        <Col xs='1'>Queue</Col>
        <Col xs='2'></Col>
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

export default ActiveList;