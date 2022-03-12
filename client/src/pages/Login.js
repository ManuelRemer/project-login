import { useState } from "react";

// components
import RegInput from "../components/RegInput";

// styles
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const inputFields = [
    {
      label: "email",
      type: "email",
      value: email,
      handler: (i) => setEmail(i),
    },
    {
      label: "password",
      type: "password",
      value: password,
      handler: (i) => setPassword(i),
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/v1/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    const { token, user } = await res.json();
    console.log({ name: user.name, token: token });
  };

  return (
    <div className="login">
      <form onSubmit={handleSubmit}>
        <div>
          {inputFields.map((field) => (
            <RegInput
              label={field.label}
              type={field.type}
              value={field.value}
              handleInput={field.handler}
              key={field.label}
            />
          ))}
        </div>
        <button className="button">Login</button>
      </form>
    </div>
  );
};

export default Login;
