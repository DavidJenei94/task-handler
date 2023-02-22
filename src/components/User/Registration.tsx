import { useState } from 'react';

import UserForm from './UserForm';
import Button from '../UI/Button';

import styles from './Registration.module.scss';

const Registration = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formIsValid = email && password;

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;
  };

  return (
    <div>
      <form onSubmit={submitHandler} className={styles['registration-form']}>
        <UserForm
          email={email}
          setEmail={setEmail}
          password={password}
          setPassword={setPassword}
        />
        <Button type="submit">
          <p>Registration</p>
        </Button>
      </form>
    </div>
  );
};

export default Registration;
