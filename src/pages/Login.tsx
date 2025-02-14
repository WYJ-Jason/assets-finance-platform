import { Authenticator } from "@aws-amplify/ui-react";
import { Image } from "@aws-amplify/ui-react";
import React from "react";
import "../styles/Login.css";

const Login: React.FC = () => {
  return (
    <div className="login-container">
      <div className="login-logo">
        <h2 style={{ marginBottom: "50px" }}>
          Welcome to Assets Finance Platform
        </h2>
        <Image src="/banner1.png" alt="login banner" className="login-image" />
        <p>
          &copy; {new Date().getFullYear()} Developed and Supported by
          Yanjie(Jason) Wu. All rights reserved.
        </p>
      </div>
      <div className="login-form">
        <Authenticator>
          {() => {
            window.location.href = "/home";
            return <div />;
          }}
        </Authenticator>
      </div>
    </div>
  );
};

export default Login;
