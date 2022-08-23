import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-container container section-about-container">
          <div className="section-header section-header-about">
            <div className="section-title">Truyền thông nói về BookingCare</div>
          </div>
          <div className="section-body section-body-about">
            <div className="video">
              <iframe
                width="570"
                height="321"
                src="https://www.youtube.com/embed/FyDQljKtWnI"
                title="CÀ PHÊ KHỞI NGHIỆP VTV1 - BOOKINGCARE - HỆ THỐNG ĐẶT LỊCH KHÁM TRỰC TUYẾN"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div className="detail">
              <p>
                " <span>BookingCare</span> là nền tảng tập trung vào việc đặt
                khám chuyên khoa, kết nối bệnh nhân với bác sĩ, cơ sở y tế và
                giúp trải nghiệm đi khám của người bệnh được tốt hơn, hiệu quả
                hơn. Đồng thời, góp phần giải quyết vấn đề quá tải của các bệnh
                viện hiện nay"
              </p>
              <div className="more">
                <a
                  className="more-link"
                  href="https://vtc.vn/dat-kham-chuyen-khoa-va-hanh-trinh-ho-tro-cac-benh-vien-qua-tai-ar434101.html"
                  target="_blank"
                >
                  Nhiều hơn về BookingCare...
                </a>
              </div>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
