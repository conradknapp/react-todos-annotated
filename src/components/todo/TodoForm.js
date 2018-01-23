import React from 'react';

// instead of using React.Component to extend our TodoForm component, we can just export it as a function
// we can just export it by placing the 'export' keyword before 'const': 

export const TodoForm = (props) => (

  // the return value will go in-between the parentheses and will be the JSX value from our form
  // lets pass in the handleSubmit method we get from App.js through props
  <form onSubmit={props.handleSubmit}>
    {/* ...but now that we've exported this input to TodoForm.js, we lose access to things that were defined on App through 'this'. 'handleInputChange' still lives in App.js and this.state doesn't exist in this form. How do we fix this? */}

    {/* first, to use the state from App.js, we will pass props into our stateless function--'(props)'
    second, we will reassign the initial values that we provided for onChange and value; onChange will become {props.handleInputChange} and value will become {props.currentTodo} */}

    <input type="text" 
      onChange={props.handleInputChange} 
      value={props.currentTodo} />

    {/* then, back in App.js, we need to pass these props into the TodoForm component that we created */}
  </form>
);