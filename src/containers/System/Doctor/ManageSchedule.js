import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import "../Admin/UserRedux.scss";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import * as actions from "../../../store/actions";
import { LANGUAGES, dateFormat } from "../../../utils";
import { saveBulkScheduleDoctor } from "../../../services/userService";
import DatePicker from "../../../components/Input/DatePicker";
import moment from "moment/moment";
import { toast } from "react-toastify";
import _ from "lodash";

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
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }
      this.setState({
        rangeTime: data,
      });
    }
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

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;

    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  handleSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;

    // let formattedDate = moment(currentDate).format(dateFormat.SEND_TO_SERVER);

    let result = [];

    if (!currentDate) {
      toast.error("Invalid date!");
      return;
    }
    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected Doctor!");
      return;
    }

    let formattedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);
      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule, index) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formattedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected Time!");
        return;
      }
    }
    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formattedDate: formattedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Save the schedule success!");
    } else {
      toast.error("Save failure schedule!");
      console.log("Error saveBulkScheduleDoctor >>> res: ", res);
    }

    console.log("save check bulkSchedule", res);

    console.log("check result", result);
  };

  render() {
    // console.log("check props", this.state);
    let { listDoctors, selectedDoctor, currentDate, rangeTime } = this.state;
    let { language } = this.props;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

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
                minDate={yesterday}
              />
            </div>
            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-primary btn-schedule mx-2 my-2 active"
                          : "btn btn-primary btn-schedule mx-2 my-2"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {language === LANGUAGES.VI ? item.valueVi : item.valueEn}
                    </button>
                  );
                })}
            </div>
            <button
              className="btn btn-primary "
              onClick={() => this.handleSaveSchedule()}
            >
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
