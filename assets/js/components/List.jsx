import React from "react";
import Item from "./Item";

class List extends React.Component {
  render() {
    const items = this.props.todoItems.map(
      (item, i) =>
        <Item
          key={i}
          item={item}
          onToggle={() => this.props.onTodoToggle(item.id)}
          onDelete={() => this.props.onTodoDelete(item.id)}
        />
    );

    return (
      <ul className="collection col s12">
        {items}
      </ul>
    )
  }
}

export default List;
