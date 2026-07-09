import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../services/api";

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");

  const handleSignup = async () => {

    try {

      const response = await API.post("/signup", {

        name,

        email,

        password

      });

      alert(response.data.message);

      navigate("/");

    }

    catch (error) {

      alert(

        error.response?.data?.message ||

        "Signup Failed"

      );

    }

  };

  return (

    <div className="login-container">

      <div className="login-card">

        <h1>🌍 EcoAI Dashboard</h1>

        <p>Create your account</p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
        />

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

        <button
          onClick={handleSignup}
        >
          Sign Up
        </button>

        <p>

          Already have an account?

          <Link to="/">

            Login

          </Link>

        </p>

      </div>

    </div>

  );

}

export default Signup;