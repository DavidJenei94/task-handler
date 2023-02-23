import { Navigate, Route, Routes } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import FeedbackContext from './store/feedback-context';

import Header from './components/Layout/Header';
import Main from './components/Layout/Main';
import TaskList from './components/Task/TaskList';
import Login from './components/User/Login';
import Registration from './components/User/Registration';
import FeedbackBar from './components/UI/FeedbackBar';

import './App.module.scss';
import AuthContext from './store/auth-context';

function App() {
  const feedbackCtx = useContext(FeedbackContext);
  const authCtx = useContext(AuthContext);

  useEffect(() => {
    authCtx.checkUser();
  }, [authCtx]);

  return (
    <div className="App">
      {feedbackCtx.isMessageShown && (
        <FeedbackBar>{feedbackCtx.message}</FeedbackBar>
      )}
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
