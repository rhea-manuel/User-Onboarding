import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from './Form'
import * as Yup from "yup"

function App() {

  const [users, changeUsers] = useState([])

  return (
    <div className="App">
      <Form users={users} changeUsers={changeUsers}></Form>
      {
        users.map(item=>{
          return(
          <div>{item.name}, {item.email}, {item.password}, {item.terms}, {item.role}</div>
          )
        })
      }
    </div>
  );
}

export default App;
