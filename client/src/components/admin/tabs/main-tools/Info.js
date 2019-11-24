import React from 'react';

import Grid from '@material-ui/core/Grid';

const Info = (props) => {

  const getActiveTutors = (status) => {
    const activeTutors = props.allTutors.filter((tutor, i) => {
      return tutor.accountStatus === status
    })

    return activeTutors.length
  }

  return (
    <div style={{ backgroundColor: 'lightgrey', padding: '5px' }}>
      {props.allTutors &&
        <Grid container>
          <Grid
            item
            container
            xs={12}
            justify="center"
          ><strong>Total--- </strong> {props.allTutors.length}
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="center"
          ><strong>Active---</strong> {getActiveTutors('active')}
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="center"
          ><strong>On Hold---</strong> {getActiveTutors('hold')}
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="center"
          ><strong>Inactive---</strong> {getActiveTutors('inactive')}
          </Grid>
          <Grid
            item
            container
            xs={12}
            justify="center"
          ><strong>Resigned---</strong> {getActiveTutors('resigned')}
          </Grid>
        </Grid>}
    </div>
  )
}

export default Info;