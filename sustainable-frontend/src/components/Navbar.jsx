import { useEffect, useState } from "react";

function Navbar() {

  const [darkMode, setDarkMode] = useState(true);




  useEffect(() => {

    if (darkMode) {

      document.body.classList.add("dark");

      document.body.classList.remove("light");

    }

    else {

      document.body.classList.add("light");

      document.body.classList.remove("dark");

    }

  }, [darkMode]);




  return (

    <header className="header">

      <div className="logo">

        🌍 EcoAI Dashboard

      </div>




      <nav>

        <a href="#">
          Dashboard
        </a>

        <a href="#">
          Analytics
        </a>

        <a href="#">
          About
        </a>

      </nav>




      <button
        id="theme-toggle"
        onClick={() =>
          setDarkMode(!darkMode)
        }
      >

        {darkMode ? "🌙" : "☀️"}

      </button>

    </header>

  );

}

export default Navbar;