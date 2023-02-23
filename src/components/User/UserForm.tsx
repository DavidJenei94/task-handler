import { Dispatch, SetStateAction } from 'react';
import Input from '../UI/Input';

interface UserFormProps {
  email: string;
  setEmail: Dispatch<SetStateAction<string>>;
  password: string;
  setPassword: Dispatch<SetStateAction<string>>;
}

const UserForm = ({
  email,
  setEmail,
  password,
  setPassword,
}: UserFormProps) => {
  const emailChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <Input
        placeholder="Email"
        type="email"
        value={email}
        onChange={emailChangeHandler}
        required
      />
      <br />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={passwordChangeHandler}
        minLength={8}
        required
      />
      <br />
    </>
  );
};

export default UserForm;
