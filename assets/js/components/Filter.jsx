import React from "react";

function Filter(props) {
  const className = "btn-flat collection-item black-text";
  const { toggleVisibility, all, inProgress, completed } = props;

  return (
    <ul className="collection col s12 filter">
      <a className={className} onClick={() => toggleVisibility("all")}>
        All ({all})
      </a>
      <a className={className} onClick={() => toggleVisibility("inProgress")}>
        In Progress ({inProgress})
      </a>
      <a className={className} onClick={() => toggleVisibility("completed")}>
        Completed ({completed})
      </a>
    </ul>
  );
}

export default Filter;
