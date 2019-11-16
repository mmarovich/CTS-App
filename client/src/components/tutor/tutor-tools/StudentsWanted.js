import React, {useState, useEffect} from 'react';
import axios from 'axios';

const StudentsWanted = ({studentsWanted, email, handleShowAlert}) => {
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

    handleShowAlert(msg)
  }

  return (
    <div style={{padding: '0 10px 40px 10px'}}>
      <h2>Students Wanted!</h2>

        <input
        value={field}
        onChange={changeField}
      /> 
      <button
        onClick={submitWanted}
      >Set</button>
    </div> 
  )
}

export default StudentsWanted;