import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FeedbackContext from '../../store/feedback-context';
import AuthContext from '../../store/auth-context';
import { login } from '../../service/user.api';

import UserForm from './UserForm';
import Button from '../UI/Button';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const feedbackCtx = useContext(FeedbackContext);
  const authCtx = useContext(AuthContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formIsValid = email && password;

  useEffect(() => {
    if (authCtx.isAuthenticated) {
      navigate('/');
    }
  }, [authCtx.isAuthenticated, navigate]);

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;

    try {
      const data = await login(email, password);

      if (!data.user) {
        throw new Error(data.message);
      }

      const user = JSON.parse(data.user)[0];
      authCtx.login(user.id, user.email);
    } catch (error: any) {
      feedbackCtx.showMessage(error.message, 4000);

      setEmail('');
      setPassword('');
      return;
    }

    navigate('/');

    feedbackCtx.showMessage('User logged in.', 4000);
  };

  const navigateToRegistrationHandler = () => {
    navigate('/registration');
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles['login-form']}>
        <UserForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit" disabled={!formIsValid}>
          <p>Login</p>
        </Button>
      </form>
      <div className={styles.registration}>
        <p>Or if you don't have a profile yet:</p>
        <Button onClick={navigateToRegistrationHandler}>
          <p>Registration</p>
        </Button>
      </div>
    </div>
  );
};

export default Login;
