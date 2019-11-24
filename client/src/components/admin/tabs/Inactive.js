import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import axios from 'axios';
import moment from 'moment';

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
      return Object.values(tutor).some(val =>
        String(val).toLowerCase().includes(q)
      );
    })

    setFilteredTutors(newTutors);

  }

  const get3MonthsInactive = () => {

    var now = moment(new Date()); //todays date

    const threeMonthsInactive = inactiveTutors.map((tutor, i) => {
      var end = moment(tutor.lastAssigned); // another date
      var duration = moment.duration(now.diff(end));
      var months = duration.asMonths();

      if (months > 3) {
        return <p key={i} style={{
          margin: '0 5px 0 0',
          fontSize: '10px',
          display: 'inline',
          backgroundColor: 'rgb(255, 153, 153)'
        }}>{tutor.firstName} {tutor.lastName}</p>
      } else {
        return null;
      }
    })

    return threeMonthsInactive;
  }

  useEffect(() => {
    getInactiveTutors()
  }, [])

  return (
    <div>
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
          <div>
            <h4>Tutors Inactive > 3 Months</h4>
            <div>{inactiveTutors && get3MonthsInactive()}</div>
          </div>
        </Grid>
      </Grid>
      <InactiveList inactiveTutors={filteredTutors ? filteredTutors : inactiveTutors} getInactiveTutors={getInactiveTutors} />
    </div>
  )
}

export default Inactive;