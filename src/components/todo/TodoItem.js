import React from 'react';
import {partial} from '../../lib/utils';

export const TodoItem = (props) => {
  const handleToggle = partial(props.handleToggle, props.id)
  const handleRemove = partial(props.handleRemove, props.id)
  return (
    // we don't have access to 'todo' anymore like in the TodoList component, so we have to access it through props
    <li key={props.id}>
      <span className="delete-item"><a href="#" onClick={handleRemove}>X</a></span>
      <input type="checkbox" onChange={handleToggle} checked={props.isComplete}/>{props.name}
    {/* once we change all the instances of 'todo' to 'props', we need to go back to our TodoList, create the TodoItem component and pass in props */}
    </li>
  )
}