import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Navbar() {

  const [darkMode, setDarkMode] = useState(true);

  const navigate = useNavigate();
  const name = localStorage.getItem("name");


  // ✅ Logout function
  const handleLogout = () => {

    localStorage.removeItem("token");

    localStorage.removeItem("name");

    navigate("/");

  };

  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark");

      document.body.classList.remove("light");

    } else {

      document.body.classList.add("light");

      document.body.classList.remove("dark");

    }

  }, [darkMode]);

  return (

    <header className="header">

      <div className="logo">

  🌍 EcoAI Dashboard

  {name && (

    <div className="welcome-user">

      👋 Welcome, {name}

    </div>

  )}

</div>

      <nav>

        <a href="#">Dashboard</a>

        <a href="#">Analytics</a>

        <a href="#">About</a>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </nav>

      <button
        id="theme-toggle"
        onClick={() => setDarkMode(!darkMode)}
      >
        {darkMode ? "🌙" : "☀️"}
      </button>

    </header>

  );

}

export default Navbar;