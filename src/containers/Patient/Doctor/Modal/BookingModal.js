import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import '../../../System/Admin/UserRedux.scss';
import { LANGUAGES } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';
import DatePicker from '../../../../components/Input/DatePicker';
import * as actions from '../../../../store/actions';
import Select from 'react-select';
import { postPatientBookAppointment } from '../../../../services/userService';
import { toast } from 'react-toastify';
import moment from 'moment/moment';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fullName: '',
      phoneNumber: '',
      email: '',
      address: '',
      reason: '',
      birthday: '',
      selectedGender: '',
      genders: '',
      doctorId: '',
      timeType: '',
    };
  }

  componentDidMount() {
    this.props.getGenders();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.genders !== prevProps.genders) {
      this.setState({
        genders: this.buildDataGender(this.props.genders),
      });
    }

    if (this.props.dataScheduleTimeModal !== prevProps.dataScheduleTimeModal) {
      if (this.props.dataScheduleTimeModal && !_.isEmpty(this.props.dataScheduleTimeModal)) {
        let doctorId = this.props.dataScheduleTimeModal.doctorId;
        let timeType = this.props.dataScheduleTimeModal.timeType;

        this.setState({
          doctorId: doctorId,
          timeType: timeType,
        });
      }
    }
  }

  buildDataGender = (data) => {
    let result = [];
    let language = this.props.language;

    if (data && data.length > 0) {
      data.map((item) => {
        let object = {};
        object.label = language === LANGUAGES.VI ? item.valueVi : item.valueEn;
        object.value = item.keyMap;
        result.push(object);
      });
    }
    return result;
  };

  toggle = () => {
    this.props.closeBookingModal();
  };

  handleOnChangeInput = (event, id) => {
    let valueInput = event.target.value;
    let stateCopy = { ...this.state };

    stateCopy[id] = valueInput;

    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      birthday: date[0],
    });
  };

  handleChangeSelect = (selectedGender) => {
    this.setState({
      selectedGender: selectedGender,
    });
  };

  buildTimeBooking = (dataTime) => {
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

      return `${date} - ${time} `;
    }
    return '';
  };

  buildDoctorName = (dataTime) => {
    let { language } = this.props;

    if (dataTime && !_.isEmpty(dataTime)) {
      let name =
        language === LANGUAGES.VI
          ? `${dataTime.doctorData.lastName} ${dataTime.doctorData.firstName}`
          : `${dataTime.doctorData.firstName} ${dataTime.doctorData.lastName}`;

      return name;
    }
    return '';
  };

  handleConfirmBooking = async () => {
    let date = new Date(this.state.birthday).getTime();

    let timeString = this.buildTimeBooking(this.props.dataScheduleTimeModal);
    let doctorName = this.buildDoctorName(this.props.dataScheduleTimeModal);

    let res = await postPatientBookAppointment({
      fullName: this.state.fullName,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      reason: this.state.reason,
      date: date,
      selectedGender: this.state.selectedGender.value,
      doctorId: this.state.doctorId,
      timeType: this.state.timeType,
      language: this.props.language,
      timeString: timeString,
      doctorName: doctorName,
    });

    if (res && res.errCode === 0) {
      toast.success('Booking success!');
      this.props.closeBookingModal();
    } else {
      toast.error('Missing required parameter!');
    }
  };

  render() {
    let { isOpenModal, dataScheduleTimeModal } = this.props;
    let { fullName, phoneNumber, email, address, reason, birthday, selectedGender, genders } = this.state;

    let doctorId =
      dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';

    return (
      <>
        <Modal
          isOpen={isOpenModal}
          className={'modal-user-container'}
          centered
          size="lg"
          toggle={() => this.toggle()}
        >
          <div className="modal-content">
            <ModalHeader className={'modal-header'} toggle={() => this.toggle()}>
              <ProfileDoctor
                doctorId={doctorId}
                isShowDescriptionDoctor={false}
                dataScheduleTimeModal={dataScheduleTimeModal}
              />
            </ModalHeader>
            <ModalBody>
              <div className="doctor-infor"></div>

              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.email" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={email}
                    onChange={(event) => this.handleOnChangeInput(event, 'email')}
                  />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.full-name" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={fullName}
                    onChange={(event) => this.handleOnChangeInput(event, 'fullName')}
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.address" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={address}
                    onChange={(event) => this.handleOnChangeInput(event, 'address')}
                  />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.phone-number" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={phoneNumber}
                    onChange={(event) => this.handleOnChangeInput(event, 'phoneNumber')}
                  />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.gender" />
                  </label>
                  <Select value={selectedGender} onChange={this.handleChangeSelect} options={genders} />
                </div>
                <div className="col-4 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.date" />
                  </label>

                  <DatePicker
                    className="form-control"
                    onChange={this.handleOnChangeDatePicker}
                    value={birthday}
                  />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">
                    {' '}
                    <FormattedMessage id="patient.booking-modal.reason" />
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    value={reason}
                    onChange={(event) => this.handleOnChangeInput(event, 'reason')}
                  />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="px-3 book" onClick={() => this.handleConfirmBooking()}>
                <FormattedMessage id="patient.booking-modal.book" />
              </Button>{' '}
              <Button color="primary" className="px-3 cancel" onClick={() => this.toggle()}>
                <FormattedMessage id="patient.booking-modal.cancel" />
              </Button>
            </ModalFooter>
          </div>
        </Modal>
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    language: state.app.language,
    genders: state.admin.genders,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getGenders: () => dispatch(actions.fetchGenderStart()),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
