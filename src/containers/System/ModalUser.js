import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class ModalUser extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  toggle = () => {
    this.props.toggleFromParent();
  };

  render() {
    console.log(this.props);
    console.log(this.props.isOpen);
    return (
      <Modal
        isOpen={this.props.isOpen}
        toggle={() => this.toggle()}
        className={"modal-user-container"}
        size="xl"
      >
        <div className="modal-content">
          <ModalHeader className={"modal-header"} toggle={() => this.toggle()}>
            Create a new user
          </ModalHeader>
          <ModalBody>
            <div className="modal-user-body">
              <div className="input-container">
                <label htmlFor="">Email</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label htmlFor="">Password</label>
                <input type="password" />
              </div>
              <div className="input-container">
                <label htmlFor="">First Name</label>
                <input type="text" />
              </div>
              <div className="input-container">
                <label htmlFor="">Last Name</label>
                <input type="text" />
              </div>
              <div className="input-container max-width-input">
                <label htmlFor="">Address</label>
                <input type="text" />
              </div>
            </div>
          </ModalBody>
          <ModalFooter>
            <Button
              color="primary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Save changes
            </Button>{" "}
            <Button
              color="secondary"
              className="px-3"
              onClick={() => this.toggle()}
            >
              Close
            </Button>
          </ModalFooter>
        </div>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ModalUser);
