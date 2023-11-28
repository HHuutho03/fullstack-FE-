import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages, dateFormat } from "../../../utils";
import Select from "react-select";
import "./ManageSchedule.scss";
import { FormattedMessage } from "react-intl";
import DatePicker from "../../../components/Input/DatePicker";
import { toast } from "react-toastify";

import { bulkCreateSchedule } from "../../../services/userService";
import _ from "lodash";
class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedOption: {},
      currentDate: "",
      dataSchedule: [],
    };
  }
  componentDidMount() {
    this.props.fetchDoctorsRedux();
    this.props.fetchScheduleRedux();
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelection(this.props.allDoctors);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.dataSchedule !== this.props.dataSchedule) {
      let data = this.props.dataSchedule;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSection: false }));
      }
      this.setState({
        dataSchedule: data,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelection(this.props.allDoctors);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }
  onchangeDatePicker = (date) => {
    this.setState({ currentDate: date[0] });
  };

  //? change firstName and lastName by language
  handleChange = (selectedOption) => {
    this.setState({ selectedOption: selectedOption });
  };

  handleAddClassName = (time) => {
    let { dataSchedule } = this.state;
    if (dataSchedule && dataSchedule.length > 0) {
      dataSchedule.map((item, index) => {
        if (item.id === time.id) {
          item.isSection = !item.isSection;
          return item;
        }
      });
    }
    this.setState({
      dataSchedule: dataSchedule,
    });
  };

  buildDataInputSelection = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labeEn = `${item.lastName} ${item.firstName}`;
        let labeVi = `${item.firstName} ${item.lastName}`;
        object.label = language === languages.VI ? labeVi : labeEn;
        object.value = item.id;
        result.push(object);
      });
    }

    return result;
  };
  handleSaveSchedule = async () => {
    let { selectedOption, currentDate, dataSchedule } = this.state;
    let result = [];
    if (!currentDate) {
      toast.error("invalid date");
      return;
    }
    if (selectedOption && _.isEmpty(selectedOption)) {
      toast.error("invalid selected doctor");
      return;
    }
    // let formatDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);
    let formatDate = new Date(currentDate).getTime();

    if (dataSchedule && dataSchedule.length > 0) {
      let dataTime = dataSchedule.filter((item) => item.isSection === true);
      if (dataTime && dataTime.length > 0) {
        dataTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedOption.value;
          object.date = "" + formatDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      }
    }
    let res = await bulkCreateSchedule({
      arrSchedule: result,
      doctorId: selectedOption.value,
      formatDate: formatDate,
    });
    if (res && res.error === 0) {
      toast.success("save schedule doctor successfully");
    }
  };
  render() {
    let { dataSchedule } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    return (
      <React.Fragment>
        <div className="manage-schedule-container">
          <div className="m-s-title">
            <FormattedMessage id="manage-doctor-schedule.title"></FormattedMessage>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-doctor-schedule.select-doctor"></FormattedMessage>
                </label>
                <Select
                  value={this.state.selectedOption}
                  onChange={this.handleChange}
                  options={this.state.listDoctors}
                />
              </div>
              <div className="col-6 form-group">
                <label>
                  <FormattedMessage id="manage-doctor-schedule.select-day"></FormattedMessage>
                </label>
                <DatePicker
                  className="form-control"
                  onChange={this.onchangeDatePicker}
                  value={this.state.currentDate}
                  minDate={yesterday}
                />
              </div>
              <div className="col-12 pick-hour-container">
                {dataSchedule &&
                  dataSchedule.map((item, index) => {
                    return (
                      <button
                        key={index}
                        onClick={() => this.handleAddClassName(item)}
                        className={
                          item.isSection === true
                            ? "btn btn-schedule active"
                            : "btn btn-schedule"
                        }
                      >
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </button>
                    );
                  })}
              </div>
              <button
                className="btn btn-primary save-schedule"
                onClick={() => this.handleSaveSchedule()}
              >
                <FormattedMessage id="manage-doctor-schedule.save"></FormattedMessage>
              </button>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    allDoctors: state.admin.doctorsArr,
    dataSchedule: state.admin.dataSchedule,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDoctorsRedux: (id) => dispatch(actions.fetchAllDoctorStart()),
    fetchScheduleRedux: (id) => dispatch(actions.fetchScheduleStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
