import React, { useEffect, useState } from 'react';
import './style.css';
import axios from 'axios';

export default function App() {
  const [todo, setTodo] = useState([]);
  const [text, setText] = useState([]);

  useEffect(() => {
    const url = 'https://jsonplaceholder.typicode.com/users';
    const fetchData = async () => {
      try {
        const response = await fetch(url);
        const json = await response.json();
        setTodo(json);
      } catch (error) {
        console.log('error', error);
      }
    };
    fetchData();
  }, []);

  const addTodo = (input) => {
    let arr = {};
    arr.id = todo.length + 1;
    arr.name = input;
    setText(arr);
  };

  const add = () => {
    setTodo([...todo, text]);
  };

  const remove = (id) => {
    let removedtodo = todo.filter((item) => item.id != id);
    setTodo(removedtodo);
  };

  return (
    <div>
      <h1>Hello !</h1>
      <div
        className="create"
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignContent: 'center',
          alignItems: 'center',
        }}
      >
        <input type="text" onChange={(event) => addTodo(event.target.value)} />
        <button onClick={() => add()}> + Add </button>
      </div>
      {todo.map((item) => {
        return (
          <div
            className="single_list"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              alignItems: 'center',
              alignContent: 'space-between',
              border: '1px solid #000',
              marginBottom: '5px',
            }}
          >
            <p style={{ paddingLeft: '5px' }} key={item.id}>
              {item.name}
            </p>
            <span
              key={'spec' + item.id}
              onClick={() => remove(item.id)}
              style={{
                paddingLeft: '10px',
                cursor: 'pointer',
                textAlign: 'center',
                color: 'red',
              }}
            >
              {' '}
              x
            </span>
          </div>
        );
      })}
    </div>
  );
}
