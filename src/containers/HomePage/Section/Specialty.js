import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// Import css files

class Specialty extends Component {
  render() {
    return (
      <div className="section-share section-specialty">
        <div className="section-container container">
          <div className="section-header">
            <span className="section-title">Chuyên Khoa Phổ Biến</span>
            <button className="section-more">Xem Thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="section-item">
                <div className="img section-specialty" />
                <p>Cơ xương khớp</p>
              </div>
            </Slider>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Specialty);
