import { createContext, useContext, useReducer } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  isAuthenticated: false,
};
const authReducer = (state, { type, payload }) => {
  switch (type) {
    case "login":
      return {
        user: payload,
        isAuthenticated: true,
      };
    case "logout":
      return {
        user: null,
        isAuthenticated: false,
      };
    default:
      throw new Error("unknown Action Called");
  }
};

export default function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    authReducer,
    initialState
  );
  function login(userInfo) {
    // if (email === FAKE_USER.email && password === FAKE_USER.password)
    dispatch({ type: "login", payload: userInfo });
  }
  function logout() {
    dispatch({ type: "logout" });
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
