import React from 'react';
import Grid from '@material-ui/core/Grid';

import InactiveRow from './InactiveRow';

const InactiveList = (props) => {

  const renderTutors = () => {
    if (props.inactiveTutors) {
      return props.inactiveTutors.map((tutor, i) => {
        return <InactiveRow tutor={tutor} key={i} id={i} getInactiveTutors={props.getInactiveTutors} />
      })
    } else {
      return;
    }
  }

  return (
    <div>
      <Grid container style={styles.headerStyles}>
        <Grid item xs={2}>Name</Grid>
        <Grid item xs={2}>Email</Grid>
        <Grid item xs={2}>Timezone</Grid>
        <Grid item xs={2}>Last Assigned</Grid>
        <Grid item xs={2}>Wanted</Grid>
      </Grid>
      {renderTutors()}
    </div>
  )
}

const styles = {
  headerStyles: {
    fontSize: '12px',
    fontWeight: 'bold'
  },
  rowFont: {
    fontSize: '10px',
    marginBottom: '0',
    overflowWrap: 'break-word',
    backgroundColor: 'lightgrey',
    margin: '0 0 1px 0'
  }
}

export default InactiveList;