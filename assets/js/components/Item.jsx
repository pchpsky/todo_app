import React from "react";

class Item extends React.Component {
  render() {
    const { description, completed } = this.props.item;
    return (
      <li className="collection-item todo-item">
        <label>
          <input
            className="filled-in"
            type="checkbox"
            checked={completed}
            onChange={this.props.onToggle}
          />
          <span className="black-text">{description}</span>
        </label>
        <button className="btn-flat right btn-delete" onClick={this.props.onDelete}>
          <i className="material-icons">delete</i>
        </button>
      </li>
    );
  }
}

export default Item;
