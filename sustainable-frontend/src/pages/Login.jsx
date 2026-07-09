import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
function Login() {

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const handleLogin = async () => {

  try {

    const response = await API.post("/login", {

      email,

      password

    });

    // Save JWT Token

    localStorage.setItem(

      "token",

      response.data.token

    );

    // Save User Name

    localStorage.setItem(

      "name",

      response.data.name

    );

    // Redirect

    navigate("/dashboard");

  }

  catch (error) {

    alert(

      error.response?.data?.message ||

      "Login Failed"

    );

  }

};


  return (

    <div className="login-container">

      <div className="login-card">

        <h1>EcoAI Dashboard</h1>

        <p>Login to continue</p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />
        <button onClick={handleLogin}>

          Login

        </button>
        

        <p>

          Don't have an account?

          <a href="/signup">

            Sign Up

          </a>

        </p>

      </div>

    </div>

  );

}

export default Login;