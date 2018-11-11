import React from "react";
import sausageImg from "./images/sausage.png";

const sausageContainerStyle = {
  backgroundImage: `url('${sausageImg}')`,
  backgroundSize: "100%",
  width: "300px",
  height: "85px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto"
};

const inputStyle = {
  background: "rgba(255,255,255,0.5)",
  border: "2px solid black",
  borderRadius: "4px"
};

class PersonInput extends React.Component {
  constructor() {
    super();

    this.inputRef = React.createRef();
    this.submitHandler = this.submitHandler.bind(this);
    this.buttonClickHandler = this.buttonClickHandler.bind(this);
  }

  componentDidMount() {
    this.inputRef.current.value = this.props.name || null;
  }

  /** @param {KeyboardEvent} e   */
  submitHandler(e) {
    e.preventDefault();
    const trimmedValue = this.inputRef.current.value.trim();
    if (trimmedValue) {
      this.inputRef.current.value = trimmedValue;
      this.props.personNameSubmitted(trimmedValue);
    }
  }

  clearName() {
    this.inputRef.current.value = "";
  }

  focus() {
    this.inputRef.current.focus();
  }

  buttonClickHandler(e) {
    e.preventDefault();
    this.props.deleteHandler();
  }

  render() {
    return (
      <div style={sausageContainerStyle}>
        <form onSubmit={this.submitHandler}>
          <input ref={this.inputRef} style={inputStyle} />
          {this.props.deleteHandler ? (
            <button type="button" onClick={this.buttonClickHandler}>
              x
            </button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default PersonInput;
