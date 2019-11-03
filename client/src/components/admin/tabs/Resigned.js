import React from "react";

import ResignedList from './resigned-tools/ResignedList';

const Resigned = (props) => {

  const resignedTutors = props.tutors && props.tutors.filter((tutor, i) => {
    return tutor.accountStatus === "resigned";
  })

  return (
    <div>
      <ResignedList resignedTutors={resignedTutors} updateTutors={props.updateTutors} />
    </div>
  )
}

export default Resigned;