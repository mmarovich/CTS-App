import React, { useState } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const StudentType = ({curriculum, email, handleShowAlert}) => {
  const [state, setState] = useState({
    FSF: false,
    DV: false,
    UXUI: false,
    Cyber: false,
    FinTech: false
  });

  const handleChange = name => e => {
    let newCurriculum = curriculum;
    if (e.target.checked === true) {
      newCurriculum.push(name)
    } else {
      let index = curriculum.indexOf(name)
      newCurriculum.splice(index, 1)
    }
    saveCurrics(newCurriculum)

    setState({ ...state, [name]: e.target.checked });
  };

  const saveCurrics = async (curriculum) => {
    const response = await axios.put('api/account/curriculum', {
      curriculum, email
    })
    const msg = response.data
    handleShowAlert(msg)
  }

  const renderCheckboxes = () => {
    let newState = state;
    
    const checkBoxes = Object.keys(state).map((key, i) => {
      if (curriculum && curriculum.includes(key)) {
        newState[key] = true
      } else {
        newState[key] = false
      }
      return <FormControlLabel
        key={i}
        style={{ margin: 0, textAlign: 'center' }}
        control={
          <Checkbox checked={state[key]} onChange={handleChange(key)} value={key} color="primary" />
        }
        label={key}
      />
    })
    return checkBoxes;
  }

  return (
    <div style={{padding: '0 10px 40px 10px'}}>
      <h6>What curriculums do you feel confident tutoring?</h6>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>
    </div >

  )
}

export default StudentType;