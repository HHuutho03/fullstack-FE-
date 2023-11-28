import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import HomeHeader from "../HomePage/HomeHeader";
import { postVerifyPatientAppointment } from "../../services/userService";
import "./VerifyEmail.scss";
class verifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }
  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get("token");
      let doctorId = urlParams.get("doctorId");
      let res = await postVerifyPatientAppointment({
        token: token,
        doctorId: doctorId,
      });
      console.log("check res in verify email", res);
      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <React.Fragment>
        <HomeHeader />
        <div className="verify-email-container">
          {statusVerify === false ? (
            <div>Loading data ...</div>
          ) : (
            <div>
              {errCode === 0 ? (
                <div>Xác nhận lịch hẹn thành công !</div>
              ) : (
                <div>Lịch hẹn không tồn tại hoắc đã được thêm vào !</div>
              )}
            </div>
          )}
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(verifyEmail);
