import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
      return Object.values(tutor).some(val =>
        String(val).toLowerCase().includes(q)
      );
    })

    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    getResignedTutors()
  }, [])

  return (
    <div style={{margin: 10}}>
      <Grid container>
        <Grid item xs={6}>
          <TextField
            style={{ width: "100%" }}
            id="search"
            type="text"
            label="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
      <ResignedList resignedTutors={filteredTutors ? filteredTutors : resignedTutors} />
    </div>
  )
}

export default Resigned;