import React from "react";
import List from "./List";
import Input from "./Input";
import Filter from "./Filter";
import TodoApi from "../api/todo_api";

const id = (item) => item;

const select = (items) => (predicate) => items.filter(predicate);

const findBy = (items) => (predicate) => items.find(predicate);

const countBy = (items) => (predicate) => select(items)(predicate).length;

const mapObject = (obj) => (callback) => {
  return Object.entries(obj).reduce((newObj, [key, value]) => {
    newObj[key] = callback(value);
    return newObj;
  }, {});
};

class TodoList extends React.Component {
  filters = {
    all: id,
    completed: (item) => item.completed,
    inProgress: (item) => !item.completed
  };

  constructor(props) {
    super(props);

    this.state = {
      todoItems: [],
      visibility: "all"
    };

    TodoApi.read().then((json) => this.setState({...this.state, todoItems: json.data}));
  }

  toggleItem = (id) => {
    const todo = findBy(this.state.todoItems)(item => item.id === id);

    TodoApi.update(id, {completed: !todo.completed})
      .then(({data}) => {
        const newTodoItems = this.state.todoItems.map((item) => item.id === id ? data : item);
        this.setState({...this.state, todoItems: newTodoItems})
      });
  };

  addItem = (description) => {
    TodoApi.post({description})
      .then((json) => {
        this.setState({todoItems: [...this.state.todoItems, json.data]})
      });
  };

  deleteTodo = (id) => {
    TodoApi.remove(id).then(() => {
      this.setState({
        ...this.state,
        todoItems: this.state.todoItems.filter((item) => id !== item.id)
      })
    });
  };

  countTodoItems = (items) => {
    const countItemsBy = countBy(items);

    return mapObject(this.filters)(countItemsBy);
  };

  toggleVisibility = (visibility) => {
    this.setState({...this.state, visibility})
  };

  render() {
    const { todoItems, visibility} = this.state;
    const visibilityFilter = this.filters[visibility];

    return (
      <div className="row">
        <div className="col s12 l8 offset-l2">
          <Input onSubmit={this.addItem}/>
          <Filter {...this.countTodoItems(todoItems)} toggleVisibility={this.toggleVisibility}/>
          <List
            todoItems={select(todoItems)(visibilityFilter)}
            onTodoToggle={this.toggleItem}
            onTodoDelete={this.deleteTodo}
          />
        </div>
      </div>
    );
  }
}

export default TodoList;
