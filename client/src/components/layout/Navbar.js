import React, { Component } from "react";
// import { Link } from "react-router-dom";

class Navbar extends Component {
  render() {
    return (
      <div style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "lightgrey"
      }}>
        <div className="logo">
          <h6>Central Tutor Support</h6>
        </div>
        <button
          onClick={this.props.onLogoutClick}
          className="btn waves-effect waves-light hoverable blue accent-3"
        >
          Logout
            </button>
      </div>
    );
  }
}

export default Navbar;
