import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';

const DayPreferences = ({daysAvailable, email, handleShowAlert}) => {
  const [state, setState] = useState({
    Mondays: false,
    Tuesdays: false,
    Wednesdays: false,
    Thursdays: false,
    Fridays: false,
    Saturdays: false,
    Sundays: false
  });

  const handleChange = name => e => {
    let newDaysAvailable = daysAvailable;
    if (e.target.checked === true) {
      newDaysAvailable.push(name)
    } else {
      let index = daysAvailable.indexOf(name)
      newDaysAvailable.splice(index, 1)
    }
    saveDays(newDaysAvailable)

    setState({ ...state, [name]: e.target.checked });
  };

  const saveDays = async (daysAvailable) => {
    const response = await axios.put('api/account/daysAvailable', {
      daysAvailable, email
    })
    const msg = response.data
    handleShowAlert(msg)
  }

  const renderCheckboxes = () => {
    let newState = state;
    
    const checkBoxes = Object.keys(state).map((key, i) => {
      if (daysAvailable && daysAvailable.includes(key)) {
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

  return(
    <div style={{padding: '0 10px 40px 10px'}}>
      <h1>Days Available</h1>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>
    </div >
  )
}

export default DayPreferences;