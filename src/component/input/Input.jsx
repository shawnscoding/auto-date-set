import React from "react";
import PropTypes from "prop-types";

const Input = ({ input, handlePaste, placeholder }) => {
  return (
    <div>
      <textarea
        multiple
        value={input}
        cols="100"
        placeholder={placeholder}
        rows="40"
        onChange={(e) => handlePaste(e)}
      />
    </div>
  );
};

Input.propTypes = {
  input: PropTypes.string.isRequired,
  handlePaste: PropTypes.func.isRequired,
};

export default Input;
