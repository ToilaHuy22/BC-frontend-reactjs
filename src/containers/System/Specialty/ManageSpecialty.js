import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';
import './ManageSpecialty.scss';
import '../../System/Admin/UserRedux.scss';
import Lightbox from 'react-image-lightbox';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import { createNewSpecialty } from '../../../services/userService';

import { LANGUAGES, CRUD_ACTIONS, CommonUtils } from '../../../utils';
import { toast } from 'react-toastify';

const mdParser = new MarkdownIt(/* Markdown-it options */);

class ManageSpecialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionHTML: '',
      descriptionMarkdown: '',
      previewImgUrl: '',
      isOpen: false,
      name: '',
      imageBase64: '',
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgUrl: objectUrl,
        imageBase64: base64,
      });
    }
  };

  handleSaveSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success('Created new specialty!');
    } else {
      toast.error('Create new specialty failed!');
      console.log('check error', res);
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgUrl) return;
    this.setState({
      isOpen: true,
    });
  };

  render() {
    let { name, descriptionMarkdown, previewImgUrl } = this.state;

    return (
      <div className="manage-specialty-container container">
        <div className="title my-5">Manage Specialty</div>

        <div className="add-new-specialty row">
          <div className="col-6">
            <label htmlFor="">Anh chuyen khoa </label>
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

          <div className="col-6 form-group">
            <label htmlFor="">Ten chuyen khoa</label>
            <input
              type="text"
              className="form-control"
              value={name}
              onChange={(event) => this.handleOnChangeInput(event, 'name')}
            />
          </div>

          <div className="col-12">
            <div
              className="preview-image col-4"
              style={{
                backgroundImage: `url(${previewImgUrl})`,
              }}
              onClick={() => this.openPreviewImage()}
            ></div>
          </div>

          <div className="col-12 my-4">
            <MdEditor
              style={{ height: '500px' }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={descriptionMarkdown}
            />
          </div>
          <div className="col-12">
            <button className="btn btn-primary save" onClick={() => this.handleSaveSpecialty()}>
              Luu
            </button>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox mainSrc={previewImgUrl} onCloseRequest={() => this.setState({ isOpen: false })} />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {};
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
