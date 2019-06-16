const responseJson = (response) => response.json();

const read = () => {
  return fetch("/api/todos").then(responseJson);
};

const post = (todo) => {
  return fetch("/api/todos", {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({todo})
  }).then(responseJson);
};

const update = (id, params) => {
  return fetch(`/api/todos/${id}`, {
    method: "PATCH",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({todo: params})
  }).then(responseJson);
};

const remove = (id) => {
  return fetch(`/api/todos/${id}`, {
    method: "DELETE",
    headers: {
      'Content-Type': 'application/json',
    },
  })
};

export default {
  read,
  post,
  update,
  remove
};
