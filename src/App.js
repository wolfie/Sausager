import React from "react";
import PersonInput from "./PersonInput";
import uuid from "uuid/v4";

const randomFromArray = a => a[Math.floor(Math.random() * a.length)];

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [{ key: uuid(), name: "foo" }],
      randomPerson: null
    };
    this.inputRef = React.createRef();
    this.addPerson = this.addPerson.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.selectRandomPerson = this.selectRandomPerson.bind(this);
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

  selectRandomPerson() {
    this.setState(state => ({
      randomPerson: randomFromArray(state.people).name
    }));
  }

  render() {
    const PersonInputArea = () => (
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
        <button onClick={this.selectRandomPerson}>Throw the sausage</button>
      </div>
    );

    return !this.state.randomPerson ? (
      <PersonInputArea />
    ) : (
      this.state.randomPerson
    );
  }
}

export default App;
