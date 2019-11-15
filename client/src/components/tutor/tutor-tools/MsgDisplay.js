import React from 'react';

const MsgDisplay = ({ showAlert, msg }) => {

  return (
    <div className={`alert alert-primary ${showAlert ? 'alert-shown' : 'alert-hidden'}`}>
      <strong>{msg}</strong>
    </div>
  )
}

export default MsgDisplay;