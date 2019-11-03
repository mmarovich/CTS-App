import React from "react";
import {Row, Col} from 'reactstrap';

import {Info, TutorList} from './main-tools';

const Main = (props) => {

  console.log(props.tutors)
  return (
    <div>
      <Row>
        <Col xs={6}>

        </Col>
        <Col xs={6}>
          <Info tutors={props.tutors}/>
        </Col>
      </Row>
      <TutorList tutors={props.tutors} />
    </div>
  )
}

export default Main;