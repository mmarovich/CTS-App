import React, { Component } from "react";
import { Link } from "react-router-dom";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';


class Landing extends Component {
  render() {
    return (
      <Grid container style={{height: "75vh"}} justify="center" alignItems="center" >
        <Grid item xs={12} container justify="center" alignItems="center">
          <h2 style={{textAlign: "center"}}>
            Welcome to the Central Tutor Support Portal!
          </h2>
        </Grid>
        <Grid container justify="space-around">
          <Grid item container justify="center" xs={4}>
            <Link to="/register" style={{ color: 'white', width: "100%", textDecoration: "none" }}>
              <Button size="large" variant="contained" color="primary" fullWidth>
                Register
                </Button>
            </Link>
          </Grid>
          <Grid item xs={4} container justify="center">
            <Link to="/login" style={{ textDecoration: "none", width: "100%", color: "white" }}>
              <Button size="large" variant="contained" color="secondary" fullWidth>
                Log In
                </Button>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}

export default Landing;
