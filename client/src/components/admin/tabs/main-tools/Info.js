import React from 'react';

const Info = (props) => {

  const getActiveTutors = (status) => {
    const activeTutors = props.tutors.filter((tutor, i) => {
      return tutor.accountStatus === status
    })

    return activeTutors.length
  }

  return (
    <div style={{backgroundColor: 'lightgrey', padding: '5px'}}>
      {props.tutors && 
      <ul style={{margin: '0', textAlign: 'center'}}>
        <li><b>Total</b> {props.tutors.length}</li>
        <li><b>Active</b> {getActiveTutors('active')}</li>
        <li><b>On Hold</b> {getActiveTutors('hold')}</li>
        <li><b>Inactive</b> {getActiveTutors('inactive')}</li>
        <li><b>Resigned</b> {getActiveTutors('resigned')}</li>
      </ul>}
    </div>
  )
}

export default Info;