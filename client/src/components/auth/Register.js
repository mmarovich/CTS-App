import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import KeyboardBackspaceRoundedIcon from '@material-ui/icons/KeyboardBackspaceRounded';
import TextField from '@material-ui/core/TextField';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Register page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
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

    const newUser = {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  render() {
    const { errors } = this.state;

    return (
      <Grid container style={{ height: "75vh" }} justify="center" alignItems="center" >
        <Grid item xs={10} sm={6} container>
          <Grid item>
            <Link to="/" className="btn-flat waves-effect">
              <KeyboardBackspaceRoundedIcon style={{ fontSize: 40 }} />Back to
              home
            </Link>
          </Grid>
          <Grid item xs={12} container justify="center" style={{ paddingLeft: "11.250px" }}>
            <Grid item xs={12} container justify="center">
              <h4 style={{ margin: 0 }}>
                <b>Register</b> below
              </h4>
            </Grid>
            <Grid item xs={12} container justify="center" >
              <p className="grey-text text-darken-1">
                Already have an account? <Link to="/login">Log in</Link>
              </p>
            </Grid>
          </Grid>
          <Grid item container>
            <form noValidate onSubmit={this.onSubmit} style={{ width: "100%" }}>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="firstName"
                  className={classnames("", {
                    invalid: errors.firstName
                  })}
                  label="First Name"
                  onChange={this.onChange}
                  value={this.state.firstName}
                  error={errors.firstName}
                />
                <span className="red-text">{errors.firstName}</span>
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="lastName"
                  className={classnames("", {
                    invalid: errors.lastName
                  })}
                  label="Last Name"
                  onChange={this.onChange}
                  value={this.state.lastName}
                  error={errors.lastName}
                />
                <span className="red-text">{errors.lastName}</span>
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                  label="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                />
                <span className="red-text">{errors.email}</span>
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                  label="Password"
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                />
                <span className="red-text">{errors.password}</span>
              </div>
              <div>
                <TextField
                  style={{ width: "100%" }}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                  label="Confirm Password"
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                />
                <span className="red-text">{errors.password2}</span>
              </div>
              <Grid item xs={12} container justify="center" style={{marginTop: 10}}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Sign up
                </Button>
              </Grid>
            </form>
          </Grid>
        </Grid>
      </Grid >
    );
  }
}

Register.propTypes = {
  registerUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { registerUser }
)(withRouter(Register));
