import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
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
    const { value, id } = e.currentTarget;
    console.log(e.currentTarget)
    console.log(value)
    console.log(id)
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
      <Grid container>
        <Grid item xs={6}>
          <input
            type="text"
            className="search"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
        <Grid item xs={6} style={{display: 'flex', justifyContent: 'space-between'}}>
          <Button
            variant='outlined'
            color="primary"
            id="search"
            value="FSF"
            onClick={(e) => handleSearch(e)}
          >FSF</Button>
          <Button
            variant='outlined'
            color="primary"
            id="search"
            value="DV"
            onClick={(e) => handleSearch(e)}
          >DataViz</Button>
          <Button
            variant='outlined'
            color="primary"
            id="search"
            value="Cyber"
            onClick={(e) => handleSearch(e)}
          >Cyber</Button>
          <Button
            variant='outlined'
            color="primary"
            id="search"
            value="UXUI"
            onClick={(e) => handleSearch(e)}
          >UX/UI</Button>
          <Button
            variant='outlined'
            color="primary"
            id="search"
            value="FinTech"
            onClick={(e) => handleSearch(e)}
          >FinTech</Button>
          <Button
            variant='outlined'
            color="primary"
            id="reset"
            onClick={(e) => handleSearch(e)}
          >Reset</Button>
        </Grid>
      </Grid>
      <ActiveList activeTutors={filteredTutors ? filteredTutors : activeTutors} getActiveTutors={getActiveTutors}/>
    </div>
  )
}

export default Active;