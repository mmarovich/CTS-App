import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import TextField from '@material-ui/core/TextField';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <Grid container style={{ height: "75vh" }} justify="center" alignItems="center" >
        <Grid item xs={10} sm={6} container>
          <Grid item>
            <Link to="/" className="btn-flat waves-effect">
              <Grid item container alignItems="center">
                <KeyboardBackspaceRoundedIcon style={{ fontSize: 40 }} />
                Back to home
              </Grid>
            </Link>
          </Grid>
          <Grid item xs={12} container justify="center">
            <Grid item xs={12} container justify="center">
              <h4 style={{ margin: 0 }}>
                Login below
              </h4>
            </Grid>
            <Grid item xs={12} container justify="center">
              <p className="grey-text text-darken-1">
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </Grid>
          </Grid>
          <Grid item container>
            <form noValidate onSubmit={this.onSubmit} style={{ width: "100%" }}>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="email"
                  className={classnames("", {
                    invalid: errors.email || errors.emailnotfound
                  })}
                  label="Email"
                  type="email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
                <span style={styles.warning}>
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="password"
                  className={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                  label="Password"
                  type="password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <span style={{ color: "red" }}>
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              <Grid item xs={12} container justify="center" style={{ marginTop: 10 }}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                >
                  Login
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}

const styles = {
  warning: {
    color: "red"
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);
