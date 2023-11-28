import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import { languages } from "../../../utils";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  componentDidUpdate(prevProps, prevState, snapshot) {}
  render() {
    return <React.Fragment></React.Fragment>;
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

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);
