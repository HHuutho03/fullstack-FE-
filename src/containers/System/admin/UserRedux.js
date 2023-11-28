import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { FormattedMessage } from "react-intl";
// import { getAllCodeServices } from "../../../services/userService";
import { languages, CRUD, CommonUtils } from "../../../utils";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import TableUserRedux from "./tableUserRedux";
import "react-image-lightbox/style.css";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImage: "",
      isOpen: false,

      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
      action: "",
      userEditID: "",
    };
  }
  async componentDidMount() {
    // * connect to redux
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }
  //default value
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: arrGenders,
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : "",
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRole = this.props.roleRedux;
      this.setState({
        roleArr: arrRole,
        role: arrRole && arrRole.length > 0 ? arrRole[0].keyMap : "",
      });
    }
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrRole = this.props.roleRedux;
      let arrPositions = this.props.positionRedux;
      let arrGenders = this.props.genderRedux;
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: arrGenders && arrGenders > 0 ? arrGenders[0].keyMap : "",
        position:
          arrPositions && arrPositions > 0 ? arrPositions[0].keyMap : "",
        role: arrRole && arrRole > 0 ? arrRole[0].keyMap : "",
        avatar: "",
        action: CRUD.CREATE,
        previewImage: "",
      });
    }
  }

  //* get file
  handleGetFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImage: objectUrl,
        avatar: base64,
      });
    }
  };

  handlePreviewImage = () => {
    this.setState({
      isOpen: true,
    });
  };
  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
    ];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("this input is required " + arrCheck[i]);
      }
    }
    return isValid;
  };
  handleOnChange = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState(
      {
        ...copyState,
      },
      () => {}
    );
  };
  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    let { action } = this.state;
    if (action === CRUD.CREATE) {
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        avatar: this.state.avatar,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
    }
    if (action === CRUD.EDIT) {
      this.props.fetchEditUser({
        id: this.state.userEditID,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        avatar: this.state.avatar,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
      });
    }
  };
  handleGetDataFromParent = (user) => {
    let imageBase64 = "";
    if (user.image) {
      imageBase64 = new Buffer(user.image, "base64").toString("binary");
    }

    this.setState({
      email: user.email,
      password: "HARDCODE",
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      phoneNumber: user.phonenumber,
      image: "",
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      previewImage: imageBase64,
      action: CRUD.EDIT,
      userEditID: user.id,
    });
  };
  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isGetGender = this.props.isLoadingGender;
    let {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      // avatar,
    } = this.state;
    return (
      <div className="user-redux-container">
        <div className="title">User redux Enwinr</div>
        <div>{isGetGender === true ? "loading gender" : ""}</div>
        <div className="user-reudux-body">
          <div className="container">
            <FormattedMessage id="manage-user.add" />
          </div>
          <div className="row">
            <div className="form-group col-md-6">
              <label htmlFor="inputEmail4">
                <FormattedMessage id="manage-user.email" />
              </label>
              <input
                disabled={this.state.action === CRUD.EDIT}
                type="email"
                className="form-control"
                placeholder="Email"
                value={email}
                onChange={(event) => this.handleOnChange(event, "email")}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">
                <FormattedMessage id="manage-user.password" />
              </label>
              <input
                disabled={this.state.action === CRUD.EDIT}
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(event) => this.handleOnChange(event, "password")}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputPassword4">
                <FormattedMessage id="manage-user.firstName" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="enwinr"
                value={firstName}
                onChange={(event) => this.handleOnChange(event, "firstName")}
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="inputLastName">
                {" "}
                <FormattedMessage id="manage-user.lastName" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="alex"
                value={lastName}
                onChange={(event) => this.handleOnChange(event, "lastName")}
              />
            </div>
            <div className="form-group col-md-2">
              <label htmlFor="inputAddress">
                {" "}
                <FormattedMessage id="manage-user.phone" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="84+ ..."
                value={phoneNumber}
                onChange={(event) => this.handleOnChange(event, "phoneNumber")}
              />
            </div>
            <div className="form-group col-md-10">
              <label htmlFor="inputAddress2">
                <FormattedMessage id="manage-user.address" />
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Apartment, studio, or floor"
                value={address}
                onChange={(event) => this.handleOnChange(event, "address")}
              />
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.gender" />
              </label>
              <select
                className="form-control"
                value={gender}
                onChange={(event) => this.handleOnChange(event, "gender")}
              >
                {genders &&
                  genders.length > 0 &&
                  genders.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.position" />
              </label>
              <select
                className="form-control"
                value={position}
                onChange={(event) => this.handleOnChange(event, "position")}
              >
                {positions &&
                  positions.length > 0 &&
                  positions.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.roleId" />
              </label>
              <select
                className="form-control"
                value={role}
                onChange={(event) => this.handleOnChange(event, "role")}
              >
                {roles &&
                  roles.length > 0 &&
                  roles.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {language === languages.VI
                          ? item.valueVi
                          : item.valueEn}
                      </option>
                    );
                  })}
              </select>
            </div>
            <div className="form-group col-md-3">
              <label>
                <FormattedMessage id="manage-user.image" />
              </label>
              <div className="preview-img-content">
                <div className="img-container">
                  <input
                    onChange={(event) => this.handleGetFile(event)}
                    id="prev-image"
                    type="file"
                    className="form-control"
                    hidden
                  />
                  <label className="image-upload" htmlFor="prev-image">
                    tai anh <i className="fas fa-upload"></i>
                  </label>
                </div>

                <div
                  className="preview-image"
                  style={{ backgroundImage: `URL(${this.state.previewImage})` }}
                  onClick={() => this.handlePreviewImage()}
                ></div>
              </div>
            </div>

            <div className="form-group">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="gridCheck"
                />
                <label className="form-check-label" htmlFor="gridCheck">
                  <FormattedMessage id="manage-user.Checkmeout" />
                </label>
              </div>
            </div>
            <button
              type="submit "
              className={
                this.state.action === CRUD.EDIT
                  ? "btn btn-warning my-5 w-50"
                  : "btn btn-primary  my-5 w-50"
              }
              onClick={() => this.handleSaveUser()}
            >
              {this.state.action === CRUD.EDIT ? (
                <FormattedMessage id="manage-user.edit" />
              ) : (
                <FormattedMessage id="manage-user.save" />
              )}
            </button>

            <div className="col-12 mb-5">
              <TableUserRedux
                handleGetDataFromParent={this.handleGetDataFromParent}
              />
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImage}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    positionRedux: state.admin.position,
    roleRedux: state.admin.roles,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fellGetAllUser()),
    fetchEditUser: (inputData) => dispatch(actions.fetchEditUser(inputData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
