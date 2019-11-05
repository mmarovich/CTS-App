import React, {useState, useEffect} from "react";
import axios from 'axios';

import OnholdList from './onhold-tools/OnholdList';

const OnHold = (props) => {
  const [onHoldTutors, setOnHoldTutors] = useState();
  
  const getOnHoldTutors = async () => {
    const response = await axios.get("/api/admin/holdTutors")
    const holdTutors = response.data;
    setOnHoldTutors(holdTutors);
  }

  useEffect(() => {
    getOnHoldTutors();
  }, [])

  return (
    <div>
      <OnholdList onHoldTutors={onHoldTutors} getOnHoldTutors={getOnHoldTutors} />
    </div>
  )
}

export default OnHold;