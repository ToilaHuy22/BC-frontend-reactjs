import React, { Component } from 'react';
import { connect } from 'react-redux';
import './DoctorExtraInfor.scss';
import '../../System/Admin/UserRedux';
import { LANGUAGES } from '../../../utils';
import { getScheduleDoctorByDate } from '../../../services/userService';
import { FormattedMessage } from 'react-intl';

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    let { isShowDetailInfor } = this.state;
    return (
      <div className="doctor-extra-infor-container mt-5">
        <div className="pt-5">
          <div className="content-up pb-2">
            <div className="text-address">ĐỊA CHỈ KHÁM</div>
            <div className="name-clinic">Phòng khám Bệnh viện Đại học Y Dược 1</div>
            <div className="detail-address">20-22 Dương Quang Trung, Phường 12, Quận 10, Tp. HCM</div>
          </div>
          <div className="content-down pt-2">
            <div className="price"></div>
            {isShowDetailInfor === false && (
              <div className="price-hide">
                <span className="price">
                  <span className="price--title">Giá khám: </span> 250.000đ - 500.000đ.
                </span>{' '}
                <br />
                <span className="show" onClick={() => this.showHideDetailInfor(true)}>
                  Xem chi tiết
                </span>
              </div>
            )}

            {isShowDetailInfor === true && (
              <>
                <div className="price-show">
                  <div className="price--title">GIÁ KHÁM: </div>
                  <div className="price-detail">
                    <div className="price-description">
                      <span>Giá tư vấn: </span>
                      <span>250.000đ</span>
                    </div>
                    <div className="note">Giá tư vấn, được ưu tiên khi đặt khám qua Bookingcare.</div>
                  </div>
                  <div className="payment">Phòng khám có thanh toán bằng hình thức tiền mặt và quẹt thẻ</div>
                </div>
                <div className="hide">
                  <span onClick={() => this.showHideDetailInfor(false)}>Thu gọn</span>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);
