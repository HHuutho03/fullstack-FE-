import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { getAllSpecial } from "../../../services/userService";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecial: [],
    };
  }
  async componentDidMount() {
    let data = await getAllSpecial();
    if (data && data.errCode === 0) {
      this.setState({ dataSpecial: data.data });
    }
  }
  handleViewDetailDoctor = (item) => {
    this.props.history.push(`/detail-special/${item.id}`);
  };
  render() {
    let { dataSpecial } = this.state;
    return (
      <div className="section-share section-specialty">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="specialty.title" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="specialty.mes" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecial &&
                dataSpecial.length > 0 &&
                dataSpecial.map((item) => {
                  return (
                    <div
                      className="section-customize "
                      onClick={() => {
                        this.handleViewDetailDoctor(item);
                      }}
                    >
                      <div
                        className="bg-img section-specialty"
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                      ></div>
                      <div className="text-center">{item.name}</div>
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
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
