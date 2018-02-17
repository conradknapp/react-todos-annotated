const BASE_URL = "http://localhost:8080/todos";

export const getTodos = () => {
  return fetch(BASE_URL).then(res => res.json());
};

export const saveTodo = todo => {
  return fetch(BASE_URL, {
    method: "POST",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};

export const modifyTodo = todo => {
  return fetch(`${BASE_URL}/${todo.id}`, {
    method: "PUT",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON"
    },
    body: JSON.stringify(todo)
  }).then(res => res.json());
};

export const destroyTodo = id => {
  return fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
    headers: {
      Accept: "application/JSON",
      "Content-Type": "application/JSON"
    }
  });
};
