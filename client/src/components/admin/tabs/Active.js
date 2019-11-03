import React, { Component } from "react";

import ActiveList from './active-tools/ActiveList';

const Active = (props) => {
  console.log(props.tutors)
  const activeTutors = props.tutors && props.tutors.filter((tutor, i) => {
    return tutor.accountStatus === "active";
  })

  console.log(activeTutors)

  return (
    <div>
      <ActiveList activeTutors={activeTutors} updateTutors={props.updateTutors} />
    </div>
  )
}

export default Active;