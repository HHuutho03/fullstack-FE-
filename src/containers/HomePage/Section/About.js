import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div className="section-share section-about">
        <div className="section-about1">
          <div className="section-about-text">
            Truyền thông nói gì về Bookingcare
          </div>
          <div className="section-about-content">
            <div className="about-left">
              <iframe
                width="100%"
                height="440"
                src="https://www.youtube.com/embed/niPkap1ozUA?list=RDniPkap1ozUA"
                title="SON TUNG M-TP | MAKING MY WAY | OFFICIAL VISUALIZER"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="about-right">
              <p>
                4️⃣ Lịch trình ra video ? Hiện tại, mình đang đi làm fulltime, vì
                vậy không thể dành 100% thời gian làm video khóa học này được.
                Tuy nhiên, mình luôn cố gắng để làm video đều đặn và thường
                xuyên, vì mình nhận được rất nhiều tin nhắn cũng như comment của
                các bạn, mong muốn được học khóa học này ❤
              </p>
            </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(About);
