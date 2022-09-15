import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ProfileDoctor.scss';
import { getProfileDoctorById } from '../../../services/userService';
import { LANGUAGES } from '../../../utils';
import NumberFormat from 'react-number-format';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import moment from 'moment/moment';
import localization from 'moment/locale/vi';

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: {},
    };
  }

  async componentDidMount() {
    let data = await this.getInforDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.language !== this.props.language) {
    }

    if (this.props.doctorId !== prevProps.doctorId) {
    }
  }

  getInforDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }
    return result;
  };

  renderTimeBooking = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let time = language === LANGUAGES.VI ? dataTime.timeTypeData.valueVi : dataTime.timeTypeData.valueEn;

      let date =
        language === LANGUAGES.VI
          ? moment.unix(+dataTime.date / 1000).format('dddd - DD/MM/YYYY')
          : moment
              .unix(+dataTime.date / 1000)
              .locale('en')
              .format('ddd - MM/DD/YYYY');

      return (
        <>
          <div className="booking-date">{date}</div>
          <div className="booking-time">{time}</div>
          <div>
            {' '}
            <FormattedMessage id="patient.extra-infor.booking-free" />
          </div>
        </>
      );
    }
    return <></>;
  };

  render() {
    let { dataProfile } = this.state;
    let { language, isShowDescriptionDoctor, dataScheduleTimeModal } = this.props;

    let nameVi = '',
      nameEn = '';
    if (dataProfile && dataProfile.positionData) {
      nameVi = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
      nameEn = `${dataProfile.positionData.valueEn}, ${dataProfile.firstName} ${dataProfile.lastName}`;
    }

    return (
      <div className="intro-doctor">
        <div className="intro-doctor-content px-3 pb-3">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${dataProfile && dataProfile.image ? dataProfile.image : ''})`,
            }}
          ></div>

          <div className="content-right pl-4">
            <div className="up ">{language === LANGUAGES.VI ? nameVi : nameEn}</div>

            <div className="down ">
              {isShowDescriptionDoctor === true ? (
                <>
                  {dataProfile && dataProfile.Markdown && dataProfile.Markdown.description && (
                    <span>{dataProfile.Markdown.description}</span>
                  )}
                </>
              ) : (
                <>{this.renderTimeBooking(dataScheduleTimeModal)}</>
              )}
            </div>
          </div>
        </div>

        <div className="price">
          <FormattedMessage id="patient.extra-infor.price" />

          {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.VI ? (
            <NumberFormat
              value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' VND'}
            />
          ) : (
            ''
          )}

          {dataProfile && dataProfile.Doctor_Infor && language === LANGUAGES.EN ? (
            <NumberFormat
              value={dataProfile.Doctor_Infor.priceTypeData.valueEn}
              displayType={'text'}
              thousandSeparator={true}
              suffix={' $'}
            />
          ) : (
            ''
          )}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.app.language,
  };
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
