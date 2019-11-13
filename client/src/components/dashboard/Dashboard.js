import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

import Navbar from "../../components/layout/Navbar";
import Admin from "../admin/Admin";
import TutorPortal from '../tutor/TutorPortal';

class Dashboard extends Component {
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    return (
      <div>
        <Navbar onLogoutClick={this.onLogoutClick} />
        {
          user.level === "admin" ?
          <Admin />
          
          :

          <TutorPortal />
        }
        
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
