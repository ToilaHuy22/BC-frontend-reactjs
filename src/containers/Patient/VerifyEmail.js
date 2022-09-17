import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import { postVerifyBookAppointment } from '../../services/userService';
import HomeHeader from '../HomePage/HomeHeader';
import './VerifyEmail.scss';

class VerifyEmail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statusVerify: false,
      errCode: 0,
    };
  }

  async componentDidMount() {
    if (this.props.location && this.props.location.search) {
      let urlParams = new URLSearchParams(this.props.location.search);
      let token = urlParams.get('token');
      let doctorId = urlParams.get('doctorId');
      let res = await postVerifyBookAppointment({
        token: token,
        doctorId: doctorId,
      });

      if (res && res.errCode === 0) {
        this.setState({
          statusVerify: true,
          errCode: res.errCode,
        });
      } else {
        this.setState({
          statusVerify: true,
          errCode: res && res.errCode ? res.errCode : -1,
        });
      }
    }

    if (this.props.match && this.props.match.params) {
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    let { statusVerify, errCode } = this.state;
    return (
      <>
        <HomeHeader />
        <div className="verify container pt-5">
          {statusVerify === false ? (
            <div>Loading data ...</div>
          ) : (
            <div className="verify-content">
              {+errCode === 0 ? (
                <div className="verify-success title"> Xác nhận lịch hẹn thành công! </div>
              ) : (
                <div className="verify-fail title"> Lịch hẹn không tồn tại </div>
              )}
            </div>
          )}
        </div>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(VerifyEmail);
