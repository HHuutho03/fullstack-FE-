import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import "./DoctorExtrainfor.scss";
import { FormattedMessage } from "react-intl";
import NumberFormat from "react-number-format";
import "./DetailDoctor.scss";
import { getExtraDoctorInfo } from "../../../services/userService";
class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      arrInfoDoctor: {},
    };
  }
  async componentDidMount() {
    let data = await getExtraDoctorInfo(this.props.detailDoctor);
    if (data && data.errCode === 0) {
      this.setState({ arrInfoDoctor: data.data });
    }
  }
  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.detailDoctor !== prevProps.detailDoctor) {
      let data = await getExtraDoctorInfo(this.props.detailDoctor);
      if (data && data.errCode === 0) {
        this.setState({ arrInfoDoctor: data.data });
      }
    }
  }
  handleClick = (information) => {
    this.setState({ isLoading: information });
  };
  render() {
    let language = this.props.language;
    let { arrInfoDoctor } = this.state;

    let { isLoading } = this.state;
    return (
      <React.Fragment>
        <div className="doctor-extra-info-container">
          <div className="content-up">
            <FormattedMessage id="manager-doctor-extra.andres"></FormattedMessage>
            <div className="title-name"></div>
            <span className="title-decription">
              {arrInfoDoctor && arrInfoDoctor.nameClinic
                ? arrInfoDoctor.nameClinic
                : ""}
            </span>
            <h6 className="h6">
              {arrInfoDoctor && arrInfoDoctor.addressClinic
                ? arrInfoDoctor.addressClinic
                : ""}
            </h6>
          </div>
          <div className="content-down">
            {isLoading === false && (
              <>
                <div>
                  <span className="title-name">
                    <FormattedMessage id="manager-doctor-extra.address-price">
                      :
                    </FormattedMessage>
                  </span>
                  {arrInfoDoctor &&
                    arrInfoDoctor.priceTypeData &&
                    language === languages.VI && (
                      <NumberFormat
                        value={arrInfoDoctor.priceTypeData.valueVi}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"VND"}
                      />
                    )}
                  {arrInfoDoctor &&
                    arrInfoDoctor.priceTypeData &&
                    language === languages.EN && (
                      <NumberFormat
                        value={arrInfoDoctor.priceTypeData.valueEn}
                        displayType={"text"}
                        thousandSeparator={true}
                        suffix={"$"}
                      />
                    )}
                  <span
                    className="title-show"
                    onClick={() => {
                      this.handleClick(true);
                    }}
                  >
                    <FormattedMessage id="manager-doctor-extra.more-info">
                      :
                    </FormattedMessage>
                  </span>
                </div>
              </>
            )}
            {isLoading === true && (
              <>
                <div className="title-hide">
                  <div className="price-extra-name">
                    <FormattedMessage id="manager-doctor-extra.address-price">
                      :
                    </FormattedMessage>
                  </div>
                  <div className="title-price-examination">
                    <div className="content-left-price">
                      <div>Giá khám:</div>
                      <text className="text">{arrInfoDoctor.note}</text>
                    </div>
                    <div className="content-right-price">400.000đ</div>
                  </div>
                  <div className="title-price-examination">
                    <div className="content-left-price">
                      <div>Giá tái khám:</div>
                      <text className="text">
                        Giá khám đã bao gồm phí đặt lịch hẹn trước (Giá niêm yết
                        của phòng khám) Giá khám cho người nước ngoài 30 USD
                      </text>
                    </div>
                    <div>400.000đ</div>
                  </div>

                  <div className="title-price-footer">
                    Người bệnh có thể thanh toán chi phí bằng hình thức tiền mặt
                    và quẹt thẻ
                  </div>
                  <div
                    className="title-show"
                    onClick={() => {
                      this.handleClick(false);
                    }}
                  >
                    <FormattedMessage id="manager-doctor-extra.Hide-price-list"></FormattedMessage>
                  </div>
                </div>
              </>
            )}
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
