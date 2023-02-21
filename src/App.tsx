import React from 'react';
import logo from './logo.svg';
import './App.css';
import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import Task from './components/Task/SingleTask';
import TaskList from './components/Task/TaskList';

function App() {
  return (
    <div className="App">
      <Header/>
      <Main>
        <TaskList />
      </Main>
    </div>
  );
}

export default App;
