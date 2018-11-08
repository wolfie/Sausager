import React from "react";
import PersonInput from "./PersonInput";
import uuid from "uuid/v4";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [{ key: uuid(), name: "foo" }]
    };
    this.inputRef = React.createRef();
    this.addPerson = this.addPerson.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
  }

  addPerson(personName) {
    this.setState(state => ({
      people: [...state.people, { key: uuid(), name: personName }]
    }));
    this.inputRef.current.clearName();
    this.inputRef.current.focus();
  }

  editPerson(key) {
    return newPersonName => {
      this.inputRef.current.focus();
      this.setState(state => ({
        people: state.people.map(
          existingEntry =>
            existingEntry.key === key
              ? { key, name: newPersonName }
              : existingEntry
        )
      }));
    };
  }

  deletePerson(keyToDelete) {
    return () => {
      this.setState(state => ({
        people: state.people.filter(({ key }) => key !== keyToDelete)
      }));
      this.inputRef.current.focus();
    };
  }

  render() {
    return (
      <div>
        {this.state.people.map(({ key, name }) => (
          <PersonInput
            key={key}
            name={name}
            personNameSubmitted={this.editPerson(key)}
            deleteHandler={this.deletePerson(key)}
          />
        ))}
        <PersonInput ref={this.inputRef} personNameSubmitted={this.addPerson} />
      </div>
    );
  }
}

export default App;
