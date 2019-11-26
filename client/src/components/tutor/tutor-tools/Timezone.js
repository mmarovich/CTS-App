import React, { useState, useEffect } from 'react';
import moment from 'moment';
import axios from 'axios';

import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { useAlert } from 'react-alert'

const Timezone = ({email, savedTimezone, handleShowAlert}) => {
  const alert = useAlert()
  const [timezone, setTimezone] = useState(savedTimezone);
  const [time, setTime] = useState(moment.tz(moment(), timezone).format('h:mm:ss A'));

  const timezones = [
    "America/Los_Angeles",
    "America/Phoenix",
    "America/Denver",
    "America/Chicago",
    "America/New_York",
    "Europe/London",
    "Australia/Perth",
    "Australia/Melbourne"
  ]

  useEffect(() => {
    let timer1 = setTimeout(() => {
      setTime(moment.tz(moment(), timezone).format('h:mm:ss A'))   
    }, 1000)

    return () => {
      clearTimeout(timer1)
    }
  }, [time])

  const saveTimezone = async(newTimezone) => {
    const response = await axios.put('api/account/timezone', {
      email, timezone: newTimezone
    })
    const msg = response.data;
    alert.show(msg)
  }

  const handleChange = e => {
    const { value } = e.target;
    setTimezone(value);
    saveTimezone(value)
  };

  return (
    <div style={{textAlign: 'center', margin: 10, padding: 20, border: '2px solid black'}}>

      <FormControl style={{ width: '100%' }}>
        <InputLabel id="demo-simple-select-label">Timezone</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={timezone}
          onChange={handleChange}
        >
          {
            timezones.map((timezone, i) => {
              return <MenuItem 
                key={i}
                value={timezone}
              >{timezone}</MenuItem>
            })
          }
        </Select>
      </FormControl>
      <h6>{time}</h6>
    </div>
  )
}

export default Timezone;