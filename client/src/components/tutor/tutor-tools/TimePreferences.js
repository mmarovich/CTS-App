import React, {useState} from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import axios from 'axios';
import moment from 'moment';

const TimePreferences = ({timesAvailable, email, handleShowAlert}) => {
  const [state, setState] = useState({
    "01": false, "02": false, "03": false, "04": false,
    "05": false, "06": false, "07": false, "08": false,
    "09": false, "10": false, "11": false, "12": false,
    "13": false, "14": false, "15": false, "16": false,
    "17": false, "18": false, "19": false, "20": false,
    "21": false, "22": false, "23": false, "24": false
  });

  const handleChange = name => e => {
    let newTimesAvailable = timesAvailable;
    if (e.target.checked === true) {
      newTimesAvailable.push(name)
    } else {
      let index = timesAvailable.indexOf(name)
      newTimesAvailable.splice(index, 1)
    }
    saveTimes(newTimesAvailable)

    setState({ ...state, [name]: e.target.checked });
  };

  const saveTimes = async (timesAvailable) => {
    const response = await axios.put('api/account/timesAvailable', {
      timesAvailable, email
    })
    const msg = response.data
    handleShowAlert(msg)
  }


  const renderCheckboxes = () => {
    let newState = state;

    const sortedCheckboxes = Object.keys(state).sort((a, b) => {
      return parseInt(a) - parseInt(b);
    });
    
    const checkBoxes = sortedCheckboxes.map((key, i) => {
      if (timesAvailable && timesAvailable.includes(key)) {
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
        label={moment(`${key}:00`, 'HH:mm').format('h:mma')}
      />
    })

    return checkBoxes;
  }

  return (
    <div style={{padding: '0 10px 40px 10px'}}>
      <h6>Times Available</h6>
      <FormGroup style={{ alignItems: 'center' }} row>
        {renderCheckboxes()}
      </FormGroup>
    </div >
  )
}

export default TimePreferences;