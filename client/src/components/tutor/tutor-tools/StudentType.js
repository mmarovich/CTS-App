import React, { useState, useEffect } from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const StudentType = (props) => {
  const { curriculum, email } = props;
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
    let newCurriculum;
    if (e.target.checked === true) {
      newCurriculum = curriculum;
      newCurriculum.push(name)
    } else {
      let index = curriculum.indexOf(name)
      console.log(index)
      newCurriculum = curriculum;
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
    console.log(msg)
  }

  const renderCheckboxes = () => {
    console.log(state)
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
    <div>
      <h1>Student Type!</h1>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>
    </div >

  )
}

export default StudentType;