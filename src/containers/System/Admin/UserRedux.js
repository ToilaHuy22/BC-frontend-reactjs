import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { getAllCodeService } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import * as actions from "../../../store/actions";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
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
      this.setState({
        genderArr: this.props.genderRedux,
      });
    }
    if (prevProps.positionRedux !== this.props.positionRedux) {
      this.setState({
        positionArr: this.props.positionRedux,
      });
    }
    if (prevProps.roleRedux !== this.props.roleRedux) {
      this.setState({
        roleArr: this.props.roleRedux,
      });
    }
  }

  render() {
    let genders = this.state.genderArr;
    let positions = this.state.positionArr;
    let roles = this.state.roleArr;

    let language = this.props.language;
    let isLoadingGender = this.props.isLoadingGender;
    console.log("state component", this.state);
    return (
      <div className="user-redux-container">
        <div className="title">User Redux</div>
        <div className="user-redux-body">
          <div className="container">
            <div className="row">
              <div className="col-12 my-3">
                <FormattedMessage id={"manage-user.add"} />
              </div>
              <div className="col-12">
                {isLoadingGender === true ? "Loading gender" : " "}
              </div>
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.email"} />
                </label>
                <input className="form-control" type="email" />
              </div>
              <div className="col-2">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.password"} />
                </label>
                <input className="form-control" type="password" />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.first-name"} />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-3">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.last-name"} />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.phone-number"} />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-8">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.address"} />
                </label>
                <input className="form-control" type="text" />
              </div>
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.gender"} />
                </label>
                <select className="form-control">
                  {genders &&
                    genders.length > 0 &&
                    genders.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.position"} />
                </label>
                <select className="form-control">
                  {roles &&
                    roles.length > 0 &&
                    roles.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-4">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.role-id"} />
                </label>
                <select className="form-control">
                  {positions &&
                    positions.length > 0 &&
                    positions.map((item, index) => {
                      return (
                        <option key={index}>
                          {language === LANGUAGES.VI
                            ? item.valueVi
                            : item.valueEn}
                        </option>
                      );
                    })}
                </select>
              </div>
              <div className="col-12">
                <label htmlFor="">
                  {" "}
                  <FormattedMessage id={"manage-user.image"} />
                </label>
                <div className="preview-img-container ">
                  <input id="previewImg" type="file" hidden />
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                </div>
              </div>
              <div className=" col-12">
                <div className="preview-image col-4"></div>
              </div>
              <div className="col-12 mt-3">
                <button className="btn btn-primary save">
                  {" "}
                  <FormattedMessage id={"manage-user.save"} />
                </button>
              </div>
            </div>
          </div>
        </div>
        ;
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
    isLoadingGender: state.admin.isLoadingGender,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    // processLogout: () => dispatch(actions.processLogout()),
    // changeLanguageAppRedux: (language) =>dispatch(actions.changeLanguageApp(language)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
