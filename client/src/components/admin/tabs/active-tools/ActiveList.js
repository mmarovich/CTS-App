import React from 'react';
import Grid from '@material-ui/core/Grid';

import ActiveRow from './ActiveRow';

const ActiveList = (props) => {

  const renderTutors = () => {
    if (props.activeTutors) {
      return props.activeTutors.map((tutor, i) => {
        return <ActiveRow tutor={tutor} i={i} key={i} getActiveTutors={props.getActiveTutors} />
      })
    } else {
      return;
    }
  }

  return (
    <div style={{marginTop: 10}}>
      <Grid container style={styles.headerStyles}>
        <Grid item xs={1}>Queue</Grid>
        <Grid item xs={2}></Grid>
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

export default ActiveList;