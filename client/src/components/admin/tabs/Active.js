import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
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
    <div style={{margin: 10}}>
      <Grid container justify="space-between">
        <Grid item xs={5}>
          <TextField
            style={{ width: "100%" }}
            id="search"
            type="text"
            label="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
        <Grid item xs={6} container justify="space-between" alignItems="center">
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="search"
            value="FSF"
            onClick={(e) => handleSearch(e)}
          >FSF</Button>
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="search"
            value="DV"
            onClick={(e) => handleSearch(e)}
          >DataViz</Button>
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="search"
            value="Cyber"
            onClick={(e) => handleSearch(e)}
          >Cyber</Button>
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="search"
            value="UXUI"
            onClick={(e) => handleSearch(e)}
          >UX/UI</Button>
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="search"
            value="FinTech"
            onClick={(e) => handleSearch(e)}
          >FinTech</Button>
          <Button
            variant='outlined'
            color="primary"
            style={styles.activeButton}
            id="reset"
            onClick={(e) => handleSearch(e)}
          >Reset</Button>
        </Grid>
      </Grid>
      <ActiveList activeTutors={filteredTutors ? filteredTutors : activeTutors} getActiveTutors={getActiveTutors}/>
    </div>
  )
}

const styles = {
  activeButton: {
    width: 50, 
    height: 30, 
    fontSize: 12
  }
}

export default Active;