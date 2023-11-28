import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtrainfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import _ from "lodash";
import {
  getAllCodeServices,
  getDetailClinicById,
} from "../../../services/userService";
import "./detailClinic.scss";
class detailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: [],
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;
      let res = await getDetailClinicById({
        id,
      });
      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }
        this.setState({
          arrDoctorId: arrDoctorId,
          dataDetailClinic: res.data,
        });
      }
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    console.log("dataDetailClinic", dataDetailClinic);
    let { language } = this.props;
    return (
      <div className="detail-specialty-container">
        <HomeHeader />
        <div className="detail-specialty-body">
          <div className="description-specialty">
            {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
              <>
                <div>{dataDetailClinic.name}</div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: dataDetailClinic.descriptionHTML,
                  }}
                ></div>
              </>
            )}
          </div>
          {arrDoctorId &&
            arrDoctorId.length > 0 &&
            arrDoctorId.map((item, index) => {
              return (
                <div className="each-doctor" key={index}>
                  <div className="dt-content-left">
                    <div className="profile-doctor">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetails={true}
                        isShowPrice={false}
                      />
                    </div>
                  </div>
                  <div className="dt-content-right">
                    <div className="doctor-schedule">
                      <DoctorSchedule detailDoctor={item} />
                    </div>
                  </div>
                  <div className="doctor-extra-info">
                    <DoctorExtraInfor detailDoctor={item} />
                  </div>
                </div>
              );
            })}
        </div>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(detailClinic);
