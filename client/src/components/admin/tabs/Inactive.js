import React, {useState, useEffect} from "react";
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import InactiveList from './inactive-tools/InactiveList';

const Inactive = (props) => {
  const [inactiveTutors, setInactiveTutors] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredTutors, setFilteredTutors] = useState();

  const getInactiveTutors = async () => {
    const response = await axios.get("api/admin/inactiveTutors")
    const allInactiveTutors = response.data;
    setInactiveTutors(allInactiveTutors);
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchField(query);
    
    const q = query.toLowerCase();
    const newTutors = inactiveTutors.filter((tutor) => {
      return Object.values(tutor).some( val => 
        String(val).toLowerCase().includes(q) 
      );
    })
    
    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    getInactiveTutors()
  }, [])

  useEffect(() => {
    console.log(inactiveTutors)
  }, [inactiveTutors])

  return (
    <div>
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
      <InactiveList inactiveTutors={filteredTutors ? filteredTutors : inactiveTutors} getInactiveTutors={getInactiveTutors} />
    </div>
  )
}

export default Inactive;