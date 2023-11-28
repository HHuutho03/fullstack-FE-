import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { emitter } from "../../utils/emitter";
import _ from "lodash";
class UserEditManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      address: "",
    };

    this.listenToEmitter();
  }
  listenToEmitter() {
    emitter.on("EVENT_CLEAR_MODAL_DATA", () => {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        address: "",
      });
    });
  }
  componentDidMount() {
    let user = this.props.user;
    console.log("user did mount", user);
    console.log("lodash user", user && _.isEmpty(user));
    if (user && !_.isEmpty(user)) {
      this.setState({
        id: user.id,
        email: user.email,
        password: "hashPassword",
        firstName: user.firstName,
        lastName: user.lastName,
        address: user.address,
      });
      console.log("user n", user);
    }
  }

  //chuyen doi trang thai on-off
  toggle = () => {
    this.props.toggleFormParent();
  };

  //get value input
  handleOnChangeInput = (e, id) => {
    /** bad code.modify state
     *
     * this.state[id]=e.target.value
     * this.setState({
     *    ...this.state
     *  },()=>console.log(this.state))
     */

    //good code
    let copyState = { ...this.state };
    copyState[id] = e.target.value;
    this.setState({ ...copyState });
  };

  //check value nhap vao input
  checkValidateInput = () => {
    let isValid = true;
    let arrValue = ["email", "password", "firstName", "lastName", "address"];
    for (let i = 0; i < arrValue.length; i++) {
      if (!this.state[arrValue[i]]) {
        isValid = false;
        alert("missing required parameter");
        break;
      }
    }
    return isValid;
  };

  doEditUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === true) {
      this.props.editUser(this.state);
      console.log("check doedituser", this.state);
    }
  };
  render() {
    console.log("check props user", this.props);
    console.log("check user data", this.props.user);
    return (
      <div>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          className={"modal-user-container"}
          size="lg"
        >
          <ModalHeader toggle={() => this.toggle()}>Edit new user</ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label>Email</label>
                <input
                  value={this.state.email}
                  type="text"
                  onChange={(e) => this.handleOnChangeInput(e, "email")}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>Password</label>
                <input
                  value={this.state.password}
                  type="password"
                  onChange={(e) => this.handleOnChangeInput(e, "password")}
                  disabled
                />
              </div>
              <div className="input-container">
                <label>First Name</label>
                <input
                  value={this.state.firstName}
                  type="text"
                  onChange={(e) => this.handleOnChangeInput(e, "firstName")}
                />
              </div>
              <div className="input-container">
                <label>Last Name</label>
                <input
                  value={this.state.lastName}
                  type="text"
                  onChange={(e) => this.handleOnChangeInput(e, "lastName")}
                />
              </div>
              <div className="input-container max-width-input">
                <label>Address</label>
                <input
                  value={this.state.address}
                  type="text"
                  onChange={(e) => this.handleOnChangeInput(e, "address")}
                />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary "
              className="px-3"
              onClick={() => this.doEditUser()}
            >
              Edit User
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserEditManage);
