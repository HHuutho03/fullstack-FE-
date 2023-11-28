import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ProfileDoctor.scss";
import { getDoctorProfileInfo } from "../../../services/userService";
import NumberFormat from "react-number-format";
import { Link } from "react-router-dom";
import _ from "lodash";
import moment from "moment";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = { profileDoctor: {} };
  }
  async componentDidMount() {
    let data = await this.getProfileDoctor(this.props.doctorId);
    this.setState({
      profileDoctor: data,
    });
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {}

  getProfileDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getDoctorProfileInfo(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;
    if (dataTime && !_.isEmpty(dataTime)) {
      let time =
        language === languages.VI
          ? dataTime.timeTypeData.valueVi
          : dataTime.timeTypeData.valueEn;

      let date =
        language === languages.VI
          ? moment.unix(dataTime.date / 1000).format("dddd -DD/MM/YYYY")
          : moment
              .unix(dataTime.date / 1000)
              .locale("en")
              .format("ddd -DD/MM/YYYY");
      return (
        <>
          <div>
            {time} - {date}
          </div>
          <div>Miển phí đặt lịch</div>
        </>
      );
    }
  };
  render() {
    let { profileDoctor } = this.state;
    let {
      language,
      isShowDescriptionDoctor,
      dataTime,
      isShowLinkDetails,
      isShowPrice,
      doctorId,
    } = this.props;
    let nameVi = "";
    let nameEn = "";
    let priceVi = "";
    let priceEn = "";
    if (profileDoctor && profileDoctor.positionData) {
      nameVi = `${profileDoctor.positionData.valueVi} ${profileDoctor.lastName} ${profileDoctor.firstName}`;
      nameEn = `${profileDoctor.positionData.valueEn} ${profileDoctor.firstName} ${profileDoctor.lastName}`;
    }
    if (
      profileDoctor &&
      !_.isEmpty(profileDoctor) &&
      profileDoctor.Doctor_Info
    ) {
      priceVi = profileDoctor.Doctor_Info.priceTypeData.valueVi;
      priceEn = profileDoctor.Doctor_Info.priceTypeData.valueEn;
    }
    return (
      <React.Fragment>
        <div className="intro-doctor">
          <div
            className="intro-left"
            style={{ backgroundImage: `url(${profileDoctor.image})` }}
          ></div>
          <div className="intro-right">
            <div className="right-up">
              {language === languages.VI ? nameVi : nameEn}
            </div>
            <div className="right-down">
              {isShowDescriptionDoctor === true ? (
                profileDoctor &&
                profileDoctor.Markdown &&
                profileDoctor.Markdown.description && (
                  <span>{profileDoctor.Markdown.description}</span>
                )
              ) : (
                <>{this.renderTimeBooking(dataTime)}</>
              )}
            </div>
          </div>
        </div>
        {isShowLinkDetails === true && (
          <div className="view-detail-doctor">
            <Link to={`/detail-doctor/${doctorId}`}>Xem thêm </Link>
          </div>
        )}

        {isShowPrice === true && (
          <div className="price">
            <soan>Giá khám : </soan>
            {language === languages.VI ? (
              <NumberFormat
                value={priceVi}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"VND"}
              />
            ) : (
              <NumberFormat
                value={priceEn}
                displayType={"text"}
                thousandSeparator={true}
                suffix={"$"}
              />
            )}
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
