import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("mahdi@gmail.com");
  const [password, setPassword] = useState("123456mahdis");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) login(email, password);
    if (isAuthenticated) navigate("/", { replace: true });
  };

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="">Email</label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="formControl">
          <label htmlFor="">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons">
          <button type="submit" className="btn btn--primary">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
