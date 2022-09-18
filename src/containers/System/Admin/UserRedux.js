import React, { Component } from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import Lightbox from 'react-image-lightbox';
import 'react-image-lightbox/style.css';
import './UserRedux.scss';
import { getAllCodeService } from '../../../services/userService';
import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import * as actions from '../../../store/actions';
import TableManageUser from './TableManageUser';
import logger from 'redux-logger';

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgUrl: '',
      isOpen: false,

      email: '',
      password: '',
      firstName: '',
      lastName: '',
      phoneNumber: '',
      address: '',
      gender: '',
      position: '',
      role: '',
      avatar: '',

      action: '',
      userEditId: '',
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
    // try {
    //   let res = await getAllCodeService("gender");
    //   if (res && res.errCode === 0) {
    //     this.setState({
    //       genderArr: res.data,
    //     });
    //   }
    //   console.log("check gender", res);
    // } catch (e) {
    //   console.log(e);
    // }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.genderRedux !== this.props.genderRedux) {
      //default dropdown
      let arrGenders = this.props.genderRedux;
      this.setState({
        genderArr: this.props.genderRedux,
        //default dropdown
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: this.props.positionRedux,
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      let arrRoles = this.props.roleRedux;
      this.setState({
        roleArr: this.props.roleRedux,
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
      });
    }
    //reset-state
    if (prevProps.listUsers !== this.props.listUsers) {
      let arrGenders = this.props.genderRedux;
      let arrPositions = this.props.positionRedux;
      let arrRoles = this.props.roleRedux;
      this.setState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: '',
        address: '',
        gender: arrGenders && arrGenders.length > 0 ? arrGenders[0].keyMap : '',
        role: arrRoles && arrRoles.length > 0 ? arrRoles[0].keyMap : '',
        position: arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : '',
        avatar: '',
        action: CRUD_ACTIONS.CREATE,
        previewImgUrl: '',
      });
    }
  }

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        avatar: base64,
      });
    }
  };
  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    let { action } = this.state;
    if (action === CRUD_ACTIONS.CREATE) {
      //fire redux create user
      this.props.createNewUser({
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
    if (action === CRUD_ACTIONS.EDIT) {
      //fire redux edit user
      this.props.editAUserRedux({
        id: this.state.userEditId,
        email: this.state.email,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        address: this.state.address,
        phonenumber: this.state.phoneNumber,
        gender: this.state.gender,
        roleId: this.state.role,
        positionId: this.state.position,
        avatar: this.state.avatar,
      });
    }
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = ['email', 'password', 'firstName', 'lastName', 'phoneNumber', 'address'];
    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert('Missing required parameters: ' + arrCheck[i]);
        break;
      }
    }
    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };

    copyState[id] = event.target.value;
    this.setState({
      ...copyState,
    });
  };

  handleEditUserFromParent = (user) => {
    //PARSE buffer to base64
    let imageBase64 = '';
    if (user.image) {
      imageBase64 = Buffer.from(user.image, 'base64').toString('binary');
    }
    this.setState({
      email: user.email,
      password: 'hardcode',
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phonenumber,
      address: user.address,
      gender: user.gender,
      role: user.roleId,
      position: user.positionId,
      avatar: '',
      previewImgUrl: imageBase64,
      action: CRUD_ACTIONS.EDIT,
      userEditId: user.id,
    });
  };

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;
    let language = this.props.language;
    let isLoading = this.props.isLoading;
    let { email, password, firstName, lastName, phoneNumber, address, gender, role, position, avatar } =
      this.state;

    return (
      <div className="user-redux-container">
        <div className="title my-5">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3 form-title">
                <FormattedMessage id={'manage-user.add'} />
              </div>

              <div className="col-4">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.email'} />
                </label>
                <input
                  className="form-control"
                  type="email"
                  value={email}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  onChange={(event) => this.onChangeInput(event, 'email')}
                />
              </div>
              <div className="col-2">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.password'} />
                </label>
                <input
                  className="form-control"
                  type="password"
                  value={password}
                  disabled={this.state.action === CRUD_ACTIONS.EDIT ? true : false}
                  onChange={(event) => this.onChangeInput(event, 'password')}
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.first-name'} />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, 'firstName')}
                />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.last-name'} />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, 'lastName')}
                />
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.phone-number'} />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, 'phoneNumber')}
                />
              </div>
              <div className="col-8 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.address'} />
                </label>
                <input
                  className="form-control"
                  type="text"
                  value={address}
                  onChange={(event) => this.onChangeInput(event, 'address')}
                />
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.gender'} />
                </label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(event) => this.onChangeInput(event, 'gender')}
                >
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.position'} />
                </label>
                <select
                  className="form-control"
                  value={position}
                  onChange={(event) => this.onChangeInput(event, 'position')}
                >
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.role-id'} />
                </label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(event) => this.onChangeInput(event, 'role')}
                >
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index} value={item.keyMap}>
                          {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12 mt-3">
                <label htmlFor="">
                  {' '}
                  <FormattedMessage id={'manage-user.image'} />
                </label>
                <div className="preview-img-container ">
                  <input
                    id="previewImg"
                    type="file"
                    hidden
                    onChange={(event) => this.handleOnChangeImage(event)}
                  />
                  <label className="label-upload mt-2" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                </div>
              </div>
              <div className="col-12 mt-3">
                <div
                  className="preview-image col-4"
                  style={{
                    backgroundImage: `url(${this.state.previewImgUrl})`,
                  }}
                  onClick={() => this.openPreviewImage()}
                ></div>
              </div>
              <div className="col-12 mt-3">
                <button
                  className={
                    this.state.action === CRUD_ACTIONS.EDIT ? 'btn btn-primary edit' : 'btn btn-primary save'
                  }
                  onClick={() => this.handleSaveUser()}
                >
                  {' '}
                  {this.state.action === CRUD_ACTIONS.EDIT ? (
                    <FormattedMessage id={'manage-user.edit'} />
                  ) : (
                    <FormattedMessage id={'manage-user.save'} />
                  )}
                </button>
              </div>

              <div className="col-12">{isLoading === true ? 'Loading' : ' '}</div>
              <div className="col-12 mb-5">
                <TableManageUser
                  handleEditUserFromParent={this.handleEditUserFromParent}
                  action={this.state.action}
                />
              </div>
            </div>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgUrl}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoading: state.admin.isLoading,
    //reset state
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
