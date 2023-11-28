import React, { Component } from "react";
import { connect } from "react-redux";
import HomeHeader from "./../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import DoctorSchedule from "./DoctorSchedule";
import { FormattedMessage } from "react-intl";
import "./DetailDoctor.scss";
import DoctorExtrainfor from "./DoctorExtrainfor";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctorId: "",
      detailDoctor: {},
    };
  }
  componentDidMount() {
    let detailDoctorId = this.props.match.params.id;
    this.setState({ detailDoctorId: detailDoctorId });
    this.props.getDetailDoctor(detailDoctorId);
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.detailDoctorRedux !== this.props.detailDoctorRedux) {
      let arrDetailDoctor = this.props.detailDoctorRedux;
      this.setState({
        detailDoctor: arrDetailDoctor,
      });
    }
  }
  render() {
    let { detailDoctor } = this.state;
    let { language } = this.props;
    let nameVi = "";
    let nameEn = "";
    if (detailDoctor && detailDoctor.positionData) {
      nameVi = `${detailDoctor.positionData.valueVi} ${detailDoctor.lastName} ${detailDoctor.firstName}`;
      nameEn = `${detailDoctor.positionData.valueEn} ${detailDoctor.firstName} ${detailDoctor.lastName}`;
    }

    return (
      <React.Fragment>
        <HomeHeader isShowBanner={false} />

        <div className="detail-doctor-contain">
          <div className="intro-doctor">
            <div
              className="intro-left"
              style={{ backgroundImage: `url(${detailDoctor.image})` }}
            ></div>
            <div className="intro-right">
              <div className="right-up">
                {language === languages.VI ? nameVi : nameEn}
              </div>
              <div className="right-down">
                {detailDoctor &&
                  detailDoctor.Markdown &&
                  detailDoctor.Markdown.description && (
                    <span>{detailDoctor.Markdown.description}</span>
                  )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule detailDoctor={this.state.detailDoctorId} />
              <span>
                <FormattedMessage id="manager-doctor-info.choose"></FormattedMessage>
                <i className="far fa-hand-point-up"></i>
                <FormattedMessage id="manager-doctor-info.and"></FormattedMessage>
                <FormattedMessage id="manager-doctor-info.order"></FormattedMessage>
              </span>
            </div>
            <div className="content-right">
              <DoctorExtrainfor detailDoctor={this.state.detailDoctorId} />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentMarkdown && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailDoctorRedux: state.admin.detailDoctor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getDetailDoctor: (id) => dispatch(actions.fetchDetailDoctorStart(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
