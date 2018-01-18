import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super(); // in order to render todos dynamically we need to give our component state
    // we call super to make sure the constructor for the component class we are extending gets called
    // the state object will contain whatever data structures our component needs to render properly (i.e. a list of todos)
    // the changes in user input need to be reflected in our state
    // we always want our state to be in sync with our view
    this.state = {
      todos: [
        {id: 1, name: 'Finish this app', isComplete: true},
        {id: 2, name: 'Create Nuxt App', isComplete: false},
        {id: 3, name: 'Make REST API', isComplete: false}
      ],
      currentTodo: ''
    }
    // for our event handler/method to update our state, we need to reference the method in our constructor and bind it to this:
    this.handleInputChange = this.handleInputChange.bind(this);
    // this is to ensure that when we call this.setState() in our method, the  'this' keyword refers to the correct context
  }

  handleInputChange(e) {
    // we need to create a method (event handler) that captures the value in the input and assign the value to the current todo property in the component state
    // we cannot simply write this.state.currentTodo = e.target.value, we must use .setState()
    // we call the component setState method and pass in the incoming value
    // this object will contain the key(s) we want to update and their new value(s)
    this.setState({
      // use e.target.value to get what is typed into the input and reassign the currentTodo value in our state
      currentTodo: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          <form>
            {/* we also set our 'handleInputChange' method as the onChange event for our input */}
            {/* we can see that this update the current state by going into React DevTools and looking at the currentTodo property of our state object */}
            <input type="text" onChange={this.handleInputChange} value={this.state.currentTodo} />
          </form>
          <div className="Todo-List">
            <ul>
              {this.state.todos.map(todo => 
              // writing this as one line but with carriage returns obviates the need to use 'return' and curly braces
                <li key={todo.id}>
                  <input type="checkbox" defaultChecked={todo.isComplete}/>{todo.name}
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
