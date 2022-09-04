import React, { Component } from "react";

import { connect } from "react-redux";
import HomeHeader from "./HomeHeader";
import Specialty from "./Section/Specialty";
import MedicalFacility from "./Section/MedicalFacility";
import OutStandingDoctor from "./Section/OutStandingDoctor";
import HandBook from "./Section/HandBook";
import About from "./Section/About";
import HomeFooter from "./HomeFooter";
import "./HomePage.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HomePage extends Component {
  render() {
    //state section
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
      <div>
        <HomeHeader isShowBanner={true} />
        {/* top children */}
        <Specialty settings={settings} />
        <OutStandingDoctor settings={settings} />
        <MedicalFacility settings={settings} />
        <HandBook settings={settings} />
        <About settings={settings} />
        <HomeFooter />

        {/* <div style={{ height: "200px" }}></div> */}
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

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
