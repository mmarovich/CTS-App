import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const EarlyStudents = ({ earlyStudents, email, handleShowAlert }) => {
  const [state, setState] = useState({
    Early: false,
    NonEarly: false,
  });

  const handleChange = name => e => {
    let newEarly = earlyStudents;
    if (e.target.checked === true) {
      newEarly.push(name)
    } else {
      let index = earlyStudents.indexOf(name)
      newEarly.splice(index, 1)
    }
    savePTorFT(newEarly)

    setState({ ...state, [name]: e.target.checked });
  };

  const savePTorFT = async (earlyStudents) => {
    const response = await axios.put('api/account/earlyStudents', {
      earlyStudents, email
    })
    const msg = response.data
    handleShowAlert(msg)
  }

  const renderCheckboxes = () => {
    let newState = state;
    
    const checkBoxes = Object.keys(state).map((key, i) => {
      if (earlyStudents && earlyStudents.includes(key)) {
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
    <div style={{ padding: '0 10px 40px 10px' }}>
      <h6>Early or Mid/Late course students?</h6>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>

    </div>
  )
}

export default EarlyStudents;