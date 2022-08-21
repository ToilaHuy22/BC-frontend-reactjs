import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";

class OutStandingDoctor extends Component {
  render() {
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container container">
          <div className="section-header">
            <span className="section-title">Bác sĩ nổi bật tuần qua</span>
            <button className="section-more">Tìm Kiếm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
              </div>
              <div className="section-item doctor">
                <div className="img section-outstanding-doctor" />
                <div className="detail">
                  <span>Giáo Sư Tiến Sĩ Nguyễn Văn Huy</span>
                  <br />
                  <span>FrontEnd Dev</span>
                </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor);
