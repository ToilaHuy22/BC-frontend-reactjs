import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { LANGUAGES } from "../../../utils";
import { withRouter } from "react-router";

class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctors: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctorsRedux !== this.props.topDoctorsRedux) {
      this.setState({
        arrDoctors: this.props.topDoctorsRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctorsRedux();
  }

  handleViewDetailDoctor = (doctor) => {
    console.log("DetailDoctor", doctor);
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let { language } = this.props;
    let arrDoctors = this.state.arrDoctors;
    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-container container">
          <div className="section-header">
            <span className="section-title">
              <FormattedMessage id="homepage.outstanding-doctors" />
            </span>
            <button className="section-more">
              {" "}
              <FormattedMessage id="homepage.search" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {arrDoctors &&
                arrDoctors.length > 0 &&
                arrDoctors.map((item, index) => {
                  let imageBase64 = "";
                  if (item.image) {
                    imageBase64 = new Buffer(item.image, "base64").toString(
                      "binary"
                    );
                  }
                  let nameVi = `${item.positionData.valueVi}, ${item.lastName} ${item.firstName}`;
                  let nameEn = `${item.positionData.valueEn}, ${item.firstName} ${item.lastName}`;
                  return (
                    <div
                      className="section-item doctor"
                      key={index}
                      onClick={() => this.handleViewDetailDoctor(item)}
                    >
                      <div
                        className="img section-outstanding-doctor"
                        style={{ backgroundImage: `url(${imageBase64})` }}
                      />
                      <div className="detail">
                        <span>
                          {language === LANGUAGES.VI ? nameVi : nameEn}
                        </span>
                        <br />
                        <span>FrontEnd Dev</span>
                      </div>
                    </div>
                  );
                })}
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
    topDoctorsRedux: state.admin.topDoctors,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctorsRedux: () => dispatch(actions.fetchTopDoctor()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
