import React from "react";
import PersonInput from "./PersonInput";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: ["foo"]
    };
    this.inputRef = React.createRef();
    this.addPersonHandler = this.addPersonHandler.bind(this);
    this.changePersonHandler = this.addPerson.bind(this);
  }

  addPersonHandler(personName) {
    this.setState(state => ({
      people: [...state.people, personName]
    }));
    this.inputRef.current.clearName();
    this.inputRef.current.focus();
  }

  addPerson(oldPersonName) {
    return newPersonName => {
      this.inputRef.current.focus();
      this.setState(state => ({
        people: state.people.map(
          existingPersonName =>
            oldPersonName === existingPersonName
              ? newPersonName
              : existingPersonName
        )
      }));
    };
  }

  deletePerson(personToDelete) {
    return () => {
      this.setState(state => ({
        people: state.people.filter(
          existingPersonName => existingPersonName !== personToDelete
        )
      }));
      this.inputRef.current.focus();
    };
  }

  render() {
    return (
      <div>
        {this.state.people.map(person => (
          <PersonInput
            key={person}
            name={person}
            personNameSubmitted={this.addPerson(person)}
            deleteHandler={this.deletePerson(person)}
          />
        ))}
        <PersonInput
          ref={this.inputRef}
          personNameSubmitted={this.addPersonHandler}
        />
      </div>
    );
  }
}

export default App;
