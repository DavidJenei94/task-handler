import { useContext, useState } from 'react';

import UserForm from './UserForm';
import Button from '../UI/Button';

import styles from './Registration.module.scss';
import { register } from '../../service/user.api';
import { useNavigate } from 'react-router-dom';
import FeedbackContext from '../../store/feedback-context';

const Registration = () => {
  const navigate = useNavigate();

  const feedbackCtx = useContext(FeedbackContext);

  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const formIsValid = email && password;

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!formIsValid) return;

    await register(email, password);

    navigate('/login');

    feedbackCtx.showMessage('User registrated.', 4000);
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
