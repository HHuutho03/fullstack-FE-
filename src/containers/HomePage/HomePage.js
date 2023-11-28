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
class HomePage extends Component {
  render() {
    let settings = {
      dots: false,
      Infinite: false,
      speed: 500,
      slidesToShow: 4,
      SlidesToScroll: 1,
    };
    let settings1 = {
      dots: false,
      Infinite: true,
      speed: 500,
      slidesToShow: 2,
      SlidesToScroll: 1,
    };
    return (
      <div>
        <HomeHeader isShowBanner={true} />
        <Specialty settings={settings} />
        <MedicalFacility settings={settings} />
        <OutStandingDoctor settings={settings} />
        <HandBook settings={settings1} />
        <About></About>
        <HomeFooter />
        <div style={{ height: "40px" }}></div>
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
