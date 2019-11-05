import React, { useState, useEffect } from "react";
import { Row, Col } from 'reactstrap';

import { Info, TutorList } from './main-tools';
import axios from "axios";

const Main = (props) => {
  const [allTutors, setAllTutors] = useState();

  const getAllTutors = async () => {
    let response = await axios.get("/api/admin/tutors");
    const tutors = response.data
    setAllTutors(tutors);
  }

  useEffect(() => {
    console.log("mounted")
    getAllTutors();
  }, [])

  return (
    <div>
      <Row>
        <Col xs={6}>

        </Col>
        <Col xs={6}>
          <Info allTutors={allTutors} />
        </Col>
      </Row>
      <TutorList allTutors={allTutors} />
    </div>
  )
}

export default Main;