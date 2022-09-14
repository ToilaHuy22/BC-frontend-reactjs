import React, { Component } from 'react';
import { connect } from 'react-redux';
import './HomeHeader.scss';
import { FormattedMessage } from 'react-intl';
import { LANGUAGES } from '../../utils/constant.js';
import { changeLanguageApp } from '../../store/actions';
import { withRouter } from 'react-router';
class HomeHeader extends Component {
  changeLanguage = (language) => {
    this.props.changeLanguageAppRedux(language);
  };

  returnToHome = () => {
    if (this.props.history) {
      this.props.history.push(`/home`);
    }
  };
  render() {
    let language = this.props.language;

    return (
      <>
        <div className="home-header-container ">
          <div className="home-header-content container">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div className="header-logo" onClick={() => this.returnToHome()}></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id={'homeheader.speciality'} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={'homeheader.searchdoctor'} />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id={'homeheader.health-facility'} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={'homeheader.select-room'} />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    {' '}
                    <FormattedMessage id={'homeheader.doctor'} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={'homeheader.select-doctor'} />
                </div>
              </div>
              <div className="child-content">
                <div className="">
                  <b>
                    <FormattedMessage id={'homeheader.fee'} />
                  </b>
                </div>
                <div className="subs-title">
                  <FormattedMessage id={'homeheader.check-health'} />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i className="fas fa-question-circle"></i>
                <FormattedMessage id={'homeheader.support'} />
              </div>
              <div className="language">
                <div className={language === LANGUAGES.VI ? 'language-vi active' : 'language-vi'}>
                  <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>VI</span>
                </div>
                <div className={language === LANGUAGES.EN ? 'language-en active' : 'language-en'}>
                  <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>EN</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.props.isShowBanner === true && (
          <div className="home-header-banner">
            <div>
              <div className="search">
                <div className="contain">
                  <h1>
                    <FormattedMessage id={'banner.health-service'} />
                    <br />
                    <b>
                      {' '}
                      <FormattedMessage id={'banner.comprehensive'} />
                      <br />
                    </b>
                  </h1>
                  <div className="search-form">
                    <i class="fas fa-search"></i>
                    <input type="text" />
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
                      <FormattedMessage id={'banner.pecialized'} />
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
                      <FormattedMessage id={'banner.remote'} />
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
                      <FormattedMessage id={'banner.general'} />
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
                      <FormattedMessage id={'banner.test'} />
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
                      <FormattedMessage id={'banner.mental-health'} />
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
                      <FormattedMessage id={'banner.dental'} />
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
                      <FormattedMessage id={'banner.surgery'} />
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
                      <FormattedMessage id={'banner.product'} />
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
                      <FormattedMessage id={'banner.corporate-health'} />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    // userInfo: state.user.userInfo,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageAppRedux: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeHeader));
