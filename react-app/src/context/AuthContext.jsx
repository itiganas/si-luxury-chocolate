import { createContext, useContext, useState, useEffect } from 'react';

/*
  AuthContext manages the logged-in user for the whole app.

  How the login flow works:
    1. User clicks "Login with Google"
    2. Browser redirects to the Spring Boot Gateway's OAuth2 endpoint
    3. Gateway redirects to Google → user authenticates
    4. Google redirects back to the Gateway
    5. Gateway creates a session cookie and redirects back to the frontend
    6. Frontend calls /auth/me to get the user's info from the session

  The frontend never handles any tokens — that is all done by the Gateway.

  Usage in any component:
    import { useAuth } from '../context/AuthContext';
    const { user, login, logout } = useAuth();
*/

const API_URL     = import.meta.env.VITE_API_URL;
const GATEWAY_URL = import.meta.env.VITE_GATEWAY_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser]       = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, check if there is already an active session.
  // If the user logged in before and the session cookie is still valid, this
  // call will return their profile without them needing to log in again.
  useEffect(() => {
    fetch(`${API_URL}/auth/me`, {
      credentials: 'include', // sends the session cookie set by the Gateway
    })
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => setUser(data))
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  // Redirect the browser to the Gateway's Google OAuth2 login URL.
  // The Gateway handles the full OAuth2 dance and then redirects back here.
  function login() {
    window.location.href = `${GATEWAY_URL}/oauth2/authorization/google`;
  }

  // Tell the Gateway to invalidate the session, then clear local user state.
  async function logout() {
    await fetch(`${GATEWAY_URL}/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
