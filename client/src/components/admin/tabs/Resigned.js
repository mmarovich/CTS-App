import React, {useState, useEffect} from "react";
import { Row, Col } from 'reactstrap';
import axios from 'axios';

import ResignedList from './resigned-tools/ResignedList';

const Resigned = (props) => {
  const [resignedTutors, setResignedTutors] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredTutors, setFilteredTutors] = useState();

  const getResignedTutors = async () => {
    const response = await axios.get("api/admin/resignTutors")
    const resignTutors = response.data;
    setResignedTutors(resignTutors)
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchField(query);
    
    const q = query.toLowerCase();
    const newTutors = resignedTutors.filter((tutor) => {
      return Object.values(tutor).some( val => 
        String(val).toLowerCase().includes(q) 
      );
    })
    
    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    getResignedTutors()
  }, [])

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
      <ResignedList resignedTutors={filteredTutors ? filteredTutors : resignedTutors} />
    </div>
  )
}

export default Resigned;