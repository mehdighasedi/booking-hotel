import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthProvider";

function Login() {
  const [email, setEmail] = useState("mahdi@gmail.com");
  const [password, setPassword] = useState("123456mahdis");
  const [name, setName] = useState("mahdi");
  const navigate = useNavigate();
  const { login, isAuthenticated } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (email && password && name) {
      const userInfo = {
        email,
        password,
        name,
      };
      login(userInfo);
    }
  };

  useEffect(() => {
    if (isAuthenticated) navigate("/", { replace: true });
  }, [isAuthenticated, navigate]);

  return (
    <div className="loginContainer">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="formControl">
          <label htmlFor="">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          <button className="btn btn--primary">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
