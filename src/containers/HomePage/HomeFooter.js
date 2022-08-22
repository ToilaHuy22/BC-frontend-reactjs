import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// Import css files

class HomeFooter extends Component {
  render() {
    return (
      <div className="home-footer">
        <p>
          BookingCare &copy; 2022{" "}
          <a href="https://github.com/ToilaHuy22" target="_blank">
            ToilaHuy22
          </a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
