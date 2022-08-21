import React, { Component } from "react";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";

import Slider from "react-slick";
// Import css files

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-handbook">
        <div className="section-container container">
          <div className="section-header">
            <span className="section-title">Cẩm nang</span>
            <button className="section-more">Tất cả bài viết</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
              </div>
              <div className="section-item handbook">
                <div className="img section-handbook" />
                <p>Nha khoa New Gate: Ưu đãi đến 50% tất cả dịch vụ nha khoa</p>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
