import React from "react";

const Dropdown = ({ children }) => {
  return (
    <div className="card dropdownHolder">
      <div className="dropdown">{children}</div>
    </div>
  );
};

export default Dropdown;
