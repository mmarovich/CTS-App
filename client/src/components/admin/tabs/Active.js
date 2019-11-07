import React, { useState, useEffect } from "react";
import { Row, Col, Button } from 'reactstrap';
import axios from 'axios';

import ActiveList from './active-tools/ActiveList';

const Active = (props) => {
  const [activeTutors, setActiveTutors] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredTutors, setFilteredTutors] = useState();

  const getActiveTutors = async () => {
    const response = await axios.get("api/admin/activeTutors")
    const allActiveTutors = response.data;
    setFilteredTutors(null)
    setActiveTutors(allActiveTutors);
  }

  const handleSearch = (e) => {
    const { id, value } = e.target
    if (id === "search" || id === "reset") {
      setSearchField(value);

      const q = value.toLowerCase();
      const newTutors = activeTutors.filter((tutor) => {
        return Object.values(tutor).some(val =>
          String(val).toLowerCase().includes(q)
        );
      })

      setFilteredTutors(newTutors);

    } else if (id) {
      const newTutors = activeTutors.filter((tutor) => {
        return tutor.curriculum.includes(id)
      })
      
      setFilteredTutors(newTutors);
    }
  }

  useEffect(() => {
    getActiveTutors()
  }, [])

  return (
    <div>
      <Row>
        <Col xs={6}>
          <input
            type="text"
            id="search"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Col>
        <Col xs={6} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            outline
            color="secondary"
            id="FSF"
            onClick={(e) => handleSearch(e)}
          >FSF</Button>
          <Button
            outline
            color="secondary"
            id="DV"
            onClick={(e) => handleSearch(e)}
          >DataViz</Button>
          <Button
            outline
            color="secondary"
            id="Cyber"
            onClick={(e) => handleSearch(e)}
          >Cyber</Button>
          <Button
            outline
            color="secondary"
            id="UXUI"
            onClick={(e) => handleSearch(e)}
          >UX/UI</Button>
          <Button
            outline
            color="secondary"
            id="FinTech"
            onClick={(e) => handleSearch(e)}
          >FinTech</Button>
          <Button
            outline
            color="secondary"
            id="reset"
            onClick={(e) => handleSearch(e)}
          >Reset</Button>
        </Col>
      </Row>
      <ActiveList activeTutors={filteredTutors ? filteredTutors : activeTutors} />
    </div>
  )
}

export default Active;