import React from "react";
import { Navigate, useLocation } from "react-router-dom";

export const authContext = React.createContext();

export function useAuth() {
  return React.useContext(authContext);
}

export function ProvideAuth({ children }) {
  const [user, setUser] = React.useState(localStorage.getItem('username'));
  const [groups, setGroups] = React.useState(JSON.parse(localStorage.getItem('groups')));
  const [token, setToken] = React.useState(localStorage.getItem('token'));

  const register = async (displayname, username, password) => {
    const response = await fetch("/api/users/register", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        displayname, username, password
      })
    });
    const payload = await response.json();
    return payload.ok;
  }

  const login = async (username, password) => {
    const response = await fetch("/api/users/login", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username, password
      })
    });
    const payload = await response.json();
    if (payload.ok) {
      localStorage.setItem('username', payload.username);
      localStorage.setItem('groups', JSON.stringify(payload.groups));
      localStorage.setItem('token', payload.token);
      setUser(payload.username);
      setGroups(payload.groups);
      setToken(payload.token);
    }
    return payload.ok;
  };

  const logout = async () => {
    localStorage.clear();
    setUser(null);
    setGroups([]);
    setToken(null);
  };

  const auth = {
    user,
    groups,
    token,
    register,
    login,
    logout
  };

  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

export function RequireAuth({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth.user) {
    return <Navigate to="/users/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
