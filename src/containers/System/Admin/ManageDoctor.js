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
      selectedOption: "",
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
    this.props.fetchAllDoctor();
    this.props.getRequiredDoctorInfor();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      this.setState({
        listDoctors: dataSelect,
      });
    }

    if (prevProps.language !== this.props.language) {
      let dataSelect = this.buildDataInputSelect(this.props.allDoctors, "USERS");
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");

      this.setState({
        listDoctors: dataSelect,
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }

    if (prevProps.allRequiredDoctorInfor !== this.props.allRequiredDoctorInfor) {
      let { resPayment, resPrice, resProvince } = this.props.allRequiredDoctorInfor;

      let dataSelectPrice = this.buildDataInputSelect(resPrice, "PRICE");
      let dataSelectPayment = this.buildDataInputSelect(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildDataInputSelect(resProvince, "PROVINCE");

      console.log("data new:", dataSelectPrice, dataSelectPayment, dataSelectProvince);

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
      });
    }
  }

  buildDataInputSelect = (inputData, type) => {
    let result = [];
    let { language } = this.props;

    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.lastName} ${item.firstName}`;
          let labelEn = `${item.firstName} ${item.lastName}`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.id;
          result.push(object);
        });
      }

      if (type === "PRICE") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.valueVi} VND`;
          let labelEn = `${item.valueEn} USD`;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }

      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((item, index) => {
          let object = {};

          let labelVi = `${item.valueVi} `;
          let labelEn = `${item.valueEn} `;

          object.label = language === LANGUAGES.VI ? labelVi : labelEn;
          object.value = item.keyMap;
          result.push(object);
        });
      }
    }
    return result;
  };

  // Finish!
  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentMarkdown: text,
      contentHTML: html,
    });
  };

  handleSaveContentMarkdown = () => {
    let { hasOldData } = this.state;

    this.props.saveDetailDoctors({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      //Map action edit or create DetailData Doctor
      action: hasOldData === true ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,

      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      nameClinic: this.state.nameClinic,
      addressClinic: this.state.addressClinic,
      note: this.state.note,
    });
  };

  handleChangeSelect = async (selectedOption) => {
    this.setState({ selectedOption });

    let { listPayment, listPrice, listProvince } = this.state;

    let res = await getDetailInforDoctor(selectedOption.value);

    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;

      let addressClinic = "",
        nameClinic = "",
        note = "",
        paymentId = "",
        priceId = "",
        provinceId = "",
        selectedProvince = "",
        selectedPayment = "",
        selectedPrice = "";

      if (res.data.Doctor_Infor) {
        addressClinic = res.data.Doctor_Infor.addressClinic;
        nameClinic = res.data.Doctor_Infor.nameClinic;
        note = res.data.Doctor_Infor.note;
        paymentId = res.data.Doctor_Infor.paymentId;
        provinceId = res.data.Doctor_Infor.provinceId;
        priceId = res.data.Doctor_Infor.priceId;

        //loaddata for 3 select Doctor_Infor
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
      }

      this.setState({
        contentHTML: markdown.contentHTML,
        contentMarkdown: markdown.contentMarkdown,
        description: markdown.description,
        addressClinic: addressClinic,
        nameClinic: nameClinic,
        note: note,
        selectedPayment: selectedPayment,
        selectedPrice: selectedPrice,
        selectedProvince: selectedProvince,
        hasOldData: true,
      });
    } else {
      this.setState({
        contentHTML: "",
        contentMarkdown: "",
        description: "",
        addressClinic: "",
        nameClinic: "",
        note: "",
        hasOldData: false,
      });
    }
    console.log("Option seclected", res);
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.stateName };
    stateCopy[stateName] = selectedOption;

    this.setState({
      ...stateCopy,
    });

    console.log("check new select onChange", selectedOption, stateName);
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;

    this.setState({
      ...stateCopy,
    });
  };

  render() {
    console.log("check state", this.state);
    let {
      selectedOption,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      listDoctors,
      description,
      hasOldData,
      listPrice,
      listPayment,
      listProvince,
      note,
      nameClinic,
      addressClinic,
    } = this.state;
    return (
      <div className="manage-doctor-container container">
        <div className="manage-doctor-title title my-5">
          <FormattedMessage id="admin.manage-doctor.title" />
        </div>

        <div className="more-infor row ">
          <div className="content-left col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.choose-doctor" />
            </label>
            <Select
              className="form-select"
              value={selectedOption}
              onChange={this.handleChangeSelect}
              options={listDoctors}
              placeholder={<FormattedMessage id="admin.manage-doctor.choose-doctor" />}
            />
          </div>

          <div className="content-right">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.doctor-infor" />
            </label>
            <textarea
              className="form-control"
              rows="1"
              onChange={(event) => this.handleOnChangeText(event, "description")}
              value={description}
            ></textarea>
          </div>
        </div>
        <div className="more-infor-extra row mt-3">
          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.price" />
            </label>
            <Select
              className="form-select"
              value={selectedPrice}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedPrice"
              options={listPrice}
              placeholder={<FormattedMessage id="admin.manage-doctor.price" />}
            />
          </div>

          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.payment" />
            </label>
            <Select
              className="form-select"
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedPayment"
              options={listPayment}
              placeholder={<FormattedMessage id="admin.manage-doctor.payment" />}
            />
          </div>

          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.province" />
            </label>
            <Select
              className="form-select"
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              name="selectedProvince"
              options={listProvince}
              placeholder={<FormattedMessage id="admin.manage-doctor.province" />}
            />
          </div>

          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.name-clinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={nameClinic}
            />
          </div>

          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.add-clinic" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "addressClinic")}
              value={addressClinic}
            />
          </div>

          <div className="col-4 form-group">
            <label htmlFor="">
              <FormattedMessage id="admin.manage-doctor.note" />
            </label>
            <input
              type="text"
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={note}
            />
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
          className={hasOldData === true ? "btn btn-primary edit " : "btn btn-primary save "}
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
    allDoctors: state.admin.allDoctors,
    language: state.app.language,
    allRequiredDoctorInfor: state.admin.allRequiredDoctorInfor,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchAllDoctor: () => dispatch(actions.fetchAllDoctor()),
    getRequiredDoctorInfor: () => dispatch(actions.getRequiredDoctorInfor()),
    saveDetailDoctors: (data) => dispatch(actions.saveDetailDoctors(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
