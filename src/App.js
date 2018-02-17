import React, { Component } from "react";
import "./App.css";
// we put TodoForm in curly braces because we exported it with a name:
// import {TodoForm} from './components/todo/TodoForm';
import { TodoForm, TodoList, Footer } from "./components/todo";
// We originally imported the TodoForm as an individual component, but now we will use index.js files to import our components in a cleaner way
// lets import our various helper function into App.js
import {
  addTodo,
  generateId,
  findById,
  toggleTodo,
  updateTodo,
  removeTodo
} from "./lib/todoHelpers";
// lets import our utility functions as well
import { pipe, partial } from "./lib/utils";
import { getTodos, saveTodo, modifyTodo, destroyTodo } from "./lib/todoService";

class App extends Component {
  // we use the constructor to define this applications initial state and the custom methods that were created are being bound to 'this' within the constructor, so those methods have the correct context when calling setState and reading state for updates
  // these bindings are redundant and the app can easily break if not all of the functions are bound. What can we do to fix this?
  // We can put the state above the constructor and remove this from 'this.state'
  // State is still an instance property of this class and is still available using 'this' in this components' methods

  state = {
    todos: [],
    currentTodo: "",
    message: ""
  };

  componentWillMount() {
    getTodos().then(todos => this.setState({ todos }));
  }

  // once we take state out, however, we will get a warning for having an empty constructor, so we can take the constructor out, since we are not doing anything unique with it

  // constructor() {
  //   super();
  // }

  // in order to render todos dynamically we need to give our component state
  // we call super to make sure the constructor for the component class we are extending gets called
  // the state object will contain whatever data structures our component needs to render properly (i.e. a list of todos)
  // the changes in user input need to be reflected in our state
  // we always want our state to be in sync with our view

  // this.state = {
  //   todos: [
  //     {id: 1, name: 'Finish this app', isComplete: true},
  //     {id: 2, name: 'Create Nuxt App', isComplete: false},
  //     {id: 3, name: 'Make REST API', isComplete: false}
  //   ],
  //   currentTodo: ''
  // }

  // for our event handler/method to update our state, we need to reference the method in our constructor and bind it to this:

  // this.handleInputChange = this.handleInputChange.bind(this);

  // this is to ensure that when we call this.setState() in our method, the  'this' keyword refers to the correct context

  // this.handleSubmit = this.handleSubmit.bind(this);
  // this.handleEmptySubmit = this.handleEmptySubmit.bind(this);

  // we can remove these bindings if we initialize these methods as properties, so we will comment them out

  // to initialize the methods as properties, we make them arrow functions:
  handleSubmit = e => {
    // e.preventDefault() prevents the form from making a POST request with the form, which would cause the page to reload
    e.preventDefault();
    // we get our generated (random) id from our helper file
    const newId = generateId();
    // we create our new todo with our id, name that is input and a default value for completed as false
    const newTodo = {
      id: newId,
      name: this.state.currentTodo,
      isComplete: false
    };
    // then we call our addTodo function from our helpers file, it will concat this new todo onto the existing list
    const updatedTodos = addTodo(this.state.todos, newTodo);
    // then we will use .setState() to update the existing state and then bind the handleSubmit method within our constructor above
    this.setState({
      todos: updatedTodos,
      currentTodo: "",
      // by setting errorMessage to an empty string, we can clear out the error message that might have been created by a previous todo
      errorMessage: ""
    });
    saveTodo(newTodo).then(() => this.showTempMessage("Todo added"));
  };

  showTempMessage = msg => {
    this.setState({ message: msg });
    setTimeout(() => this.setState({ message: "" }), 2500);
  };

  handleToggle = id => {
    const getToggledTodo = pipe(findById, toggleTodo);
    const updated = getToggledTodo(id, this.state.todos);
    const getUpdatedTodos = partial(updateTodo, this.state.todos);
    const updatedTodos = getUpdatedTodos(updated);
    this.setState({ todos: updatedTodos });
    modifyTodo(updated).then(() => this.showTempMessage("Todo Updated"));
  };

  handleRemove = (id, e) => {
    e.preventDefault();
    const updatedTodos = removeTodo(this.state.todos, id);
    this.setState({ todos: updatedTodos });
    destroyTodo(id).then(() => this.showTempMessage("Todo Removed"));
  };

  handleInputChange = e => {
    // we need to create a method (event handler) that captures the value in the input and assign the value to the current todo property in the component state
    // we cannot simply write this.state.currentTodo = e.target.value, we must use .setState()
    // we call the component setState method and pass in the incoming value
    // this object will contain the key(s) we want to update and their new value(s)
    this.setState({
      // use e.target.value to get what is typed into the input and reassign the currentTodo value in our state
      currentTodo: e.target.value
    });
  };

  // let's create a separate function to handle submission of an empty todo, rather than giving other methods a more complex logic
  handleEmptySubmit = e => {
    e.preventDefault();
    // we will throw an error message if there is an empty todo
    this.setState({
      errorMessage: "Please give todo a name"
    });
  };

  render() {
    // before our HTML, let's create a submitHandler function that will determine what gets rendered; a todo if a name is supplied, an error if not
    // let's go down to handleSubmit prop on the TodoForm and replace 'this.handleSubmit' with 'submitHandler'
    const submitHandler = this.state.currentTodo
      ? this.handleSubmit
      : this.handleEmptySubmit;
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">React Todos</h1>
        </header>
        <div className="Todo-App">
          {/* we also set our 'handleInputChange' method (located in App.js) as the onChange event for our input */}
          {/* after we add onChange={this.handleInputChange} to our input, we can see that this updates the current state by going into React DevTools and looking at the currentTodo property of our state object */}
          {/* <form>
            <input type="text" 
              onChange={this.handleInputChange} 
              value={this.state.currentTodo} />
          </form> */}
          {/* The form element we originally made will be commented out, because we are moving it to a separate file and will now be referenced as <TodoForm /> below */}

          {/* we can conditionally render our error message (provided there is no name given to submitted input) using curly braces, and if 'this.state.errorMessage' evaluates to true and what comes after '&&' will be rendered */}
          {this.state.errorMessage && (
            <span className="error">{this.state.errorMessage}</span>
          )}
          {/* we'll also add a message when a todo is successfully added to our db */}
          {this.state.message && (
            <span className="success">{this.state.message}</span>
          )}

          {/* lets add a couple of properties for the TodoForm component in the form of attributes */}
          {/* we call the first prop 'handleInputChange' because this is what we referred to it as off the props object, {props.handleInputChange} (in TodoForm.js) */}

          <TodoForm
            handleInputChange={this.handleInputChange}
            currentTodo={this.state.currentTodo}
            handleSubmit={submitHandler}
          />

          <TodoList
            handleToggle={this.handleToggle}
            todos={this.state.todos}
            handleRemove={this.handleRemove}
          />

          <Footer />
        </div>
      </div>
    );
  }
}

export default App;
