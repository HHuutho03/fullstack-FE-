import React, { Component } from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import * as actions from "../../../store/actions";
import { languages } from "../../../utils";
import { CommonUtils } from "../../../utils";
import MdEditor from "react-markdown-editor-lite";
import "./ManagerClinic.scss";
import { createNewClinic } from "../../../services/userService";
import { toast } from "react-toastify";
const mdParser = new MarkdownIt(/* Markdown-it options */);
class ManagerClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imgBase64: "",
      address: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnchangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({ ...stateCopy });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleGetFile = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      this.setState({
        imgBase64: base64,
      });
    }
  };
  handleSaveNewClinic = async () => {
    let res = await createNewClinic(this.state);
    console.log("check res", res);
    if (res && res.errCode === 0) {
      toast.success("add new special");
      this.setState({
        name: "",
        address: "",
        imgBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("add new clinic error");
    }
  };
  render() {
    return (
      <React.Fragment>
        <div className="manage-special-container">
          <div className="ms-title">Quản lý chuyên khoa</div>
          <div className="add-new-special row">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "name");
                }}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Ảnh chuyên khoa</label>
              <input
                type="file"
                className="form-control-file"
                onChange={(event) => {
                  this.handleGetFile(event);
                }}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Địa chỉ phòng khám</label>
              <input
                type="text"
                className="form-control"
                onChange={(event) => {
                  this.handleOnchangeInput(event, "address");
                }}
              ></input>
            </div>
            <div className="col-12 form-group">
              <MdEditor
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
                value={this.state.descriptionMarkdown}
              />
            </div>
            <div className="col-12">
              <button
                className="btn-save-special"
                onClick={() => {
                  this.handleSaveNewClinic();
                }}
              >
                Save
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManagerClinic);
