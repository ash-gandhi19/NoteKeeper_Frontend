import React from "react";

var Welcome = (props) => {
  return (
    <div className="welcome">
      <h1>{props.headerText}</h1>
    </div>
  );
};

export default Welcome;