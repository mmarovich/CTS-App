import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const StudentType = (props) => {
  const { curriculum } = props;
  const [state, setState] = useState({
    FSF: false,
    DV: false,
    UXUI: false,
    Cyber: false,
    FinTech: false
  });

  useEffect(() => {
    console.log(state)
  }, [state])

  const handleChange = name => e => {
    setState({ ...state, [name]: e.target.checked });
  };

  const renderCheckboxes = () => {

    return Object.keys(state).map((key, i) => {
      return <FormControlLabel
        key={i}
        style={{ margin: 0, textAlign: 'center' }}
        control={
          <Checkbox checked={state[key]} onChange={handleChange(key)} value={key} color="primary" />
        }
        label={key}
      />
    })
  }

  return (
    <div>
      <h1>Student Type!</h1>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>
    </div >

  )
}

export default StudentType;