import React, {useState, useEffect} from "react";
import Grid from '@material-ui/core/Grid';
import axios from 'axios';

import OnholdList from './onhold-tools/OnholdList';

const OnHold = () => {
  const [onHoldTutors, setOnHoldTutors] = useState();
  const [searchField, setSearchField] = useState("");
  const [filteredTutors, setFilteredTutors] = useState();
  
  const getOnHoldTutors = async () => {
    const response = await axios.get("/api/admin/holdTutors")
    const holdTutors = response.data;
    setFilteredTutors(null)
    setOnHoldTutors(holdTutors);
  }

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchField(query);
    
    const q = query.toLowerCase();
    const newTutors = onHoldTutors.filter((tutor) => {
      return Object.values(tutor).some( val => 
        String(val).toLowerCase().includes(q) 
      );
    })
    
    setFilteredTutors(newTutors);

  }

  useEffect(() => {
    getOnHoldTutors();
  }, [])

  return (
    <div>
      <Grid container>
        <Grid item xs={6}>
          <input
            type="text"
            placeholder="Search..."
            value={searchField}
            onChange={(e) => handleSearch(e)}
          />
        </Grid>
        <Grid item xs={6}>

        </Grid>
      </Grid>
      <OnholdList onHoldTutors={filteredTutors ? filteredTutors : onHoldTutors} getOnHoldTutors={getOnHoldTutors} />
    </div>
  )
}

export default OnHold;