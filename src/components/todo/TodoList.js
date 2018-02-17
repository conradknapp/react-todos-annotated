import React from "react";
import { TodoItem } from "./TodoItem";

// this is going to be another stateless, functional component, so like in TodoForm, we will immediately export the function we create and pass it the 'props' argument

export const TodoList = props => {
  return (
    <main className="Todo-List">
      {/* once we have moved over our todolist to this component 'TodoList', we will change 'this.state' with 'props'
        and again, we will update App.js to pass props into our TodoList component */}

      {/* lets comment out this li that we originally used to display todos and make it an individual component (TodoItem) to make our code even easier to read
        <li key={todo.id}>
          <input type="checkbox" defaultChecked={todo.isComplete}/>{todo.name}
        </li> */}
      <ul>
        {props.todos.map(todo => (
          <TodoItem
            handleToggle={props.handleToggle}
            key={todo.id}
            {...todo}
            handleRemove={props.handleRemove}
          />
        ))}
      </ul>
    </main>
  );
};
