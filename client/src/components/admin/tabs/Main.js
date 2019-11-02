import React from "react";

import TutorList from './main-tools/TutorList';

const Main = (props) => {

  console.log(props.tutors)
  return (
    <div>
      <TutorList tutors={props.tutors} />
    </div>
  )
}

export default Main;