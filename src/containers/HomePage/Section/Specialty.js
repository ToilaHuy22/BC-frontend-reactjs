import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class Specialty extends Component {
  render() {
    let settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      //auto scroll
      autoplay: true,
      speed: 500,
      autoplaySpeed: 6000,
      cssEase: "linear",
    };
    return (
      <div className="section-speciality">
        <div className="specialty-container container">
          <div className="specialty-header">
            <span className="specialty-title">Chuyên Khoa Phổ Biến</span>
            <button className="specialty-more">Xem Thêm</button>
          </div>
          <div className="specialty-body">
            <Slider {...settings}>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
                <p>Cơ xương khớp</p>
              </div>
              <div className="specialty-item">
                <div className="img" />
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
