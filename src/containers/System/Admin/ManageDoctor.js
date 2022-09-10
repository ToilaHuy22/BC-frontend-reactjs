import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserRedux.scss";
import "./ManageDoctor.scss";
import * as actions from "../../../store/actions";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
// import style manually
import "react-markdown-editor-lite/lib/index.css";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";
import Select from "react-select";
import { getDetailInforDoctor } from "../../../services/userService";

// Register plugins if required
// MdEditor.use(YOUR_PLUGINS_HERE);

// Initialize a markdown parser
const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      //state for markdown table
      contentMarkdown: "",
      contentHTML: "",
      selectedDoctor: "",
      description: "",
      listDoctors: [],
      hasOldData: false,

      //state for doctor_infor table
      listPrice: [],
      listPayment: [],
      listProvince: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }

  componentDidMount() {
    this.props.fetchAllDoctorRedux();
    this.props.getRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctorsRedux !== this.props.allDoctorsRedux) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctorsRedux);
      this.setState({
        listDoctors: dataSelect,
      });
    }
    if (
      prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor
    ) {
      let { resPayment, resPrice, resProvince } =
        this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice);
      let dataSelectPayment = this.buildDataInputSelect(resPayment);
      let dataSelectProvince = this.buildDataInputSelect(resProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;
    this.props.saveDetailDoctorsRedux({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedDoctor.value,
      //Map action edit or create DetailData Doctor
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
    });
  };

  handleChangeSelect = async (selectedDoctor) => {
    this.setState({ selectedDoctor });
    let res = await getDetailInforDoctor(selectedDoctor.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        hasOldData: false,
      });
    }
    console.log("Option seclected", res);
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;
    if (inputData && inputData.length > 0) {
      inputData.map((item, index) => {
        let object = {};
        let labelVi =
          type === "USERS"
            ? `${item.lastName} ${item.firstName}`
            : item.valueVi;

        let labelEn =
          type === "USERS"
            ? `${item.firstName} ${item.lastName}`
            : item.valueEn;

        object.label = language === LANGUAGES.VI ? labelVi : labelEn;
        object.value = item.id;
        result.push(object);
      });
    }
    return result;
  };

  render() {
    let {
      selectedDoctor,
      listDoctors,
      description,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
    } = this.state;
    return (
      <div className="manage-doctor-container container">
        <div className="manage-doctor-title title my-5">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>
        <div className="more-infor ">
          <div className="content-left form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              className="form-select"
              value={selectedDoctor}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={"Chọn bác sĩ"}
            />
          </div>
          <div className="content-right">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.doctor-infor" />
            </label>
            <textarea
              className="form-control"
              rows="1"
              onChange={(event) => this.handleOnChangeDesc(event)}
              value={description}
            >
              123123123123123123123123123123
            </textarea>
          </div>
        </div>
        <div className="more-infor-extra row mt-3">
          <div className="col-4 form-group">
            <label htmlFor="">Chọn giá</label>
            <Select
              className="form-select"
              // value={selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={listPrice}
              placeholder={"Chọn giá"}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chọn phương thức thanh toán</label>
            <Select
              className="form-select"
              // value={selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={listPayment}
              placeholder={"Chọn phương thức thanh toán"}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Chọn tỉnh thành</label>
            <Select
              className="form-select"
              // value={selectedDoctor}
              // onChange={this.handleChangeSelect}
              options={listProvince}
              placeholder={"Chọn tỉnh thành"}
            />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Tên phòng khám</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Địa chỉ phòng khám</label>
            <input type="text" className="form-control" />
          </div>
          <div className="col-4 form-group">
            <label htmlFor="">Note</label>
            <input type="text" className="form-control" />
          </div>
        </div>
        <div className="manage-doctor-editor my-3">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>
        <button
          className={
            hasOldData === true
              ? "btn btn-primary edit "
              : "btn btn-primary save "
          }
          onClick={() => this.handleSaveContentMarkdown()}
        >
          {hasOldData === true ? (
            <span>
              <FormattedMessage id="admin.manage-doctor.edit" />
            </span>
          ) : (
            <span>
              <FormattedMessage id="admin.manage-doctor.save" />
            </span>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctorsRedux: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctorRedux: () => dispatch(actions.fetchAllDoctor()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctorsRedux: (data) => dispatch(actions.saveDetailDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
