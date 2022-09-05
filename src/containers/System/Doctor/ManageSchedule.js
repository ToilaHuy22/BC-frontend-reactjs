import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import "../Admin/UserRedux.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import { getDetailInforDoctor } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment/moment";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctors: [],
      selectedDoctor: "",
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.fetchAllScheduleTime();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      this.setState({
        rangeTime: this.props.allScheduleTime,
      });
    }
    // if (prevProps.language !== this.props.language) {
    //   let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
    //   this.setState({
    //     listDoctors: dataSelect,
    //   });
    // }
  }
  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
  };

  buildDataInputSelect = (inputData) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi = `${item.lastName} ${item.firstName}`;
        let labelEn = `${item.firstName} ${item.lastName}`;
        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };
  render() {
    console.log("check props", this.state);
    let { listDoctors, selectedDoctor, currentDate, rangeTime } = this.state;
    let { language } = this.props;
    return (
      <div className="manage-schedule-container">
        <div className="container">
          <div className="ms-title title my-5">
            <FormattedMessage id="manage-schedule.title" />
          </div>
          <div className="row">
            <div className="col-6 form-group">
              <label htmlFor="">
                <FormattedMessage id="manage-schedule.choose-doctor" />
              </label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctors}
              />
            </div>
            <div className="col-6 form-group">
              <label htmlFor="">
                {" "}
                <FormattedMessage id="manage-schedule.choose-date" />
              </label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
                value={currentDate}
                minDate={new Date()}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button className="btn btn-primary mx-2 my-2" key={index}>
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button className="btn btn-primary">
              {" "}
              <FormattedMessage id="manage-schedule.save" />
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    fetchAllScheduleTime: () => dispatch(actions.fetchAllScheduleTime()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
