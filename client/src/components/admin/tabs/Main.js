import React, { useState, useEffect } from "react";
import { Row, Col } from 'reactstrap';

import { Info, TutorList } from './main-tools';
import axios from "axios";

const Main = (props) => {
  const [allTutors, setAllTutors] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredTutors, setFilteredTutors] = useState();

  const getAllTutors = async () => {
    let response = await axios.get("api/admin/tutors");
    const tutors = response.data;
    
    setAllTutors(tutors);
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchField(query);
    
    const q = query.toLowerCase();
    const newTutors = allTutors.filter((tutor) => {
      return Object.values(tutor).some( val => 
        String(val).toLowerCase().includes(q) 
      );
    })
    
    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    console.log("mounted")
    getAllTutors();
  }, [])

  useEffect(() => {
    console.log(filteredTutors)
  }, [filteredTutors])

  return (
    <div>
      <Row>
        <Col xs={6}>

        </Col>
        <Col xs={6}>
          <Info allTutors={filteredTutors ? filteredTutors : allTutors} />
        </Col>
      </Row>
      <Row>
        <Col xs={6}>
          <input
            type="text"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Col>
        <Col xs={6}>

        </Col>
      </Row>
      <TutorList allTutors={filteredTutors ? filteredTutors : allTutors} />
    </div>
  )
}

export default Main;