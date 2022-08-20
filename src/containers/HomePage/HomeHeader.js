import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";

class HomeHeader extends Component {
  render() {
    return (
      <>
        <div className="home-header-container ">
          <div className="home-header-content container">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div className="header-logo"></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="">
                  <b>Chuyên khoa</b>
                </div>
                <div className="subs-title">Tìm bác sĩ theo chuyên khoa</div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>Cơ sở y tế</b>
                </div>
                <div className="subs-title">Chọn bệnh viện phòng khám</div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>Bác sĩ</b>
                </div>
                <div className="subs-title">Chọn bác sĩ giỏi</div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>Gói khám</b>
                </div>
                <div className="subs-title">Khám sức khỏe tổng quát</div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                Hỗ trợ
              </div>
              <div className="flag">VN</div>
            </div>
          </div>
        </div>
        <div className="home-header-banner">
          <div>
            <div className="search">
              <div className="contain">
                <h1>
                  Nền tảng y tế <br />
                  <b>chăm sóc sức khỏe toàn diện</b>
                </h1>
                <div className="search-form">
                  <i class="fas fa-search"></i>
                  <input type="text" placeholder="Tìm chuyên khoa khám bệnh" />
                </div>
                <div className="link">
                  <a href="">
                    <img
                      className="link-img"
                      src="https://bookingcare.vn/assets/icon/google-play-badge.svg"
                      alt=""
                    />
                  </a>
                  <a href="">
                    <img
                      className="link-img"
                      src="https://bookingcare.vn/assets/icon/app-store-badge-black.svg"
                      alt=""
                    />
                  </a>
                </div>
              </div>
            </div>
            <div className="options">
              <ul className="options-list">
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url("https://cdn.bookingcare.vn/fo/2021/12/08/133537-khamchuyenkhoa.png")`,
                      }}
                    ></div>
                    Khám Chuyên Khoa
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('https://cdn.bookingcare.vn/fo/2021/12/08/133657-khamtuxa.png')`,
                      }}
                    ></div>
                    Khám từ xa
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('	https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtongquat.png')`,
                      }}
                    ></div>
                    Khám tổng quát
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('https://cdn.bookingcare.vn/fo/2021/12/08/133744-dichvuxetnghiem.png')`,
                      }}
                    ></div>
                    Xét nghiệm y học
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('	https://cdn.bookingcare.vn/fo/2021/12/08/133744-suckhoetinhthan.png')`,
                      }}
                    ></div>
                    Sức khỏe tinh thần
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/05/19/104635-khamnhakhoa.png')`,
                      }}
                    ></div>
                    Khám nha khoa
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/05/16/151930-phau-thuat.jpg')`,
                      }}
                    ></div>
                    Gói phẫu thuật
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('	https://cdn.bookingcare.vn/fo/2021/12/08/133744-khamtainha.png')`,
                      }}
                    ></div>
                    Sản phẩm y tế
                  </a>
                </li>
                <li className="options-item">
                  <a href="">
                    <div
                      className="options-img"
                      style={{
                        backgroundImage: `url('https://cdn.bookingcare.vn/fo/2022/07/29/101157-icon-lich-su.jpg')`,
                      }}
                    ></div>
                    Sức khỏe
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </>
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

export default connect(mapStateToProps, mapDispatchToProps)(HomeHeader);
