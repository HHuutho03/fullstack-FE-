import React, { Component } from "react";
import { connect } from "react-redux";

class HomeFooter extends Component {
  render() {
    return (
      <div className="section-share home-footer">
        <p>
          &copy; 2023 Làm website cùng ENWINR, more information please visit my
          youtube <a href="#">&#8594; click here &#8592;</a>
        </p>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeFooter);
