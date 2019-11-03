import React from "react";

import OnholdList from './onhold-tools/OnholdList';

const OnHold = (props) => {
  console.log(props.tutors)
  const onHoldTutors = props.tutors && props.tutors.filter((tutor, i) => {
    return tutor.accountStatus === "hold";
  })

  return (
    <div>
      <OnholdList tutors={onHoldTutors} updateTutors={props.updateTutors} />
    </div>
  )
}

export default OnHold;