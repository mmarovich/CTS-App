import React from "react";

import ActiveList from './active-tools/ActiveList';

const Active = (props) => {

  const activeTutors = props.tutors && props.tutors.filter((tutor, i) => {
    return tutor.accountStatus === "active";
  })

  return (
    <div>
      <ActiveList activeTutors={activeTutors} updateTutors={props.updateTutors} />
    </div>
  )
}

export default Active;