import React, { Component } from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import * as actions from "../../../store/actions";
import moment from "moment";
import "./DoctorSchedule.scss";
import { FormattedMessage } from "react-intl";
import BookingModal from "./BookingModal";
class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDates: [],
      allScheduleDates: [],
      isOpenModalBooking: false,
      dataScheduleTime: {},
    };
  }
  async componentDidMount() {
    let { language } = this.props;
    let allDates = this.setArrayDate(language);
    this.setState({ allDates: allDates });
  }
  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  setArrayDate = (language) => {
    let allDates = [];
    for (let i = 0; i < 7; i++) {
      let object = {};
      if (language === languages.VI) {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let toDay = `Hôm nay ${ddMM}`;
          object.label = toDay;
        } else {
          let labelVi = moment(new Date())
            .add(i, "days")
            .format("dddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelVi);
        }
      } else {
        if (i === 0) {
          let ddMM = moment(new Date()).format("DD/MM");
          let toDay = `Today ${ddMM}`;
          object.label = toDay;
        } else {
          let labelEn = moment(new Date())
            .add(i, "days")
            .locale("en")
            .format("ddd - DD/MM");
          object.label = this.capitalizeFirstLetter(labelEn);
        }
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      allDates.push(object);
    }
    return allDates;
  };
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
      let allDates = this.setArrayDate(this.props.language);
      this.setState({ allDates: allDates });
    }
    if (prevProps.scheduleDateRedux !== this.props.scheduleDateRedux) {
      let scheduleDate = this.props.scheduleDateRedux;
      this.setState({
        allScheduleDates: scheduleDate,
      });
    }
    if (this.props.detailDoctor !== prevProps.detailDoctor) {
      let allDates = this.setArrayDate(this.props.language);
      this.props.getScheduleDate(this.props.detailDoctor, allDates[0].value);
    }
  }

  handleOnchangeSelect = (event) => {
    let doctorId = this.props.detailDoctor;
    let date = event.target.value;
    this.props.getScheduleDate(doctorId, date);
  };

  HandleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTime: time,
    });
  };

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };
  render() {
    let allScheduleDates = this.state.allScheduleDates;
    let { language } = this.props;
    let allDates = this.state.allDates;
    let { isOpenModalBooking, dataScheduleTime } = this.state;

    return (
      <React.Fragment>
        <div className="schedule-container">
          <div className="schedule-all">
            <select onChange={(event) => this.handleOnchangeSelect(event)}>
              {allDates &&
                allDates.length > 0 &&
                allDates.map((item, index) => {
                  return (
                    <option key={index} value={item.value}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="schedule-available">
            <div className="text-calender">
              <i className="fas fa-calendar-alt">
                <span>
                  <FormattedMessage id="manager-doctor-info.examinationSchedule"></FormattedMessage>
                </span>
              </i>
            </div>
            <div className="schedule-available-schedule">
              {allScheduleDates && allScheduleDates.length > 0 ? (
                allScheduleDates.map((item, index) => {
                  let date =
                    language === languages.VI
                      ? item.timeTypeData.valueVi
                      : item.timeTypeData.valueEn;
                  return (
                    <button
                      key={index}
                      onClick={() => this.HandleClickScheduleTime(item)}
                    >
                      {date}
                    </button>
                  );
                })
              ) : (
                <div>
                  <FormattedMessage id="manager-doctor-info.schedule"></FormattedMessage>
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTime}
        />
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    detailDoctorRedux: state.admin.detailDoctor,
    scheduleDateRedux: state.admin.dataScheduleDate,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getScheduleDate: (doctorId, date) =>
      dispatch(actions.fetchAllDateSchedule(doctorId, date)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
