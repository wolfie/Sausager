import React from "react";

class PersonInput extends React.Component {
  constructor() {
    super();

    this.state = { name: "" };
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
    this.props.personNameSubmitted(this.inputRef.current.value);
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
      <div>
        <form onSubmit={this.submitHandler}>
          <input ref={this.inputRef} />
          {this.props.deleteHandler ? (
            <button onClick={this.buttonClickHandler}>x</button>
          ) : null}
        </form>
      </div>
    );
  }
}

export default PersonInput;
