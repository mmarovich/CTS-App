import React from "react";

import InactiveList from './inactive-tools/InactiveList';

const Inactive = (props) => {

  const inactiveTutors = props.tutors && props.tutors.filter((tutor, i) => {
    return tutor.accountStatus === "inactive";
  })

  return (
    <div>
      <InactiveList inactiveTutors={inactiveTutors} updateTutors={props.updateTutors} />
    </div>
  )
}

export default Inactive;