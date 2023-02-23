import { createContext, useState } from 'react';

const AuthContext = createContext({
  isAuthenticated: false,
  id: 0,
  email: '',
  login: (id: number, email: string) => {},
  logout: () => {},
  checkUser: () => {}
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const [email, setEmail] = useState<string>('');

  const loginHandler = (id: number, email: string) => {
    setIsAuthenticated(id ? true : false);
    setId(id);
    setEmail(email);

    localStorage.setItem('id', id.toString());
    localStorage.setItem('email', email);
  };

  const logoutHandler = () => {
    setIsAuthenticated(false);
    setId(0);
    setEmail('');

    localStorage.removeItem('id');
    localStorage.removeItem('email');
  };

  const checkUserHandler = () => {
    const lsId = localStorage.getItem('id');
    const lsEmail = localStorage.getItem('email');

    if (lsId && lsEmail) {
      setIsAuthenticated(Number(lsId) ? true : false);
      setId(Number(lsId));
      setEmail(lsEmail);
    }
  }

  return (
    <AuthContext.Provider
      value={{
        id: id,
        email: email,
        isAuthenticated: isAuthenticated,
        login: loginHandler,
        logout: logoutHandler,
        checkUser: checkUserHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
