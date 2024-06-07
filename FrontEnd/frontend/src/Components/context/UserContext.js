import React from "react";

const UserContext = React.createContext({username:'', auth: false});
// @function  UserProvider

// Create function to provide UserContext
const UserProvider = ({ children }) => {
  const [user, setUser] = React.useState({ username: '', auth: false });

  const loginContext = (username, token) => {
    setUser((user) => ({
      username: username,
      auth: true,
    }));
    localStorage.setItem('token', token);
    localStorage.setItem('username', username);
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser((user) => ({
      userusername: '',
      auth: false,
    }));
  };

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export {UserContext, UserProvider}