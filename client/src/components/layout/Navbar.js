import React, { Component } from "react";
// import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
  render() {
    return (
      <Grid container justify="space-around" alignItems="center" style={{ backgroundColor: 'lightgrey' }}>
        <Grid item container xs={5} justify="flex-start">
          <h3>Central Tutor Support</h3>
        </Grid>
        <Grid item container xs={5} justify="flex-end">
          <Button
            variant='contained'
            color="primary"
            style={{ height: 50 }}
            onClick={this.props.onLogoutClick}
          >Logout</Button>
        </Grid>
      </Grid>
    );
  }
}

export default Navbar;
