import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { withRouter } from "react-router-dom";
import "slick-carousel/slick/slick-theme.css";
import { getAllClinic } from "../../../services/userService";
import "./MedicalFacility.scss";
class MedicalFacility extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataClinic: [],
    };
  }
  async componentDidMount() {
    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      this.setState({ dataClinic: res.data ? res.data : [] });
    }
  }
  handleViewDetailDoctor = (clinic) => {
    this.props.history.push(`/detail-clinic/${clinic.id}`);
  };
  render() {
    let { dataClinic } = this.state;
    return (
      <div className="section-share section-facility">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="facility.title"></FormattedMessage>
            </span>
            <button className="btn-section">
              <FormattedMessage id="facility.mes" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataClinic &&
                dataClinic.length > 0 &&
                dataClinic.map((item, index) => {
                  return (
                    <div
                      className="section-customize clinic-child"
                      key={index}
                      onClick={() => {
                        this.handleViewDetailDoctor(item);
                      }}
                    >
                      <div
                        className="bg-img section-medical-facility"
                        style={{ backgroundImage: `url(${item.image})` }}
                      ></div>
                      <div className="text-center clinic-name">{item.name}</div>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MedicalFacility)
);
