import React from "react"; // Import React if not already imported

// Import the image file
import "./Login.css";

function Login() {
  return (
    <div className="login-page">
      <div className="img-background"></div>

      <div className="login-form">
        <h1 className="title"> Luminary</h1>
        <h3>Hello, Let's Sign In</h3>
      </div>
    </div>
  );
}

export default Login;
