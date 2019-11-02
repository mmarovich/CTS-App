import React from 'react';

const TutorList = (props) => {
  console.log(props.tutors)
  
  const renderTutors = () => {
    console.log(props.tutors)
    if (props.tutors) {
      return props.tutors.map((tutor, i) => {
        return <div key={i}>
          {tutor.firstName}
        </div>
      })
    } else {
      return;
    }
  }

  return (
    <div>
      {renderTutors()}
    </div>
  )
}

export default TutorList;