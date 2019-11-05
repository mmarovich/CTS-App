import React, {useState, useEffect} from "react";
import axios from 'axios';

import InactiveList from './inactive-tools/InactiveList';

const Inactive = (props) => {
  const [inactiveTutors, setInactiveTutors] = useState();

  const getInactiveTutors = async () => {
    const response = await axios.get("api/admin/inactiveTutors")
    const allInactiveTutors = response.data;
    setInactiveTutors(allInactiveTutors);
  }

  useEffect(() => {
    getInactiveTutors()
  }, [])

  useEffect(() => {
    console.log(inactiveTutors)
  }, [inactiveTutors])

  return (
    <div>
      <InactiveList inactiveTutors={inactiveTutors} getInactiveTutors={getInactiveTutors} />
    </div>
  )
}

export default Inactive;