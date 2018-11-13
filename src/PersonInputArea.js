import React from "react";
import PersonInput from "./PersonInput";

const PersonInputArea = ({
  people,
  editPerson,
  deletePerson,
  addPerson,
  selectRandomPerson
}) => {
  const inputRef = React.createRef();

  const addPersonProxy = person => {
    inputRef.current.clearName();
    addPerson(person);
  };

  return (
    <div>
      {people.map(({ key, name }) => (
        <PersonInput
          key={key}
          name={name}
          personNameSubmitted={editPerson(key)}
          deleteHandler={deletePerson(key)}
        />
      ))}
      <PersonInput ref={inputRef} personNameSubmitted={addPersonProxy} />
      <button onClick={selectRandomPerson} disabled={people.length === 0}>
        {people.length === 0 ? "Add some people first!" : "Throw the sausage"}
      </button>
    </div>
  );
};

export default PersonInputArea;
