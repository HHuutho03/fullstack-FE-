import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import Slider from "react-slick";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { withRouter } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
class OutStandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctor: [],
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.doctorRedux !== this.props.doctorRedux) {
      this.setState({
        arrDoctor: this.props.doctorRedux,
      });
    }
  }

  componentDidMount() {
    this.props.loadTopDoctors();
  }
  handleViewDetailDoctor = (doctor) => {
    this.props.history.push(`/detail-doctor/${doctor.id}`);
  };

  render() {
    let { language } = this.props;
    let arrDoctors = this.state.arrDoctor;
    return (
      <div className="section-share section-OutStandingDoctor">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="OutStandingDoctor.title"></FormattedMessage>
            </span>
            <button className="btn-section">
              <FormattedMessage id="OutStandingDoctor.mes" />
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
                  let nameVi = `${item.positionData.valueVi},${item.firstName} ${item.lastName}`;
                  let nameEn = `${item.positionData.valueEn},${item.lastName} ${item.firstName} `;

                  return (
                    <div
                      className="section-customize"
                      key={index}
                      onClick={() => {
                        this.handleViewDetailDoctor(item);
                      }}
                    >
                      <div className=" customize-border">
                        <div
                          className="bg-img section-OutStandingDoctor"
                          style={{ background: `url(${imageBase64})` }}
                        ></div>
                        <div className="text-center">
                          <div>
                            {language === languages.VI ? nameVi : nameEn}
                          </div>
                          <div>Cơ xương khớp</div>
                        </div>
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
    language: state.app.language,
    isLoggedIn: state.user.isLoggedIn,
    doctorRedux: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadTopDoctors: () => dispatch(actions.fetchTopDoctorStart()),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutStandingDoctor)
);
