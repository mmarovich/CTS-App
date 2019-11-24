import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

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
      return Object.values(tutor).some(val =>
        String(val).toLowerCase().includes(q)
      );
    })

    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    getAllTutors();
  }, [])

  return (
    <div>
      <Grid container spacing={3}>
        <Grid item xs={6}>

        </Grid>
        <Grid item xs={6}>
          <Info allTutors={filteredTutors ? filteredTutors : allTutors} />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <TextField
            style={{width: "100%"}}
            type="text"
            label="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
    <TutorList allTutors={filteredTutors ? filteredTutors : allTutors} />
    </div >
  )
}

export default Main;