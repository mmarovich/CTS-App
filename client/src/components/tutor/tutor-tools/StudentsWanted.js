import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAlert } from 'react-alert'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const StudentsWanted = ({ studentsWanted, email, handleShowAlert }) => {
  const alert = useAlert()
  const [field, setField] = useState("")

  useEffect(() => {
    setField(studentsWanted)
  }, [])

  const changeField = (e) => {
    setField(e.target.value);
  }

  const submitWanted = async () => {
    console.log(field)
    const response = await axios.put('api/account/studentsWanted', {
      email,
      studentsWanted: field
    })

    const msg = response.data;

    alert.show(msg)
  }

  return (
    <div style={{textAlign: 'center', margin: 10, border: '2px solid black'}}>
      <h6>How many <em>more</em> students do you want?</h6>

      <TextField
        style={{ width: "100%" }}
        type="text"
        label={<div>Add <em>n</em> students...</div>}
        value={field}
        onChange={changeField}
      />
      <Button
        style={{ marginTop: 10 }}
        variant='contained'
        color="primary"
        size="small"
        onClick={submitWanted}
      >Set</Button>
    </div>
  )
}

export default StudentsWanted;