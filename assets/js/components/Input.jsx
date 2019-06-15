import React from "react";

class Input extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "", error: false }
  }

  handleChange = (event) => {
    this.setState({value: event.target.value, error: false})
  };

  handleSubmit = (event) => {
    event.preventDefault();
    if (this.state.value.length) {
      this.props.onSubmit(this.state.value);
      this.setState({value: "", error: false})
    } else {
      this.setState({...this.state, error: true})
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="input-field col s12 todo-input">
          <input
            type="text" placeholder="" value={this.state.value}
            onChange={this.handleChange} className={"validate" + (this.state.error ? " invalid" : "")}
          />
          <label htmlFor="todo">What you have to do?</label>
          <span className="helper-text" data-error="can't be blank" />
        </div>
      </form>
    );
  }
}

export default Input;
