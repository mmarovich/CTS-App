import React, {useState, useEffect} from "react";
import axios from 'axios';

import ActiveList from './active-tools/ActiveList';

const Active = (props) => {
  const [activeTutors, setActiveTutors] = useState();

  const getActiveTutors = async () => {
    const response = await axios.get("api/admin/activeTutors")
    const allActiveTutors = response.data;
    setActiveTutors(allActiveTutors);
  }

  useEffect(() => {
    getActiveTutors()
  }, [])

  return (
    <div>
      <ActiveList activeTutors={activeTutors} />
    </div>
  )
}

export default Active;