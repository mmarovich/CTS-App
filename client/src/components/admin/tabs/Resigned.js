import React, {useState, useEffect} from "react";
import axios from 'axios';

import ResignedList from './resigned-tools/ResignedList';

const Resigned = (props) => {
  const [resignedTutors, setResignedTutors] = useState()

  const getResignedTutors = async () => {
    const response = await axios.get("api/admin/resignTutors")
    const resignTutors = response.data;
    setResignedTutors(resignTutors)
  }

  useEffect(() => {
    getResignedTutors()
  }, [])

  return (
    <div>
      <ResignedList resignedTutors={resignedTutors} />
    </div>
  )
}

export default Resigned;