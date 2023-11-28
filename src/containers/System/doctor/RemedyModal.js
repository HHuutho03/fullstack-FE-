import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import moment from "moment";
import { CommonUtils } from "../../../utils";
import "./RemedyModal.scss";
class RemedyModal extends Component {
  constructor(props) {
    super(props);
    this.state = { email: "", imgBase64: "" };
  }
  async componentDidMount() {
    if (this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.dataModal !== this.props.dataModal) {
      this.setState({
        email: this.props.dataModal.email,
      });
    }
  }
  handelOnchangeEmail = (event) => {
    this.setState({
      email: event.target.value,
    });
  };
  handelOnchangeImg = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSendRemedy = () => {
    this.props.sendRemedy(this.state);
  };
  render() {
    let { isOpenModal, dataModal, closeRemedyModal, sendRemedy } = this.props;
    console.log("check state", this.state);
    return (
      <React.Fragment>
        <Modal
          isOpen={isOpenModal}
          className={"booking-modal-container"}
          size="md"
          centered
        >
          <div className="modal-header">
            <h5 className="modal-title">Gửi hóa đơn khám bệnh thành công</h5>
            <button
              type="button"
              className="close"
              aria-label="close"
              onClick={closeRemedyModal}
            >
              <span>*</span>
            </button>
          </div>
          <ModalBody>
            <div className="row">
              <div className="col-6 form-group">
                <label>Email bệnh nhân</label>
                <input
                  className="form-control"
                  type="email"
                  value={this.state.email}
                  onChange={(event) => {
                    this.handelOnchangeEmail(event);
                  }}
                ></input>
              </div>

              <div className="col-6 form-group">
                <label>Chọn file đơn thuốc</label>
                <input
                  className="form-control"
                  type="file"
                  onChange={(event) => {
                    this.handelOnchangeImg(event);
                  }}
                ></input>
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              onClick={() => {
                this.handleSendRemedy();
              }}
            >
              send
            </Button>
            <Button color="secondary" onClick={closeRemedyModal}>
              cancel
            </Button>
          </ModalFooter>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(RemedyModal);
