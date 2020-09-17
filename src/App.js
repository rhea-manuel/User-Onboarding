import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './Form'

function App() {

  const [users, changeUsers] = useState([])

  return (
    <div className="App">
      <Form users={users} changeUsers={changeUsers}></Form>
      {
        users.map((item, index) => {
          return (
            <div>
              <h2>User {index + 1}</h2>
              <div>Name: {item.name}<br />
               Email: {item.email} <br />
                Password:{item.password} <br />
                Accepted Terms?: {item.terms ? "Yes" : "No"} <br />
                Role: {item.role}<br /></div>
            </div>
          )
        })
      }
    </div>
  );
}

export default App;
