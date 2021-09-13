import React, { useState } from "react";

const ENTER = 13;

export const SearchInput = ({ getResults, reset, searchValue }) => {
  const [input, setInput] = useState("");
  const [isSameInput, setIsSameInput] = useState(false);
  const handleInputChange = (e) => {
    setInput(e.target.value);
    setIsSameInput(false);
  };

  const handleClick = () => {
    if (!isSameInput) getResults(input);
    setIsSameInput(true);
  };

  const handleKeyDown = (event) => {
    if (event.keyCode === ENTER) {
      if (!isSameInput) getResults(input);
      setIsSameInput(true);
    }
  };

  const handleClear = () => {
    setInput("");
    setIsSameInput(false);
    reset();
  };

  return (
    <div className="input-group d-flex justify-content-center border rounded-3">
      <input
        type="text"
        name="googleInput"
        id="googleInput"
        className="form-control mr-2 border-end-0 border-0"
        value={input}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="Search"
      />
      {searchValue && (
        <button
          type="button"
          className="btn-close my-auto mr-1 clearButton"
          aria-label="Close"
          onClick={handleClear}
        ></button>
      )}
      <button
        name="submitGoogleApi"
        id="submitGoogleApi"
        className="btn btn-primary"
        onClick={handleClick}
      >
        Search
      </button>
    </div>
  );
};

export default SearchInput;
