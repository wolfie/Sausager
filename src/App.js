import React from "react";
import PersonInputArea from "./PersonInputArea";
import uuid from "uuid/v4";

const randomFromArray = a => a[Math.floor(Math.random() * a.length)];

const style = {
  margin: "0 auto",
  marginTop: "100px",
  width: "400px",
  textAlign: "center",
  fontFamily: "sans-serif"
};

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      people: [],
      randomPerson: null
    };

    this.addPerson = this.addPerson.bind(this);
    this.editPerson = this.editPerson.bind(this);
    this.deletePerson = this.deletePerson.bind(this);
    this.selectRandomPerson = this.selectRandomPerson.bind(this);
  }

  addPerson(personName) {
    this.setState(state => ({
      people: [...state.people, { key: uuid(), name: personName }]
    }));
  }

  editPerson(key) {
    return newPersonName => {
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
    const piaProps = {
      people: this.state.people,
      editPerson: this.editPerson,
      deletePerson: this.deletePerson,
      addPerson: this.addPerson,
      selectRandomPerson: this.selectRandomPerson
    };

    return (
      <div style={style}>
        <h1>Sausager</h1>
        {!this.state.randomPerson ? (
          <PersonInputArea {...piaProps} />
        ) : (
          this.state.randomPerson
        )}
      </div>
    );
  }
}

export default App;
