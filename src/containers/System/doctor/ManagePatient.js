import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./ManagePatient.scss";
import DatePicker from "./../../../components/Input/DatePicker";
import {
  getAllPatientForDoctor,
  postSendRemedy,
} from "../../../services/userService";
import moment from "moment";
import { toast } from "react-toastify";
import RemedyModal from "./RemedyModal";
import LoadingOverlay from "react-loading-overlay";

class ManagePatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: moment(new Date()).startOf("day").valueOf(),
      dataPatient: [],
      dataModal: {},
      isOpenRemedyModal: false,
      isShowLoading: false,
    };
  }
  componentDidMount() {
    this.getDataPatient();
  }
  getDataPatient = async () => {
    let { user } = this.props;
    let { currentDate } = this.state;
    let formatDate = new Date(currentDate).getTime();

    let res = await getAllPatientForDoctor({
      doctorId: user.id,
      date: formatDate,
    });
    if (res && res.errCode === 0) {
      this.setState({ dataPatient: res.data });
    }
  };
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeDatePiker = (date) => {
    this.setState(
      {
        currentDate: [0],
      },
      async () => {
        await this.getDataPatient();
      }
    );
  };
  handleBtnConfirm = (item) => {
    console.log("check item", item);
    let data = {
      doctorId: item.doctorId,
      patientId: item.patientID,
      email: item.patientData.email,
      timeType: item.timeType,
      patientName: item.patientData.firstName,
    };
    this.setState({
      isOpenRemedyModal: true,
      dataModal: data,
    });
  };
  closeRemedyModal = () => {
    this.setState({
      isOpenRemedyModal: false,
      dataModal: [],
    });
  };
  senRemedy = async (dataChild) => {
    let { dataModal } = this.state;
    this.setState({
      isShowLoading: true,
    });
    let res = await postSendRemedy({
      email: dataChild.email,
      imgBase64: dataChild.imgBase64,
      doctorId: dataModal.doctorId,
      patientId: dataModal.patientId,
      timeType: dataModal.timeType,
      language: this.props.language,
      patientName: dataChild.firstName,
    });
    if (res && res.errCode == 0) {
      this.setState({ isShowLoading: false });
      toast.success("send remedy success");
      this.closeRemedyModal();
      await this.getDataPatient();
    } else {
      this.setState({ isShowLoading: false });
      toast.error("something wrong...");
      console.log("check res");
    }
  };
  handleBtnRemedy = () => {};
  render() {
    let { dataPatient, dataModal, isOpenRemedyModal } = this.state;
    let { language } = this.props;
    console.log("check dataModal", dataModal);
    return (
      <LoadingOverlay
        active={this.state.isShowLoading}
        spinner
        text="Loading ..."
      >
        <p>Some content or children or something.</p>

        <div className="manage-patient-container">
          <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
          <div className="manage-patient-body row">
            <div className="col-4 form-group">
              <label>Chọn ngày khám</label>
              <DatePicker
                onChange={this.handleOnchangeDatePiker}
                className="form-control"
                value={this.state.currentDate}
              ></DatePicker>
            </div>
            <div className="col-12 table-manage-patient">
              <table style={{ width: "100%" }}>
                <tbody>
                  <tr>
                    <th>STT</th>
                    <th>Thời gian</th>
                    <th>Họ và tên</th>
                    <th>Địa chỉ</th>
                    <th>Giới tính</th>
                    <th>Actions</th>
                  </tr>

                  {dataPatient && dataPatient.length > 0 ? (
                    dataPatient.map((item, index) => {
                      let time =
                        language === languages.VI
                          ? item.timeTypeDataPatient.valueVi
                          : item.timeTypeDataPatient.valueEn;

                      let gender =
                        language === languages.VI
                          ? item.patientData.valueVi
                          : item.patientData.valueEn;
                      return (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{time}</td>
                          <td>{item.patientData.firstName}</td>
                          <td>{item.patientData.address}</td>
                          <td>{gender}</td>
                          <td>
                            <button
                              className="mp-btn-confirm"
                              onClick={() => {
                                this.handleBtnConfirm(item);
                              }}
                            >
                              Xác nhận
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td colSpan="6" style={{ textAlign: "center" }}>
                        No data
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <RemedyModal
          isOpenModal={isOpenRemedyModal}
          dataModal={dataModal}
          closeRemedyModal={this.closeRemedyModal}
          sendRemedy={this.senRemedy}
        />
      </LoadingOverlay>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    user: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagePatient);
