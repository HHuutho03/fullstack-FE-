import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class HandBook extends Component {
  render() {
    return (
      <div className="section-share section-Handbook">
        <div className="section-container">
          <div className="section-header">
            <span className="title-section">
              <FormattedMessage id="HandBook.title" />
            </span>
            <button className="btn-section">
              <FormattedMessage id="HandBook.mes" />
            </button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  {" "}
                  <FormattedMessage id="HandBook.child1" />
                </div>
              </div>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  <FormattedMessage id="HandBook.child2" />
                </div>
              </div>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  <FormattedMessage id="HandBook.child3" />
                </div>
              </div>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  <FormattedMessage id="HandBook.child4" />
                </div>
              </div>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  <FormattedMessage id="HandBook.child5" />
                </div>
              </div>
              <div className="section-customize handbook">
                <div className="bg-img section-Handbook"></div>
                <div className="handbook-text">
                  <FormattedMessage id="HandBook.child6" />
                </div>
              </div>
            </Slider>
          </div>
        </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HandBook);
