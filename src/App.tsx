import { Navigate, Route, Routes } from 'react-router-dom';

import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import TaskList from './components/Task/TaskList';
import Login from './components/User/Login';
import Registration from './components/User/Registration';

import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Main>
        <Routes>
          <Route path="/" element={<TaskList />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Main>
    </div>
  );
}

export default App;
