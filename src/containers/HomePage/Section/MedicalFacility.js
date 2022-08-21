import React, { Component } from "react";

import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";

import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-container container">
          <div className="section-header">
            <span className="section-title">Cơ sở y tế nổi bật</span>
            <button className="section-more">Tìm Kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
              </div>
              <div className="section-item">
                <div className="img section-medical-facility" />
                <p>Bệnh viện chợ Rẫy</p>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
