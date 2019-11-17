import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const PTorFT = ({ PTorFTstudents, email, handleShowAlert }) => {
  const [state, setState] = useState({
    PT: false,
    FT: false,
  });

  const handleChange = name => e => {
    let newPTorFT = PTorFTstudents;
    if (e.target.checked === true) {
      newPTorFT.push(name)
    } else {
      let index = PTorFTstudents.indexOf(name)
      newPTorFT.splice(index, 1)
    }
    savePTorFT(newPTorFT)

    setState({ ...state, [name]: e.target.checked });
  };

  const savePTorFT = async (PTorFTstudents) => {
    const response = await axios.put('api/account/PTorFT', {
      PTorFTstudents, email
    })
    const msg = response.data
    handleShowAlert(msg)
  }

  const renderCheckboxes = () => {
    let newState = state;
    
    const checkBoxes = Object.keys(state).map((key, i) => {
      if (PTorFTstudents && PTorFTstudents.includes(key)) {
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
      <h6>Would you like Full-time and/or Part-time students?</h6>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>

    </div>
  )
}

export default PTorFT;