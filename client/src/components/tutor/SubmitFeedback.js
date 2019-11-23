import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const SubmitFeedback = () => {
  const classes = useStyles();

  return (
    <div>
      <h3>Submit Feedback!</h3>
      <form className={classes.container} noValidate autoComplete="off">
        <div>
          <TextField
            id="standard-basic"
            className={classes.textField}
            label="Standard"
            margin="normal"
          />
        </div>
        <div>
          <TextField
            id="filled-basic"
            className={classes.textField}
            label="Filled"
            margin="normal"
            variant="filled"
          />
        </div>
      </form>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

export default SubmitFeedback;