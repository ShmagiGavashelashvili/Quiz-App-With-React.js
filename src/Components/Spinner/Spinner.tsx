import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import "./spinner.css";

const Spinner = (): JSX.Element => {
  return (
    <div className="spinner" data-testid="spinner">
      <FontAwesomeIcon icon={faSpinner} />
    </div>
  );
};

export default Spinner;
