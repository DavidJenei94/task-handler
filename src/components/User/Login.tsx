import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import UserForm from './UserForm';
import Button from '../UI/Button';

import styles from './Login.module.scss';

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formIsValid = email && password;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;
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
