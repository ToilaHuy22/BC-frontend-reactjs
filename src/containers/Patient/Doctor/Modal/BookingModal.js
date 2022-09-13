import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './BookingModal.scss';
import '../../../System/Admin/UserRedux.scss';
import { LANGUAGES } from '../../../../utils';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import ProfileDoctor from '../ProfileDoctor';
import _ from 'lodash';

class BookingModal extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  toggle = () => {
    this.props.closeBookingModal();
  };

  render() {
    let { isOpenModal, dataScheduleTimeModal } = this.props;
    let doctorId = dataScheduleTimeModal && !_.isEmpty(dataScheduleTimeModal) ? dataScheduleTimeModal.doctorId : '';

    console.log('data props form modal', dataScheduleTimeModal);

    return (
      <>
        <Modal isOpen={isOpenModal} className={'modal-user-container'} centered size="lg" toggle={() => this.toggle()}>
          <div className="modal-content">
            <ModalHeader className={'modal-header'} toggle={() => this.toggle()}>
              <ProfileDoctor doctorId={doctorId} isShowDescriptionDoctor={true} />
            </ModalHeader>
            <ModalBody>
              <div className="doctor-infor"></div>

              <div className="row">
                <div className="col-6 form-group">
                  <label htmlFor="">Ho Ten</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">So dien thoai</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Email</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Dia chi lien he</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Gioi tinh</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-6 form-group">
                  <label htmlFor="">Dat cho ai</label>
                  <input type="text" className="form-control" />
                </div>
                <div className="col-12 form-group">
                  <label htmlFor="">li do kham</label>
                  <input type="text" className="form-control" />
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" className="px-3">
                Dat lich
              </Button>{' '}
              <Button color="secondary" className="px-3" onClick={() => this.toggle()}>
                Thoat
              </Button>
            </ModalFooter>
          </div>
        </Modal>
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

export default connect(mapStateToProps, mapDispatchToProps)(BookingModal);
